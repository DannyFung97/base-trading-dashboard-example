"use client";

import { useState, useEffect, useRef, useMemo } from "react";

interface Token {
  id: number;
  name: string;
  symbol: string;
  price: number;
  decimals: number;
}

const mockTokens: Token[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 45000,
    decimals: 8,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3000,
    decimals: 18,
  },
  {
    id: 3,
    name: "Tether",
    symbol: "USDT",
    price: 1,
    decimals: 6,
  },
  // Add more mock tokens here
];

const tokenIdMap: { [key: string]: Token } = mockTokens.reduce((acc, token) => {
  acc[token.symbol] = token;
  return acc;
}, {} as { [key: string]: Token });

export default function Home() {
  const [debouncedInputAmount, setDebouncedInputAmount] = useState("");

  const [inputAmount, setInputAmount] = useState("");
  const [inputCurrency, setInputCurrency] = useState(mockTokens[0].symbol);
  const [outputCurrency, setOutputCurrency] = useState(mockTokens[1].symbol);

  const [amountLoading, setAmountLoading] = useState(false);

  const outputAmount = useMemo(() => {
    const inputToken = tokenIdMap[inputCurrency];
    const outputToken = tokenIdMap[outputCurrency];
    if (!inputToken || !outputToken) {
      return "";
    }

    const inputAmountNumber = parseFloat(debouncedInputAmount);
    if (isNaN(inputAmountNumber)) {
      return "";
    }

    const outputAmountNumber =
      (inputAmountNumber * inputToken.price) / outputToken.price;
    return outputAmountNumber.toFixed(outputToken.decimals);
  }, [debouncedInputAmount, inputCurrency, outputCurrency]);

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

  const handleTrade = () => {
    alert(`Trade executed with value: ${debouncedInputAmount}`);
  };

  const switchInputAndOutput = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
  };

  console.log(amountLoading);

  return (
    <div className="flex gap-2 h-screen w-screen p-10 justify-center">
      <div className="flex flex-col max-w-md">
        <div className="flex flex-col py-2 relative">
          <div className="flex">
            <select
              value={inputCurrency}
              onChange={(e) => {
                inputCurrency === e.target.value
                  ? switchInputAndOutput()
                  : setInputCurrency(e.target.value);
              }}
              className="bg-gray-200 border border-gray-300 p-2 text-black"
            >
              {mockTokens.map((token) => (
                <option
                  key={token.id}
                  value={token.symbol}
                  className="text-black"
                >
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={inputAmount}
              onChange={(e) => {
                setAmountLoading(true);
                setInputAmount(e.target.value);
              }}
              placeholder={`0.0 ${inputCurrency}`}
              className="border border-gray-300 text-black p-10 text-right"
            />
          </div>
          <button
            onClick={switchInputAndOutput}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            Swap
          </button>
          <div className="flex">
            <select
              value={outputCurrency}
              onChange={(e) => {
                inputCurrency === e.target.value
                  ? switchInputAndOutput()
                  : setOutputCurrency(e.target.value);
              }}
              className="bg-gray-200 border border-gray-300 p-2 text-black"
            >
              {mockTokens.map((token) => (
                <option
                  key={token.id}
                  value={token.symbol}
                  className="text-black"
                >
                  {token.symbol}
                </option>
              ))}
            </select>
            <input
              disabled
              type="text"
              value={amountLoading ? "loading..." : outputAmount}
              placeholder=""
              className="border border-gray-300 text-black text-right p-10 bg-white"
            />
          </div>
        </div>
        <button
          onClick={handleTrade}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Trade
        </button>
      </div>
    </div>
  );
}
