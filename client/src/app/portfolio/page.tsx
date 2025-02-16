"use client";

import { usePrivy, useLogin } from "@privy-io/react-auth";



const mockPortfolio = [
  { asset: "Bitcoin", amount: 1.5, value: 67500 },
  { asset: "Ethereum", amount: 5, value: 15000 },
  { asset: "Tether", amount: 1000, value: 1000 },
];

export default function User() {
  const { authenticated, ready } = usePrivy();
  const { login } = useLogin();

  if (!authenticated || !ready) {
    return (
      <div className="flex justify-center py-10 items-center m-auto">
        <button
          onClick={login}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-10 flex justify-center items-start gap-10">
      <section className="w-1/2 border border-gray-500 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 bg-gray-700 text-white text-center rounded-lg">
          Portfolio
        </h2>
        <div className="flex flex-col gap-5">
          {mockPortfolio.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg bg-white"
            >
              <h3 className="text-lg font-bold">{item.asset}</h3>
              <p>Amount: {item.amount}</p>
              <p>Value: ${item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
