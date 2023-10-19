import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Authorization() {
    return (
        <>
            <div className={"w-full flex justify-center h-screen "}>
                <Tabs defaultValue="account" className="w-[700px] mt-10">
                    <TabsList className={"grid w-full grid-cols-2"}>
                        <TabsTrigger value="Login">Log in</TabsTrigger>
                        <TabsTrigger value="Signin">Sign in</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Login" className={""}>
                        <form className={"flex flex-col"}>
                            <div className={"flex flex-col"}>
                                <label>Email</label>
                                <input type={"text"} className={"border-[0.5px] border-black"}/>
                            </div>
                            <div className={"flex flex-col"}>
                                <label>Password</label>
                                <input type={"text"} className={"border-[0.5px] border-black"}/>
                            </div>
                            <button type={"submit"} className={"bg-blue-500 w-1/4 mt-2 rounded-md p-1 border-[0.5px] border-black"}>Log in</button>
                        </form>
                    </TabsContent>
                    <TabsContent value="Signin">Change your password here.</TabsContent>
                </Tabs>
            </div>

        </>
    )
}

export default Authorization
