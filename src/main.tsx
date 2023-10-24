import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import App from "@/App.tsx";
import AuthProvider from "react-auth-kit";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Authorization from "@/Authorization.tsx";
const queryClient = new QueryClient();

// const {token, login, logout} = useAuth();


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login",
        element: <Authorization/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <AuthProvider authType={"cookie"} authName={"_auth"} cookieDomain={window.location.hostname} cookieSecure={false}>
              <RouterProvider router={router} />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  </React.StrictMode>,
)
