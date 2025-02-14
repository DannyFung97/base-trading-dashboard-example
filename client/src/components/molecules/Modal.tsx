"use client";

export default function Modal({
  isVisible,
  onClose,
  children,
  modalTitle,
}: {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalTitle: string;
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
