import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import App from "@/pages/App.tsx";

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
              <App />
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  </React.StrictMode>,
)
