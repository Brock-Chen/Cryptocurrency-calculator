import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataService from "../services/data.service";
import TokenComponent from "./token-component";

const DataComponent = (props) => {
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
    setColorProfile("white");
    setColorData("yellow");
  }, []);

  const navigate = useNavigate();
  const handleToLogin = () => {
    navigate("/login");
  };

  const [datas, setDatas] = useState(null);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  // 設置搜尋功能
  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    if (!search) return window.location.reload("/data");
    DataService.getToken(search)
      .then((data) => {
        setResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      if (!search) return window.location.reload("/data");
      DataService.getToken(search)
        .then((data) => {
          setResult(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // 顯示個人倉位
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      DataService.get(_id)
        .then((data) => {
          setDatas(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <div className="top">
      {!currentUser && (
        <div className="mustlogin">
          <p>請登入帳號以獲取個人資料。</p>
          <button className="btn btn-primary btn-lg" onClick={handleToLogin}>
            登入帳戶
          </button>
        </div>
      )}
      {currentUser && (
        <div className="owner">
          <h1>我的持倉頁面</h1>
          <div className="search input-group mb-3">
            <input
              type="text"
              className="form-control"
              onChange={handleInput}
              onKeyDown={(e) => handleEnter(e)}
            ></input>
            <button className="btn btn-primary" onClick={handleSearch}>
              搜尋
            </button>
          </div>
        </div>
      )}
      {datas && datas.length == 0 && (
        <p className="noRecord">目前沒有相關紀錄，請至個人主頁添加倉位</p>
      )}
      {currentUser && Array.isArray(datas) && datas.length != 0 && !result && (
        <div>
          {datas.map((data) => {
            return <TokenComponent data={data} />;
          })}
        </div>
      )}
      {currentUser && Array.isArray(result) && (
        <div>
          {result.map((data) => {
            return <TokenComponent data={data} />;
          })}
        </div>
      )}
    </div>
  );
};

export default DataComponent;
