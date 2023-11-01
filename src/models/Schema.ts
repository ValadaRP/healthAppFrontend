import {z} from "zod";

export const logInSchema = z.object({
    email: z.string().trim().toLowerCase().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6).max(100,{
        message: "Password must be between 6 and 100 characters",
    }),
});

export const signUpSchema = z.object({
    firstName: z.string().min(2).max(100,{
        message: "First name must be between 2 and 100 characters",
    }),
    lastName: z.string().min(2).max(100,{
        message: "Last name must be between 2 and 100 characters",
    }),
    email: z.string().trim().toLowerCase().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6).max(100,{
        message: "Password must be between 6 and 100 characters",
    }),
    confirmPassword: z.string().min(6).max(100,{
        message: "Password must be between 6 and 100 characters",
    }).optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const mealsGenerateSchema = z.object({
    targetCalories: z.number().int().min(500).max(10000,{
        message: "Target calories must be between 1000 and 10000",
    }),
    diet: z.string({
        required_error: "Please select a diet",
    }),
    exclude: z.string().trim(),
})
