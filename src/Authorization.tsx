import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/components/login/Login.tsx";

function Authorization() {
    return (
        <>
            <div className={"w-full flex justify-center h-[600px]"}>
                <Tabs defaultValue="account" className="w-[700px] mt-10 shadow-2xl p-6 rounded-md">
                    <TabsList className={"grid w-full grid-cols-2"}>
                        <TabsTrigger value="Login">Log in</TabsTrigger>
                        <TabsTrigger value="Signin">Sign in</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Login" className={""}>
                        <Login />
                    </TabsContent>
                    <TabsContent value="Signin">Change your password here.</TabsContent>
                </Tabs>
            </div>

        </>
    )
}

export default Authorization
