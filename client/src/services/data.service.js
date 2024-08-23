import axios from "axios";
const API_URL = "https://crypto-calculator.up.railway.app/api/data";

class DataService {
  // 驗證使用者
  getJWToken() {
    let JWToken;
    if (localStorage.getItem("user")) {
      JWToken = JSON.parse(localStorage.getItem("user")).token;
    } else {
      JWToken = "";
    }
    return JWToken;
  }

  // 新增持倉
  post(token, price, amount) {
    let JWToken = this.getJWToken();
    return axios.post(
      API_URL,
      { token, price, amount },
      { headers: { Authorization: JWToken } }
    );
  }

  // 獲取個人倉位記錄
  get(_id) {
    let JWToken = this.getJWToken();
    return axios.get(API_URL + "/owner/" + _id, {
      headers: { Authorization: JWToken },
    });
  }

  // 搜尋幣種
  getToken(token) {
    let JWToken = this.getJWToken();
    return axios.get(API_URL + "/token/" + token, {
      headers: { Authorization: JWToken },
    });
  }

  //刪除幣種
  deleteToken(token) {
    let JWToken = this.getJWToken();
    return axios.delete(API_URL + "/deleteToken/" + token, {
      headers: { Authorization: JWToken },
    });
  }

  // 刪除單筆資料
  deleteOneToken(_id, token, index) {
    let JWToken = this.getJWToken();
    return axios.post(
      API_URL + "/deleteToken",
      { _id, token, index },
      { headers: { Authorization: JWToken } }
    );
  }
}

export default new DataService();
