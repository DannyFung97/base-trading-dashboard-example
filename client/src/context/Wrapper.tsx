import { store, persistor } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SampleProvider } from "./SampleProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SampleProvider>{children}</SampleProvider>
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;
