import React, { useState, useEffect } from "react";
import DataService from "../services/data.service";

const TokenComponent = ({ data }) => {
  let [prices, setPrices] = useState(data.price);
  let [amounts, setAmounts] = useState(data.amount);
  let [avgPrice, setAvgPrice] = useState("");
  let [sumAmount, setSumAomunt] = useState("");

  // 設置刪除幣種功能
  const handleDelete = (e) => {
    DataService.deleteToken(data.token)
      .then(() => {
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 設置刪除單筆價格及數量功能
  const handleDeleteOne = (index) => {
    DataService.deleteOneToken(data.owner._id, data.token, index)
      .then(() => {
        setPrices(prices.toSpliced(index, 1));
        setAmounts(amounts.toSpliced(index, 1));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 顯示幣種平均價格以及總數量
  useEffect(() => {
    let priceAvg = 0;
    let amountSum = 0;
    for (let i = 0; i < prices.length; i++) {
      priceAvg += prices[i] * amounts[i];
    }
    amounts.map((amount) => {
      amountSum += amount;
    });
    priceAvg = priceAvg / amountSum;
    if (priceAvg > 1) {
      setAvgPrice(Math.round(priceAvg * 10) / 10);
    } else if (priceAvg > 0.1) {
      setAvgPrice(Math.round(priceAvg * 1000) / 1000);
    } else if (priceAvg > 0.01) {
      setAvgPrice(Math.round(priceAvg * 10000) / 10000);
    } else if (priceAvg > 0.001) {
      setAvgPrice(Math.round(priceAvg * 100000) / 100000);
    } else setAvgPrice(Math.round(priceAvg * 10000000000) / 10000000000);
    setSumAomunt(amountSum);
  }, [amounts]);

  return (
    <div className="tokenTable-border">
      <div className="tokenTable">
        <ul>
          <li className="title">幣種</li>
          <li style={{ fontSize: "2.5rem" }}>
            {data.token}
            <br />
            <div className="token-btn">
              <button className="btn btn-primary" onClick={handleDelete}>
                刪除幣種
              </button>
            </div>
          </li>
        </ul>
        <ul>
          <li className="title">價格</li>
          {prices.map((d, index) => {
            return <li key={index}>{d}</li>;
          })}
          {prices.length != 0 && (
            <li className="totalData">
              平均價格
              <br />
              {avgPrice}
            </li>
          )}
        </ul>
        <ul>
          <li className="title">數量</li>
          {amounts.map((d, index) => {
            return (
              <li key={index}>
                {d}
                <button
                  className="amount-deleteOne"
                  onClick={() => handleDeleteOne(index)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            );
          })}
          {amounts.length != 0 && (
            <li className="totalData">
              總計數量
              <br />
              {sumAmount}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TokenComponent;
