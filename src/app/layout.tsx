import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motiontale Pro",
  description: "Precision motion control via video references.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="min-h-dvh bg-[#05060a] text-white">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
              <div className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-3xl" />
              <div className="absolute -right-40 top-40 h-[620px] w-[620px] rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            <NavBar />
            <main>{children}</main>

            <footer className="border-t border-white/10 py-10">
              <div className="mx-auto max-w-6xl px-4 text-xs text-white/40">
                © {new Date().getFullYear()} Motiontale Pro. Demo build.
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
