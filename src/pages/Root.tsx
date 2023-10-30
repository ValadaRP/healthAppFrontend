import {BrowserRouter, Route, Routes} from "react-router-dom";
import Authorization from "@/pages/Authorization.tsx";
import {useAuth} from "@/hooks/auth-hook.ts";
import {AuthContext} from "@/context/auth-context.ts";
import App from "@/pages/App.tsx";
import DietManagement from "@/pages/DietManagement.tsx";
import Navbar from "@/pages/Navbar.tsx";

function Root() {
  const {token, login, logout, email} = useAuth();
  let router;
    if (token){
        router = (
            <Routes>
                <Route path={"/"} element={<App/>} />
                <Route path={"/login"} element={<Authorization/>} />
                <Route path={"/diet-management"} element={<DietManagement/>} />
            </Routes>)
    }else {
        router =(
            <Routes>
                <Route path={"/"} element={<App/>} />
                <Route path={"/login"} element={<Authorization/>} />
            </Routes>)
    }



    return (
      <AuthContext.Provider value={{
        isLoggedIn: !!token,
        token: token,
        // @ts-ignore
        login: login,
        logout: logout,
        email: email
      }}>
          <BrowserRouter>
          <Navbar />
            {router}
          </BrowserRouter>
      </AuthContext.Provider>

  )
}
export default Root
