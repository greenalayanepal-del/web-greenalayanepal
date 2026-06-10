import { Instrument_Serif, Inter } from "next/font/google";
import type { ReactNode } from "react";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-hero-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-hero-sans",
});

export default function ShaderTestLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`dark ${instrumentSerif.variable} ${inter.variable} font-[family-name:var(--font-hero-sans),ui-sans-serif,system-ui,sans-serif] text-[#f5f5f5]`}
    >
      {children}
    </div>
  );
}
