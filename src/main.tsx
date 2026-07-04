import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        visibleToasts={3} 
        expand={false} 
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#f4f4f5',
            borderColor: '#27272a',
          }
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
