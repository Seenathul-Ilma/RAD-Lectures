import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// Why Provider ?
// You wrap the React tree with <Provider store={store}> so React components can access the store.

// Provider (from react-redux) uses React context to make the store available to hooks/components. 
// Without Provider, useSelector/useDispatch can’t access the store.