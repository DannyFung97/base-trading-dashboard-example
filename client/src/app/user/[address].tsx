"use client";

import { useRouter } from "next/router";

const mockTransactions = [
  {
    id: 1,
    date: "2025-02-01",
    type: "Buy",
    asset: "Bitcoin",
    amount: 0.5,
    price: 45000,
  },
  {
    id: 2,
    date: "2025-02-05",
    type: "Sell",
    asset: "Ethereum",
    amount: 2,
    price: 3000,
  },
  // Add more mock transactions here
];

const mockPortfolio = [
  { asset: "Bitcoin", amount: 1.5, value: 67500 },
  { asset: "Ethereum", amount: 5, value: 15000 },
  // Add more mock portfolio items here
];

export default function User() {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Address: {address}</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
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

      <section>
        <h2 className="text-xl font-semibold mb-2">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
