import TradingViewWidget from "@/components/traidingView";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  scriptURL,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const HomePage = () => {
  return (
    <div className=" flex home-wrapper min-h-screen  h-screen place-items-center mx-10">
      <section className="grid w-full gap-15 grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptURL={scriptURL()}
            config={MARKET_OVERVIEW_WIDGET_CONFIG as Record<string, unknown>}
          />
        </div>

        <div className="md:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptURL={scriptURL("stock-heatmap")}
            config={HEATMAP_WIDGET_CONFIG as Record<string, unknown>}
          />
        </div>
      </section>

      <section className="grid w-full gap-15 grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1">
          <TradingViewWidget
            scriptURL={scriptURL("timeline")}
            config={TOP_STORIES_WIDGET_CONFIG as Record<string, unknown>}
          />
        </div>

        <div className="md:col-span-2">
          <TradingViewWidget
            scriptURL={scriptURL("market-quotes")}
            config={MARKET_DATA_WIDGET_CONFIG as Record<string, unknown>}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
