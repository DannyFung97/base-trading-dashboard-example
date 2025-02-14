"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wrapper from "@/context/Wrapper";
import { wagmiConfig } from "@/config/wagmi";
import { WagmiProvider } from "wagmi";
import Header from "@/components/molecules/Header";

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <Wrapper>
              <Header />
              {children}
            </Wrapper>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
