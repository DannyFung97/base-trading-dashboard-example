"use client";

import { usePrivy, useLogin } from "@privy-io/react-auth";

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
      <section className="w-1/2 border border-gray-500 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 bg-gray-700 text-white text-center rounded-lg">
          Transaction History
        </h2>
        <table className="min-w-full bg-white border border-gray-200">
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
      </section>
    </div>
  );
}
