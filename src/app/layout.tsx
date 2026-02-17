import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from "@/components/NavBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Motiontale Pro",
  description: "Motion control via video references.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="min-h-dvh bg-[#f6f6f8] text-[#0b0b0f]">
            <NavBar />
            <main>{children}</main>
            <footer className="border-t border-black/5 py-10">
              <div className="mx-auto max-w-6xl px-4 text-xs text-black/45">
                © {new Date().getFullYear()} Motiontale Pro. Demo build.
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
