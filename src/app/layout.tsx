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
              <div className="mx-auto max-w-6xl px-4">
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-black/45">
                  <div>© {new Date().getFullYear()} Motiontale Pro. Demo build.</div>
                  <div className="flex flex-wrap gap-4">
                    <a className="hover:underline" href="/pricing">Pricing</a>
                    <a className="hover:underline" href="/terms-of-service">Terms of Service</a>
                    <a className="hover:underline" href="/terms-of-use">Terms of Use</a>
                    <a className="hover:underline" href="/privacy-policy">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
