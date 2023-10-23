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


export default function Login(){

    // React Hook Form
    const form = useForm<z.infer<typeof logInSchema>>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email : "example@exp.com",
            password : "password",
        },
    });
    const apiRequest = async (values: z.infer<typeof logInSchema>) => {
        return await axios.post('http://localhost:8080/api/auth/authenticate', {
            values
        });
    }
    const {mutate, data} = useMutation({
        mutationFn: apiRequest,
    });
    const onSubmit = async (values: z.infer<typeof logInSchema>) => {
        mutate(values);
        console.log(data);
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}