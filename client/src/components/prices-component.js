import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget(props) {
  let { setColorHome, setColorPrice, setColorProfile, setColorData } = props;

  useEffect(() => {
    setColorHome("white");
    setColorPrice("yellow");
    setColorProfile("white");
    setColorData("white");
  }, []);

  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_1dbd6") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "BINANCE:BTCUSDT",
          interval: "D",
          timezone: "Asia/Taipei",
          theme: "light",
          style: "1",
          locale: "zh_TW",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          container_id: "tradingview_1dbd6",
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_1dbd6" style={{ height: "88vh" }} />
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
}
