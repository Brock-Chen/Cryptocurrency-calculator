import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(userName, email, password)
      .then(() => {
        window.alert("註冊成功! 您將被導向至登錄頁面。");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };
  return (
    <div className="col-md-12 auth-block">
      <div className="title-auth">註冊帳號</div>
      <div className="form-group">
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <div className="form-group">註冊會員</div>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
