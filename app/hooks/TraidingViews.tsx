"use client";
import { MARKET_OVERVIEW_WIDGET_CONFIG } from "@/lib/constants";
import { useEffect, useRef } from "react";
const useTraidingViewsWidgets = (
  scriptURL: string,
  config: Record<string, unknown>,
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
  useEffect(() => {
    if (!containerRef.current) return;
    //    if(containerRef.current.dataset.loaded)
    containerRef.current.innerHTML = `<div class="tradingview-widget" style="height:0px; width:100%"></div>`;
    const script = document.createElement("script");
    script.src = scriptURL;
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = "true";

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [scriptURL, height, config]);

  return containerRef;
};

export default useTraidingViewsWidgets;
