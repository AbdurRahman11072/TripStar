import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider'
import Routes from './Routes/routes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

     <AuthProvider>
     <RouterProvider router={Routes}>        
      </RouterProvider>
     </AuthProvider>
      
  </React.StrictMode>,
)
