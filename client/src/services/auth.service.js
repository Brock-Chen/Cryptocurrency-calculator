import axios from "axios";
const API_URL = "https://crypto-calculator.up.railway.app/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(userName, email, password) {
    return axios.post(API_URL + "/register", {
      userName,
      email,
      password,
    });
  }

  // 紀錄當前使用者
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
