import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import {store} from "./redux/store.ts"
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  {/* BrowserRouter should wrap the entire application that uses routing */}
  <BrowserRouter>
    {/* Provider must wrap components that need access to the Redux store */}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
</StrictMode>,
)
