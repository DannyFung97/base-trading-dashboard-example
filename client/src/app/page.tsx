"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { useSignMessage } from "wagmi";
import { Dialog, DialogHeader } from "@material-tailwind/react";

interface Token {
  id: number;
  name: string;
  symbol: string;
  price: number;
  decimals: number;
  nextPath: string;
}

const mockTokens: Token[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 45000,
    decimals: 8,
    nextPath: "ETH",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3000,
    decimals: 18,
    nextPath: "USDT",
  },
  {
    id: 3,
    name: "Tether",
    symbol: "USDT",
    price: 1,
    decimals: 6,
    nextPath: "BTC",
  },
  // Add more mock tokens here
];

const tokenIdMap: { [key: string]: Token } = mockTokens.reduce((acc, token) => {
  acc[token.symbol] = token;
  return acc;
}, {} as { [key: string]: Token });

const createQueryString = (params: { [key: string]: string }) => {
  return new URLSearchParams(params).toString();
};

const findTokenPath = async (
  token: string,
  targetToken: string
): Promise<string[]> => {
  console.log(`Finding path from ${token} to ${targetToken}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const path = [token];
  let nextToken = tokenIdMap[token].nextPath;
  while (nextToken !== targetToken) {
    path.push(nextToken);
    nextToken = tokenIdMap[nextToken].nextPath;
  }
  path.push(targetToken);
  return path;
};

export default function Home() {
  const { signMessage, isPending } = useSignMessage();
  const { authenticated, ready } = usePrivy();
  const { address: wagmiAddress } = useAccount();

  const searchParams = useSearchParams();
  const queryTokenA = searchParams.get("tokenA");
  const queryTokenB = searchParams.get("tokenB");

  const [debouncedInputAmount, setDebouncedInputAmount] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputToken, setInputToken] = useState(
    typeof queryTokenA === "string" ? queryTokenA : mockTokens[0].symbol
  );
  const [outputToken, setOutputToken] = useState(
    typeof queryTokenB === "string" ? queryTokenB : mockTokens[1].symbol
  );
  const [isTokenModalVisible, setIsTokenModalVisible] = useState<
    false | "changingA" | "changingB"
  >(false);
  const [amountLoading, setAmountLoading] = useState(false);

  const {
    data: tradePath,
    isLoading,
    isStale,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tokenPath", inputToken, outputToken],
    queryFn: () => findTokenPath(inputToken, outputToken),
    enabled: !!inputToken && !!outputToken,
    staleTime: 10000,
  });

  const updateUrl = async (inputToken: string, outputToken: string) => {
    const newUrl =
      "/swap?" + createQueryString({ tokenA: inputToken, tokenB: outputToken });
    window.history.replaceState(null, "", newUrl);
  };

  const outputAmount = useMemo(() => {
    const _inputToken = tokenIdMap[inputToken];
    const _outputToken = tokenIdMap[outputToken];
    if (!_inputToken || !_outputToken) {
      return "";
    }

    const inputAmountNumber = parseFloat(debouncedInputAmount);
    if (isNaN(inputAmountNumber)) {
      return "";
    }

    const outputAmountNumber =
      (inputAmountNumber * _inputToken.price) / _outputToken.price;
    return outputAmountNumber.toFixed(_outputToken.decimals);
  }, [debouncedInputAmount, inputToken, outputToken]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputAmount(inputAmount);
      setAmountLoading(false);
      console.log(`Debounced value: ${inputAmount}`);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputAmount]);

  const handleTrade = async () => {
    try {
      await signMessage({ message: "Trade on Tradepost?" });
    } catch (error) {
      console.error("Trade failed", error);
    }
  };

  const switchInputAndOutput = useCallback(
    (tokenIn: string, tokenOut: string) => {
      setInputToken(tokenOut);
      setOutputToken(tokenIn);
      updateUrl(tokenOut, tokenIn);
    },
    []
  );

  const handleSelectToken = useCallback(
    (token: Token) => {
      if (isTokenModalVisible === "changingA") {
        if (token.symbol === outputToken) {
          switchInputAndOutput(outputToken, inputToken);
        } else {
          setInputToken(token.symbol);
          updateUrl(token.symbol, outputToken);
        }
      }
      if (isTokenModalVisible === "changingB") {
        if (token.symbol === inputToken) {
          switchInputAndOutput(inputToken, outputToken);
        } else {
          setOutputToken(token.symbol);
          updateUrl(inputToken, token.symbol);
        }
      }
      setIsTokenModalVisible(false);
    },
    [isTokenModalVisible, inputToken, outputToken, switchInputAndOutput]
  );

  return (
    <div className="flex gap-2 w-screen p-10 justify-center">
      {!!isTokenModalVisible && (
        <Dialog open={!!isTokenModalVisible} handler={setIsTokenModalVisible}>
          <DialogHeader>Select Token</DialogHeader>
          <div className="flex flex-col gap-1 border border-width-2 p-2">
            {mockTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => handleSelectToken(token)}
                className={"font-bold py-2 px-4 rounded hover:bg-blue-200"}
              >
                {token.symbol}
              </button>
            ))}
          </div>
        </Dialog>
      )}
      <div className="flex flex-col max-w-md">
        <div className="flex flex-col p-4 relative bg-white border border-gray-500 rounded-lg">
          <div className="items-center flex border-b-4 border-blue-500">
            <button
              style={{ width: "100px" }}
              onClick={() => setIsTokenModalVisible("changingA")}
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            >
              {inputToken}
            </button>
            <input
              type="text"
              value={inputAmount}
              onChange={(e) => {
                setAmountLoading(true);
                setInputAmount(e.target.value);
              }}
              placeholder={`0.0 ${inputToken}`}
              className="text-black p-10 text-right bg-transparent"
            />
          </div>
          <button
            onClick={() => {
              switchInputAndOutput(inputToken, outputToken);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            Swap
          </button>
          <div className="items-center flex">
            <button
              style={{ width: "100px" }}
              onClick={() => setIsTokenModalVisible("changingB")}
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            >
              {outputToken}
            </button>
            <input
              disabled
              type="text"
              value={amountLoading ? "loading..." : outputAmount}
              placeholder=""
              className="text-black text-right p-10 bg-transparent"
            />
          </div>
        </div>
        <div className="flex bg-blue-900 my-2 justify-center p-2">
          <div className="flex  text-blue-200">
            {isLoading || isRefetching
              ? "loading"
              : tradePath?.map((token, index) => (
                  <div key={index} className="text-center">
                    {token} {index < tradePath.length - 1 ? "→" : ""}
                  </div>
                ))}
          </div>
        </div>
        {!isRefetching && isStale && tradePath && (
          <div className="flex flex-col bg-red-900 my-2 justify-center p-2 gap-2">
            <div className="text-center text-red-200">[!] stale path data</div>
            <button
              className="bg-yellow-800 hover:bg-yellow-900 text-white font-bold rounded"
              onClick={() => refetch()}
            >
              refresh path
            </button>
          </div>
        )}
        <button
          disabled={!authenticated || !ready}
          onClick={handleTrade}
          className={`${
            !authenticated || !ready
              ? "bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 opacity-50 cursor-not-allowed"
              : !isLoading && isStale
              ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          }`}
        >
          {!authenticated || !ready
            ? "Login to Trade"
            : isPending
            ? "Awaiting Confirmation"
            : "Trade"}
        </button>
      </div>
    </div>
  );
}
