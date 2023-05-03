import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import DataService from "../services/data.service";

const ProfileComponent = (props) => {
  let {
    currentUser,
    setCurrentUser,
    setColorHome,
    setColorPrice,
    setColorProfile,
    setColorData,
  } = props;

  useEffect(() => {
    setColorHome("white");
    setColorPrice("white");
    setColorProfile("yellow");
    setColorData("white");
  }, []);

  let [token, setToken] = useState("");
  let [price, setPrice] = useState(0);
  let [amount, setAmount] = useState(0);
  let [message, setMessage] = useState("");
  let [suc, setSuc] = useState("");

  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };

  // 紀錄倉位
  const postToken = (e) => {
    setToken(e.target.value);
  };
  const postPrice = (e) => {
    setPrice(e.target.value);
  };
  const postAmount = (e) => {
    setAmount(e.target.value);
  };
  const postHandler = () => {
    DataService.post(token, price, amount)
      .then(() => {
        setSuc("儲存倉位成功!");
        setMessage("");
        setTimeout(() => {
          setSuc("");
        }, 2500);
      })
      .catch((e) => {
        setMessage(e.response.data);
        setSuc("");
      });
  };

  return (
    <div className="profile">
      {!currentUser && (
        <div className="mustlogin">
          <p>請登入帳號以獲取個人資料。</p>
          <button className="btn btn-primary btn-lg" onClick={handleToLogin}>
            登入帳戶
          </button>
        </div>
      )}
      {currentUser && (
        <div>
          <h1>
            <i class="fa-solid fa-user fa-beat"></i> 個人檔案：
          </h1>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.userName}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>註冊時間: {currentUser.user.data} (UTC)</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {currentUser && (
        <div className="pro-position">
          <h1>
            <i class="fa-solid fa-paperclip fa-2xs"></i>新增個人持倉
            <i class="fa-solid fa-paperclip fa-2xs"></i>
          </h1>
          {suc && <div className="alert alert-success">{suc}</div>}
          {message && (
            <div className="alert alert-danger">
              {message} ,Please reduce the number size and try again.
            </div>
          )}
          <label htmlFor="token">幣種</label>
          <input
            type="text"
            placeholder="token"
            onChange={postToken}
            className="class-token"
            name="token"
          />
          <label htmlFor="price">價格</label>
          <input
            type="number"
            placeholder="price"
            onChange={postPrice}
            required
            className="class-price"
            name="price"
          />
          <label htmlFor="amount">數量</label>
          <input
            type="number"
            placeholder="amount"
            onChange={postAmount}
            className="class-amount"
            required
            name="amount"
          />
        </div>
      )}
      {currentUser && (
        <div className="pro-btn">
          <button onClick={postHandler} className="btn btn-primary">
            添加紀錄
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
