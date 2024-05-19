import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import { QueryProvider } from "./providers/query-provider.jsx";
import { ToastProvider } from "./providers/toast-provider.jsx";
import { persistor, store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryProvider>
    <ToastProvider />
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </QueryProvider>
);
