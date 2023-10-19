import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  </React.StrictMode>,
)
