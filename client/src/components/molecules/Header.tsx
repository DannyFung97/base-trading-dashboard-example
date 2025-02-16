"use client";

import { truncateWithEllipsis } from "@/utils/format";
import {
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useLogin, useLogout, usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { useState } from "react";
import { useAccount } from "wagmi";

const mockTransactions = [
  {
    id: 1,
    date: "2025-02-01",
    type: "Buy",
    asset: "WBTC",
    amount: 0.5,
    price: 45000,
  },
  {
    id: 2,
    date: "2025-02-05",
    type: "Sell",
    asset: "ETH",
    amount: 2,
    price: 3000,
  },
  {
    id: 3,
    date: "2025-02-10",
    type: "Buy",
    asset: "WBTC",
    amount: 1,
    price: 50000,
  },
  {
    id: 4,
    date: "2025-02-15",
    type: "Sell",
    asset: "ETH",
    amount: 3,
    price: 4000,
  },
  {
    id: 5,
    date: "2025-02-16",
    type: "Sell",
    asset: "ETH",
    amount: 1,
    price: 2000,
  },
  // Add more mock transactions here
];

export default function Header() {
  const { address: wagmiAddress } = useAccount();
  const { authenticated, ready, user: privyUser } = usePrivy();

  const [open, setOpen] = useState(false);

  const { login } = useLogin({
    onComplete: ({
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    }) => {
      console.log(
        "login complete",
        user,
        isNewUser,
        wasAlreadyAuthenticated,
        loginMethod,
        loginAccount,
        authenticated,
        user,
        ready
      );
    },
    onError: (error) => {
      console.error("login error", error);
    },
  });

  const { logout } = useLogout({
    onSuccess: () => {},
  });

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">Tradepost</Link>
        <Link href="/user" className="underline">
          Portfolio
        </Link>
      </div>
      {privyUser ? (
        <div className="flex items-center space-x-2">
          <Drawer
            open={open}
            onClose={closeDrawer}
            className="p-4"
            size={500}
            placement="right"
          >
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                Transaction History
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawer}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            <table className=" text-black bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Asset</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Price</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-2 px-4 border-b">{transaction.date}</td>
                    <td className="py-2 px-4 border-b">{transaction.type}</td>
                    <td className="py-2 px-4 border-b">{transaction.asset}</td>
                    <td className="py-2 px-4 border-b">{transaction.amount}</td>
                    <td className="py-2 px-4 border-b">${transaction.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Drawer>
          <Button onClick={openDrawer}>
            {truncateWithEllipsis(privyUser?.wallet?.address) ?? wagmiAddress}
          </Button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={login}
        >
          Login
        </button>
      )}
    </header>
  );
}
