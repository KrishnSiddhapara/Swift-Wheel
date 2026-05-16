import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './context/DataProvider.jsx'
import { ModalProvider } from './context/ModalContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider>
      <SocketProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </SocketProvider>
    </ModalProvider>
  </StrictMode>,
)
