// app/types/globals.d.ts

import type {
  Control,
  FieldError,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

declare global {
  // -------------------------
  // Auth Types
  // -------------------------
  type SignInFormData = {
    email: string;
    password: string;
  };

  type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  };

  // -------------------------
  // Form Props
  // -------------------------
  type CountrySelectProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
  };

  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    validation?: RegisterOptions<any>;
    disabled?: boolean;
    value?: string;
  };

  type Option = {
    value: string;
    label: string;
  };

  type SelectFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    options: readonly Option[];
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
  };

  // -------------------------
  // UI Types
  // -------------------------
  type FooterLinkProps = {
    text: string;
    linkText: string;
    href: string;
  };

  type SearchCommandProps = {
    renderAs?: "button" | "text";
    label?: string;
    initialStocks: StockWithWatchlistStatus[];
    open?: boolean;
    setOpen?: (open: boolean) => void;
    buttonLabel?: string;
    buttonVariant?: "primary" | "secondary";
    className?: string;
  };

  type WelcomeEmailData = {
    email: string;
    name: string;
    intro: string;
  };

  // -------------------------
  // User Types
  // -------------------------
  type User = {
    id: string;
    name: string;
    email: string;
  };

  // -------------------------
  // Stock Types
  // -------------------------
  type Stock = {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
  };

  type StockWithWatchlistStatus = Stock & {
    isInWatchlist: boolean;
  };

  type FinnhubSearchResult = {
    symbol: string;
    description: string;
    displaySymbol?: string;
    type: string;
  };

  type FinnhubSearchResponse = {
    count: number;
    result: FinnhubSearchResult[];
  };

  type StockDetailsPageProps = {
    params: Promise<{
      symbol: string;
    }>;
  };

  type WatchlistButtonProps = {
    symbol: string;
    company: string;
    isInWatchlist: boolean;
    showTrashIcon?: boolean;
    type?: "button" | "icon";
    onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
  };

  type QuoteData = {
    c?: number;
    dp?: number;
  };

  type ProfileData = {
    name?: string;
    marketCapitalization?: number;
  };

  type FinancialsData = {
    metric?: { [key: string]: number };
  };

  type SelectedStock = {
    symbol: string;
    company: string;
    currentPrice?: number;
  };

  type StockWithData = {
    userId: string;
    symbol: string;
    company: string;
    addedAt: Date;
    currentPrice?: number;
    changePercent?: number;
    priceFormatted?: string;
    changeFormatted?: string;
    marketCap?: string;
    peRatio?: string;
  };

  type WatchlistTableProps = {
    watchlist: StockWithData[];
  };

  // -------------------------
  // Alerts Types
  // -------------------------
  type AlertData = {
    symbol: string;
    company: string;
    alertName: string;
    alertType: "upper" | "lower";
    threshold: string;
  };

  type AlertModalProps = {
    alertId?: string;
    alertData?: AlertData;
    action?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };

  type Alert = {
    id: string;
    symbol: string;
    company: string;
    alertName: string;
    currentPrice: number;
    alertType: "upper" | "lower";
    threshold: number;
    changePercent?: number;
  };

  type AlertsListProps = {
    alertData: Alert[] | undefined;
  };

  // -------------------------
  // News Types
  // -------------------------
  type MarketNewsArticle = {
    id: number;
    headline: string;
    summary: string;
    source: string;
    url: string;
    datetime: number;
    category: string;
    related: string;
    image?: string;
  };

  type WatchlistNewsProps = {
    news?: MarketNewsArticle[];
  };

  type RawNewsArticle = {
    id: number;
    headline?: string;
    summary?: string;
    source?: string;
    url?: string;
    datetime?: number;
    image?: string;
    category?: string;
    related?: string;
  };
}

// Required to make the file a module
export {};
