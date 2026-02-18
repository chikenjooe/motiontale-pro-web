import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from "@/components/NavBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Motiontale Pro",
  description: "Motion control via video references.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/brand/icon-180.png", sizes: "180x180" }],
  },
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
                    <Link className="hover:underline" href="/pricing">
                      Pricing
                    </Link>
                    <Link className="hover:underline" href="/terms-of-service">
                      Terms of Service
                    </Link>
                    <Link className="hover:underline" href="/terms-of-use">
                      Terms of Use
                    </Link>
                    <Link className="hover:underline" href="/privacy-policy">
                      Privacy Policy
                    </Link>
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
