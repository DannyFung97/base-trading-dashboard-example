"use client";

import Modal from "@/components/molecules/Modal";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";

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

const createQueryString = (params: { [key: string]: string }) => {
  return new URLSearchParams(params).toString();
};

export default function Home() {
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

  const updateUrl = (inputToken: string, outputToken: string) => {
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

  const handleTrade = () => {
    alert(`Trade executed with value: ${debouncedInputAmount}`);
  };

  const switchInputAndOutput = () => {
    setInputToken(outputToken);
    setOutputToken(inputToken);
    updateUrl(outputToken, inputToken);
  };

  const handleSelectToken = useCallback(
    (token: Token) => {
      if (isTokenModalVisible === "changingA") {
        if (token.symbol === outputToken) {
          switchInputAndOutput();
        } else {
          setInputToken(token.symbol);
          updateUrl(token.symbol, outputToken);
        }
      }
      if (isTokenModalVisible === "changingB") {
        if (token.symbol === inputToken) {
          switchInputAndOutput();
        } else {
          setOutputToken(token.symbol);
          updateUrl(inputToken, token.symbol);
        }
      }
      setIsTokenModalVisible(false);
    },
    [isTokenModalVisible, inputToken, outputToken]
  );

  return (
    <div className="flex gap-2 w-screen p-10 justify-center">
      {!!isTokenModalVisible && (
        <Modal
          isVisible={!!isTokenModalVisible}
          onClose={() => setIsTokenModalVisible(false)}
          modalTitle={"Select Token"}
        >
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
        </Modal>
      )}
      <div className="flex flex-col max-w-md">
        <div className="flex flex-col p-2 relative bg-white">
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
            onClick={switchInputAndOutput}
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
