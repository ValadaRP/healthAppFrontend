import {logInSchema} from "@/models/Schema.ts";
import {z} from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useMutation} from "react-query";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "@/context/auth-context.ts";
import { useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';

export default function Login(){
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    type LogInResponse = {
        data: {
            token: string;
        }
    }
    const form = useForm<z.infer<typeof logInSchema>>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email : "example2@exp.com",
            password : "password",
        },
    });
    const apiRequest = async (values: z.infer<typeof logInSchema>) => {
        return await toast.promise(axios.post('http://localhost:8080/api/auth/authenticate', {
            email: values.email,
            password: values.password,
        }), {
            pending: 'Logging in...',
            success: 'Logged in successfully ! 😁',
            error: 'Something went wrong ! 😒',
        });
    }
    const {mutate} = useMutation({
        mutationFn: apiRequest,
        onSuccess: (data: LogInResponse) => {
            auth.login(data.data.token, form.getValues("email"));
            navigate("/diet-management");
        },
    });
    const onSubmit = async (values: z.infer<typeof logInSchema>) => {
        mutate(values);
    };


    return(
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email addres" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your email address.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} type={"password"}/>
                                </FormControl>
                                <FormDescription>
                                    Put your password here.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size={"lg"}>Submit</Button>
                </form>
            </Form>
        </>
    )
}