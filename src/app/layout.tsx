import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import FloatingContactButton from "@/components/ui/FloatingContactButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PNE Property Management | Premier Property Solutions",
  description:
    "Central Ohio's premier property management — distinguished oversight for residents and investors across Columbus, Hilliard, Grove City, and Worthington.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body
        className="min-h-screen"
        style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
      >
        <LenisProvider>
          {children}
          <FloatingContactButton />
        </LenisProvider>
      </body>
    </html>
  );
}
