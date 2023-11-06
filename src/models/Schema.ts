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
    targetCalories: z.number().int().min(500).max(7000,{
        message: "Target calories must be between 1000 and 10000",
    }),
    diet: z.string({
        required_error: "Please select a diet",
    }),
    exclude: z.string().trim()
})

export const heartPredictionSchema = z.object({
    age: z.number().min(19).max(91,{
        message: "Age must be between 19 and 100",
    }),
    systolicBloodPressure: z.number().min(96,{
        message: "Systolic blood pressure must be between 96 and 167",
    }).max(167,{
        message: "Systolic blood pressure must be between 96 and 167",
    }),
    diastolicBloodPressure: z.number().min(67,{
        message: "Diastolic blood pressure must be between 67 and 110",
    }).max(110,{
        message: "Diastolic blood pressure must be between 67 and 110",
    }),
    ldlCholesterol: z.number().min(88,{
        message: "LDL cholesterol must be between 88 and 190",
    }).max(190,{
        message: "LDL cholesterol must be between 88 and 190",
    }),
    hdlCholesterol: z.number().min(18,{
        message: "HDL cholesterol must be between 18 and 90",
    }).max(90,{
        message: "HDL cholesterol must be between 18 and 90",
    }),
    fastingGlucose: z.number().min(57,{
        message: "Fasting glucose must be between 57 and 130",
    }).max(130,{
        message: "Fasting glucose must be between 57 and 130",
    }),
    sex: z.enum(["0", "1"], {
        required_error: "You need to select your gender"
    }),
    exerciseTolerance: z.enum(["1", "2", "3"], {
        required_error: "You need to select your exercise tolerance"
    }),
    heartPalpitations: z.enum(["0", "1"], {
        required_error: "Please select whether you experience heart palpitations"
    }),
    chestPain: z.enum(["0", "1"], {
        required_error: "Please select whether you experience chest pain"
    }),
    shortnessOfBreath: z.enum(["0", "1"], {
        required_error: "Please select whether you experience shortness of breath"
    }),
    heartDisease: z.enum(["0", "1"], {
        required_error: "Please select whether you have a history of heart disease"
    }),
})
