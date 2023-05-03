import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = (props) => {
  let {
    currentUser,
    setCurrentUser,
    colorHome,
    colorPrice,
    colorProfile,
    colorData,
  } = props;

  const handleLogout = () => {
    AuthService.logout();
    window.alert("登出成功。");
    setCurrentUser(null);
  };

  return (
    <nav>
      <ul>
        <div>
          <li>
            <Link to="/" style={{ color: colorHome }}>
              首頁
            </Link>
          </li>
          <li>
            <Link to="/prices" style={{ color: colorPrice }}>
              行情
            </Link>
          </li>
          <li>
            <Link to="/profile" style={{ color: colorProfile }}>
              個人主頁
            </Link>
          </li>
          <li>
            <Link to="/data" style={{ color: colorData }}>
              我的倉位
            </Link>
          </li>
        </div>

        <div className="auth">
          {!currentUser && (
            <li className="login">
              <Link to="/login">登入帳戶</Link>
            </li>
          )}
          {!currentUser && (
            <li className="register">
              <Link to="/register">註冊帳號</Link>
            </li>
          )}
          {currentUser && (
            <li className="logout">
              <Link onClick={handleLogout} to="/">
                登出
              </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavComponent;
