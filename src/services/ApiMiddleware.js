import AuthService from "./AuthService";
import ApiService from "./ApiService";

class ApiMiddleware {
  async getData(url, params) {
    const isTokenReady = await AuthService.checkTokenBeforeRequest();
    if (isTokenReady) {
      const response = await ApiService.fetchData(
        url,
        this.removeEmptyParams(params || {})
      );
      return this.proceedWithResponse(response);
    } else {
      AuthService.logout();
    }
  }

  async getFile(url, params) {
    const isTokenReady = await AuthService.checkTokenBeforeRequest();
    if (isTokenReady) {
      const response = await ApiService.getFile(
        url,
        this.removeEmptyParams(params || {})
      );
      return this.proceedWithResponse(response);
    } else {
      AuthService.logout();
    }
  }

  async postData(url, data, contentType) {
    const isTokenReady = AuthService.checkTokenBeforeRequest();
    if (isTokenReady) {
      const response = ApiService.postData(url, data, contentType);
      return this.proceedWithResponse(response);
    } else {
      AuthService.logout();
    }
  }

  async postLogin(url, data, contentType) {
    const response = ApiService.postLogin(url, data, contentType);
    return this.proceedWithResponse(response);
  }

  async postFile(url, data) {
    const isTokenReady = AuthService.checkTokenBeforeRequest();
    if (isTokenReady) {
      const response = ApiService.postFile(url, data);
      return this.proceedWithResponse(response);
    } else {
      AuthService.logout();
    }
  }

  async delete(url, data) {
    const isTokenReady = AuthService.checkTokenBeforeRequest();
    if (isTokenReady) {
      const response = ApiService.delete(url, data);
      return this.proceedWithResponse(response);
    } else {
      AuthService.logout();
    }
  }

  async put(url, data) {
    const isTokenReady = AuthService.checkTokenBeforeRequest();
    if (isTokenReady) {
      const response = ApiService.putData(url, data);
      return this.proceedWithResponse(response);
    } else {
      AuthService.logout();
    }
  }

  removeEmptyParams(params) {
    Object.keys(params).forEach((key, value) => {
      if (!params[key] || params[key] === "") {
        delete params[key];
      }
    });
    return params;
  }

  proceedWithResponse(response) {
    if (!response.state && response.status === 401) {
      AuthService.logout();
    } else {
      return response;
    }
  }
}

export default new ApiMiddleware();
