// ============================================================
// Fix for side-effect CSS imports (Next.js App Router)
// Supports: import "./globals.css"
// ============================================================

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";
declare module "*.styl";
declare module "*.module.css";
declare module "*.module.scss";

// ============================================================
// Asset Modules
// ============================================================
declare module "*.svg" {
  import React from "react";
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}
