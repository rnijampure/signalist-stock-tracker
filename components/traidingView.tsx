"use client";
import useTraidingViewsWidgets from "@/app/hooks/TraidingViews";
import { MARKET_OVERVIEW_WIDGET_CONFIG } from "@/lib/constants";
import React, { useRef, memo } from "react";
interface TradingViewWidgetProps {
  title?: string;
  config: Record<string, unknown>;
  scriptURL: string;
  height?: number;
  className?: string;
}

function TradingViewWidget({
  title,
  scriptURL,
  config,
  height = 600,
  className,
}: TradingViewWidgetProps) {
  const containerRef = useTraidingViewsWidgets(scriptURL, config, height);

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-semibold text-2xl text-grey-100 mb-5">{title}</h3>
      )}
      <div
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ height: "100%", width: "100%", verticalAlign: "top" }}
      >
        <div className="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/symbols/NASDAQ-AAPL/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">AAPL stock chart</span>
          </a>
          <span className="trademark"> by TradingView</span>
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
