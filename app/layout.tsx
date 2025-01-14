import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

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
  children: React.ReactNode;
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
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>Daily Scramble</Link>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>

              <footer className="w-full flex-col text-center mx-auto border-t justify-center items-center">

                <div className="flex gap-2 justify-between max-w-2xl px-10 mx-auto pt-8 text-sm">
                  <Link className={"font-normal"} href={"/about"}>About</Link>
                  <Link className={"font-normal"} href={"/interactive"}>Interactive cube</Link>
                  <Link className={"font-normal"} href={"/leaderboard"}>Leaderboard</Link>

                </div>
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
