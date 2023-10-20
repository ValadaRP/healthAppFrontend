import {z} from "zod";

export const logInSchema = z.object({
    email: z.string().trim().toLowerCase().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6).max(100,{
        message: "Password must be between 6 and 100 characters",
    }),
});

