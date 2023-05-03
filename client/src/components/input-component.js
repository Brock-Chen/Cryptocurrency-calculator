import React from "react";

const Input = (props) => {
  let { trashHandler, getAvg } = props;

  // 設定輸入的值的範圍
  function priceHandler(e) {
    if (e.target.value > 999999) e.target.value = 999999;
    if (e.target.value < 0) e.target.value = "";
  }

  function amountHandler(e) {
    if (e.target.value < 0) e.target.value = "";
  }

  return (
    <form className="form" style={{ animation: "scaleUp 0.5s ease forwards" }}>
      <div className="position">
        <input type="text" placeholder="token" className="class-token" />
        <input
          type="number"
          placeholder="price"
          onInput={priceHandler}
          onChange={getAvg}
          className="class-price"
        />
        <input
          type="number"
          placeholder="amount"
          onInput={amountHandler}
          onChange={getAvg}
          className="class-amount"
        />
        <button className="trash-btn btn" onClick={trashHandler}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </form>
  );
};

export default Input;
