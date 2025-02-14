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
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center transition-colors z-50 ${
        isVisible ? "visible bg-black/20 backdrop-blur-sm" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6 transition-all min-w-xl
          ${isVisible ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-md font-bold">{modalTitle}</h2>
          <button
            onClick={onClose}
            className="bg-transparent font-bold py-2 px-4 rounded"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
