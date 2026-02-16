import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from "./redux/store.ts"
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../src/authConfig.ts";

const msalInstance = new PublicClientApplication(msalConfig);

// 1. Initialize MSAL before rendering
msalInstance.initialize().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          {/* 2. MsalProvider must wrap the App */}
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
}).catch((err) => {
  console.error("MSAL Initialization failed:", err);
});
