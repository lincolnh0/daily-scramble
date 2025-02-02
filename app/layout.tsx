import HeaderAuth from "@/components/hearder-right";
import {ThemeSwitcher} from "@/components/theme-switcher";
import {Geist} from "next/font/google";
import {ThemeProvider} from "next-themes";
import Link from "next/link";
import "./globals.css";
import Script from "next/script";
import FloatingMenu from "@/components/floating-menu";
import {ReactNode} from "react";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Daily Scramble",
  description: "Solve a daily rubik's cube scramble",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
      <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <Script src="https://cloud.umami.is/script.js" data-website-id="3053e305-87b8-471c-a3a1-4c1e01a401bc"/>
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href={"/"}>Daily Scramble</Link>
                </div>
                <HeaderAuth/>
              </div>
            </nav>
            <div className="flex flex-col gap-20 max-w-5xl p-5">
              {children}
            </div>
            <FloatingMenu/>
            <footer className="w-full flex-col text-center mx-auto border-t justify-center items-center">

              <div className="flex items-center justify-center text-xs  mx-auto gap-4 py-8">
                <p>
                  A project by{" "}
                  <a
                      href="https://www.lncln.io/"
                      target="_blank"
                      className="font-bold hover:underline"
                  >
                    lincolnh0
                  </a>
                </p>
                <ThemeSwitcher/>
              </div>
            </footer>
          </div>
        </main>
      </ThemeProvider>
      </body>
      </html>
  );
}
