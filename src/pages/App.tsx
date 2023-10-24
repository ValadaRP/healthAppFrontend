import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Authorization from "@/pages/Authorization.tsx";
import {useAuth} from "@/hooks/auth-hook.ts";
import {AuthContext} from "@/context/auth-context.ts";

function App() {
  const {token, login, logout} = useAuth();

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

    return (
      <AuthContext.Provider value={{
        isLoggedIn: !!token,
        token: token,
        // @ts-ignore
        login: login,
        logout: logout
      }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>

  )
}
export default App
