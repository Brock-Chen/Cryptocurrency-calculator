import { React, useState, useEffect } from "react";
import Input from "./input-component";

const HomeComponent = (props) => {
  let { setColorHome, setColorPrice, setColorProfile, setColorData } = props;

  useEffect(() => {
    setColorHome("yellow");
    setColorPrice("white");
    setColorProfile("white");
    setColorData("white");
  }, []);

  let [input, setInput] = useState([0, 0, 0]);
  let [buy, setBuy] = useState((0.0).toFixed(1));
  let [sell, setSell] = useState((0.0).toFixed(1));
  let [avg, setAvg] = useState((0.0).toFixed(2));
  let [PNL, setPNL] = useState(0);

  // 設置增加input事件
  const plusHandler = () => {
    setInput(input.toSpliced(input.length, 0, 0));
  };

  // 設置刪除input事件
  const trashHandler = (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        console.log(e);
        e.target.remove();
        getAvg();
      }
    );
  };

  // 計算所有input內的平均價格
  function getAvg() {
    let prices = document.querySelectorAll(".class-price");
    let amounts = document.querySelectorAll(".class-amount");
    let priceSum = 0;
    let amountSum = 0;
    for (let i = 0; i < prices.length; i++) {
      if (!isNaN(prices[i].valueAsNumber && amounts[i].valueAsNumber)) {
        priceSum += prices[i].valueAsNumber * amounts[i].valueAsNumber;
      }
    }
    for (let i = 0; i < amounts.length; i++) {
      if (!isNaN(amounts[i].valueAsNumber && prices[i].valueAsNumber)) {
        amountSum += amounts[i].valueAsNumber;
      }
    }

    let result;
    if (priceSum == 0 || amountSum == 0) {
      result = 0;
    } else
      result = Math.round((priceSum / amountSum) * 10000000000) / 10000000000;
    setAvg(result.toFixed(9));
    return amountSum;
  }

  // 清空所有input內的值
  const handleClear = () => {
    let emptyPrices = document.querySelectorAll(".class-price");
    let emptyAmounts = document.querySelectorAll(".class-amount");

    emptyPrices.forEach((empty) => {
      empty.value = "";
    });
    emptyAmounts.forEach((empty) => {
      empty.value = "";
    });
    setAvg("0.00");
  };

  // 設置買入及賣出總額
  const handleBuy = () => {
    setBuy(avg * getAvg());
  };
  const handleSell = () => {
    setSell(avg * getAvg());
  };

  // 盈虧計算
  useEffect(() => {
    setPNL(sell - buy);
  }, [buy, sell]);

  // 設置盈虧顏色
  useEffect(() => {
    let color = document.querySelector(".PNL");
    if (PNL > 0) {
      color.style.backgroundColor = "rgb(14, 203, 129)";
    } else if (PNL < 0) {
      color.style.backgroundColor = "rgb(246, 70, 93)";
    } else color.style.backgroundColor = "#272727";
  }, [PNL]);

  return (
    <main>
      <section className="main">
        <div className="main-Price-Calculation">
          <h1>Price Calculation Input Form</h1>
          <div className="top-btn">
            <button className="buy-btn btn" onClick={handleBuy}>
              記入為買入總額
            </button>
            <button className="sell-btn btn" onClick={handleSell}>
              記入為賣出總額
            </button>
            <button className="btn" id="big-trash-can" onClick={handleClear}>
              <i className="fa-sharp fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        <div className="main-input">
          {input.map((form) => {
            return <Input trashHandler={trashHandler} getAvg={getAvg} />;
          })}
        </div>
        <button className="plus btn" onClick={plusHandler}>
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="average">
          <p className="average-price-text">Avg./price :</p>
          <h2 id="average-price">{avg}</h2>
        </div>
        <section className="output">
          <div className="output-price buy">
            <p className="buying-text">
              Buying <br />
              total
            </p>
            <h2 id="buying-result">{buy}</h2>
          </div>
          <div className="output-price PNL">
            <p className="PNL-text">PNL</p>
            <h2 id="PNL-result">{PNL}</h2>
          </div>
          <div className="output-price sell">
            <p className="selling-text">
              Selling <br />
              total
            </p>
            <h2 id="selling-result">{sell}</h2>
          </div>
        </section>
      </section>
    </main>
  );
};

export default HomeComponent;
