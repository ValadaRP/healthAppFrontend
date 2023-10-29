import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import { signUpSchema} from "@/models/Schema.ts";
import axios from "axios";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "@/context/auth-context.ts";

const Signup = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    type LogInRespone = {
        data: {
            token: string;
        }
    }

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
    const apiRequestSignup = async (values: z.infer<typeof signUpSchema>) => {
        return await axios.post('http://localhost:8080/api/auth/register', {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        });
    }

    const {mutate} = useMutation({
        mutationFn: apiRequestSignup,
        onSuccess: (data: LogInRespone) => {
            auth.login(data.data.token);
            navigate("/diet-management");
        },
    });
    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        mutate(values);
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className={"grid grid-cols-2 gap-x-2"}>
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your first name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter your first name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your last name" {...field} type={"text"}/>
                                        </FormControl>
                                        <FormDescription>
                                            Put your password here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your email" {...field} type={"text"}/>
                                        </FormControl>
                                        <FormDescription>
                                            Put your email here.
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm your password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Confirm password" {...field} type={"password"}/>
                                        </FormControl>
                                        <FormDescription>
                                            Confirm your password here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    </div>
                    <Button type="submit" size={"lg"}>Submit</Button>
                </form>
            </Form>
        </>
    )
};

export default Signup;