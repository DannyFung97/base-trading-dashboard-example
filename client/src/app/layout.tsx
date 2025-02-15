"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wrapper from "@/context/Wrapper";
import { wagmiConfig } from "@/config/wagmi";
import Header from "@/components/molecules/Header";
import { WagmiProvider } from "wagmi";
// import { PrivyProvider } from "@privy-io/react-auth";
// import { WagmiProvider } from "@privy-io/wagmi";
// import { baseSepolia } from "viem/chains";

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
        {/* <PrivyProvider
          appId={String(process.env.NEXT_PUBLIC_PRIVY_APP_ID)}
          config={{
            defaultChain: baseSepolia,
            loginMethods: ["wallet", "email"],
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          }}
        > */}
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <Wrapper>
              <Header />
              {children}
            </Wrapper>
          </WagmiProvider>
        </QueryClientProvider>
        {/* </PrivyProvider> */}
      </body>
    </html>
  );
}
