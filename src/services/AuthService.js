import decode from "jwt-decode";
import ApiService from "./ApiService";
import { ANCHOR } from "../common/consts/api";

class AuthService {
  async login(data) {
    const body = {
      clientId: 11,
      clientSecret: 200,
      grantType: "password",
      ...data
    };
    return ApiService.postLogin(ANCHOR.AUTHENTICATION, body).then(res => {
      if (res.state && res.body.access_token && res.body.refresh_token) {
        this.setTokens(
          res.body.access_token,
          res.body.refresh_token,
          res.body.expires_in
        );
      }
      return res;
    });
  }

  async refreshToken() {
    if (this.getProfile()) {
      const { clientId, email } = this.getProfile();
      const body = {
        clientId,
        clientSecret: 200,
        grantType: "refresh_token",
        userName: email,
        siren: localStorage.getItem("siren"),
        refreshToken: this.getRefreshToken()
      };
      return ApiService.refreshToken(body)
        .then(res => {
          if (res && res.body) {
            //this.setTokens(res.access_token, res.refresh_token);
            this.setTokens(
              res.body.access_token,
              res.body.refresh_token,
              res.body.expires_in
            );
            return true;
          }
          return false;
        })
        .catch(e => {
          console.error("Error refresk token: " + e);
          this.logout();
          var loginPage = window.location.href.split("/")[3];
          window.location.href = "/" + loginPage;
        });
    } else {
      this.logout();
    }
  }

  loggedIn() {
    const token = this.getJwtToken();
    const decodedToken = this.decodeToken(token);
    if (decodedToken && this.getRefreshToken()) {
      return this.refreshToken();
    } else if (decodedToken && !this.isTokenExpired(token)) {
      return true;
    }
    return false;
  }

  decodeToken(token) {
    try {
      const decoded = decode(token);
      return decoded;
    } catch (err) {
      return false;
    }
  }

  isTokenExpired() {
    const expirance = localStorage.getItem("token_expire");
    return expirance > new Date().getTime() / 1000;
  }

  checkTokenBeforeRequest() {
    return this.isTokenExpired();
    // const token = this.getJwtToken();
    // const expires_in = this.getJwtTokenExpiration();
    // if (this.isTokenExpired(expires_in) && this.getRefreshToken()) {
    //   return this.refreshToken();
    // } else if (!this.getRefreshToken()) {
    //   return false;
    // }
    // return token !== "undefined";
  }

  setTokens(jwtToken, refreshToken, expireTime) {
    localStorage.setItem("jwt_token", jwtToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem(
      "token_expire",
      new Date().getTime() / 1000 + expireTime
    );
  }

  getJwtToken() {
    return localStorage.getItem("jwt_token");
  }

  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }

  logout() {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expire");
  }

  getProfile() {
    const token = this.getJwtToken();
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken : false;
  }
}

export default new AuthService();
