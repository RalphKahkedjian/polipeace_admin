import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContextProvider } from './contexts/contextProvider'
import { RouterProvider } from 'react-router-dom'
import router from './Router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
