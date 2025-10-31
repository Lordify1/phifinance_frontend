import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routers from './router/Router.tsx'

export const appUrl = 'http://127.0.0.1:8000/images'
export const appName = 'PhiFinance'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routers/>
  </StrictMode>,
)
