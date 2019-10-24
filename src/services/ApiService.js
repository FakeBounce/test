import API from '../common/consts/api';
import { ANCHOR } from "../common/consts/api";

class ApiService {
  async fetchData(url, params) {
    const paramString = this._createParamString(params);
    const response = await fetch(
      API.API_URL + url + paramString,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'application/json', 
          'Cache-Conrol': 'no-cache',
          'Pragma': 'no-cache'
        }
      }
    );
    return this._proceedWithResponse(response);
  }

  async getFile(url, contentType = 'application/json') {
    const response = await fetch(
      API.API_URL + url,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          // 'Content-Type': contentType
          'Cache-Conrol': 'no-cache',
          'Pragma': 'no-cache'
        }, 
        // responseType: 'blob'
      }
    );
    // return await response.blob();
    return await response;
  }

  async postData(url, data, contentType = 'application/json') {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`, 
      'Cache-Conrol': 'no-cache'
    };
    if (contentType !== null) {
     headers['Content-Type'] = contentType;
    }
    const response = await fetch(
      API.API_URL + url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      }
    );
    return this._proceedWithResponse(response);
  }

  async postLogin(url, data, contentType = 'application/json') {
    const headers = {
      'Cache-Conrol': 'no-cache'
    };
    if (contentType !== null) {
     headers['Content-Type'] = contentType;
    }
    const response = await fetch(
      API.API_URL + url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      }
    );
    return this._proceedWithResponse(response);
  }

  async postFile(url, data) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`, 
      'Accept': '*/*', 
      'Cache-Conrol': 'no-cache',
      'Pragma': 'no-cache'
    };
    
    const response = await fetch(
      API.API_URL + url,
      {
        method: 'POST',
        headers,
        body: data.fileFormData
      }
    );
    return this._proceedWithResponse(response);
  }

  async getPDF(url, data, contentType = 'application/json') {
    const response = await fetch(
      API.API_URL + url,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Cache-Conrol': 'no-cache',
          'Pragma': 'no-cache',
          'Content-Type': contentType
        },
        body: JSON.stringify(data)
      }
    );
    // console.log('res',response.blob());
    // return response;
    return await response.blob();
  }

  async delete(url, data) {
    const response = await fetch(
      API.API_URL + url,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Cache-Conrol': 'no-cache',
          'Content-Type': 'application/json',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(data)
      }
    );
    return this._proceedWithResponse(response);

  }

  async putData(url, data) {
    const response = await fetch(
      API.API_URL + url,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Cache-Conrol': 'no-cache',
          'Content-Type': 'application/json',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(data)
      }
    );
    return this._proceedWithResponse(response);

  }

  async refreshToken(params) {
    const response = await fetch(
      API.API_URL + ANCHOR.AUTHENTICATION,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Cache-Conrol': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify(params)
      }
    );
    return this._proceedWithResponse(response);
  }

  _checkStatus(response) {
    if (response.status < 200 || (response.status > 300 && response.status < 500)) {
      return { state: false, status: response.status, message: response.statusText }
    } else if (response.status >= 500) {
      //window.location.href = '/errorPage';
    } else if (response.status === 204) {
      return { state: 'no_content' };
    }
    return { state: true };
  }

  _createParamString(params) {
    const paramArray = [];
    Object.keys(params).forEach((key, index) => {
      paramArray.push(`${key}=${params[key]}`);
    });
    return paramArray.length ? `?${paramArray.join('&')}` : '';
  }

  async _proceedWithResponse(response) {
    const status = this._checkStatus(response);
    if (status.state === 'no_content') {
      return { state: true, body: {} };
    } else if (status.state) {
      const data = {};
      try {
        data.body = await response.json();
      } catch (e) {
        data.body = {};
      }
      data.state = true;
      return data;
    } else {
      return status;
    }
  }
}

export default new ApiService();
