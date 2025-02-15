"use client";

import { truncateWithEllipsis } from "@/utils/format";
import { useLogin, useLogout, usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Header() {
  const { address: wagmiAddress } = useAccount();
  const { authenticated, ready, user: privyUser } = usePrivy();

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

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">Tradepost</Link>
        <Link href="/user" className="underline">
          My Trades
        </Link>
      </div>
      {privyUser ? (
        <div className="flex items-center space-x-2">
          <span>
            {truncateWithEllipsis(privyUser?.wallet?.address) ?? wagmiAddress}
          </span>
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
