"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

// Define the shape of the context state
interface SampleContextState {
  value: string;
  setValue: (newValue: string) => void;
}

// Create the context with a default value
const SampleContext = createContext<SampleContextState | undefined>(undefined);

// Create a provider component
const SampleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<string>("");

  // Memoize the context value
  const contextValue = useMemo(() => ({ value, setValue }), [value]);

  return (
    <SampleContext.Provider value={contextValue}>
      {children}
    </SampleContext.Provider>
  );
};

// Custom hook to use the SampleContext
const useSampleContext = () => {
  const context = useContext(SampleContext);
  if (context === undefined) {
    throw new Error("useSampleContext must be used within a SampleProvider");
  }
  return context;
};

export { SampleProvider, useSampleContext };
