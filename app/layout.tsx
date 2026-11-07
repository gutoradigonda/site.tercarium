import { Suspense } from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/src/context/CartContext";
import Navbar from "@/app/components/Navbar"; // Exemplo do caminho do seu Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Terçarium | Terços de Alta Resistência",
  description: "Terços forjados para o combate espiritual diário.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white" suppressHydrationWarning>
        <CartProvider>
          {/* Envolve o Navbar no Suspense para evitar o erro de prerender do usePathname */}
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}