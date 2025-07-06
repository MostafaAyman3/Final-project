import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import NextTopLoader from "nextjs-toploader";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Smart Doctor",
  description:
    "Revolutionize your health journey with AI-powered diagnostics. From skin and eyes to brain scans and lab results, our smart platform delivers instant medical insights—anytime, anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased w-screen h-screen overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="#2b7fff"
            initialPosition={0.08}
            height={3}
            crawl={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2b7fff,0 0 5px #2b7fff"
            zIndex={1600}
            showSpinner={false}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
