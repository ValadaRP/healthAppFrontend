import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import Root from "@/pages/Root.tsx";
import {ToastContainer} from "react-toastify";

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
              <Root />
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
      />
  </React.StrictMode>,
)
