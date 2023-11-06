import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {heartPredictionSchema} from "@/models/Schema.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {toast} from "react-toastify";
import axios from "axios";
import {useMutation} from "react-query";
import {AuthContext} from "@/context/auth-context.ts";
import {useContext} from "react";

const HeartPredictionForm = () => {
    const auth = useContext(AuthContext);
    const form = useForm<z.infer<typeof heartPredictionSchema>>({
        resolver: zodResolver(heartPredictionSchema),
        defaultValues: {
            age: 19,
            systolicBloodPressure: 96,
            diastolicBloodPressure: 67,
            ldlCholesterol: 88,
            hdlCholesterol: 18,
            fastingGlucose: 57,
        },
    });

    const heartRequest = async (values: z.infer<typeof heartPredictionSchema>) => {
        return await toast.promise(axios.post('http://localhost:8080/api/image/heart', {
            age: values.age,
            sex: values.sex,
            systolicBloodPressure: values.systolicBloodPressure,
            diastolicBloodPressure: values.diastolicBloodPressure,
            ldlCholesterol: values.ldlCholesterol,
            hdlCholesterol: values.hdlCholesterol,
            fastingGlucose: values.fastingGlucose,
            exerciseTolerance: values.exerciseTolerance,
            heartPalpitations: values.heartPalpitations,
            chestPain: values.chestPain,
            shortnessOfBreath: values.shortnessOfBreath,
            heartDisease: values.heartDisease,
        },{
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        }), {
            pending: 'Logging in...',
            success: 'Logged in successfully ! 😁',
            error: 'Something went wrong ! 😒',
        });

    }
    const {mutate} = useMutation({
        mutationFn: heartRequest,
        onSuccess: (data) => {
            console.log(data);
        },
    });

    function onSubmit(values: z.infer<typeof heartPredictionSchema>) {
        // mutate(values);
        console.log(form.getValues());
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-h-screen">
                <div className={"flex flex-row w-full gap-8 mt-4 text"}>
                    <div className={"flex flex-col w-1/2 gap-4"}>
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="Age (19-91)" onChange={event => field.onChange(parseInt(event.target.value))}/>
                                    </FormControl>
                                    <FormDescription>
                                        Your age
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="systolicBloodPressure"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Systolic blood pressure</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="Systolic blood pressure (96-167)" onChange={event => field.onChange(parseInt(event.target.value))}/>
                                    </FormControl>
                                    <FormDescription>
                                        Your systolic blood pressure
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="diastolicBloodPressure"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diastolic blood pressure</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="Diastolic blood pressure (67-110)" onChange={event => field.onChange(parseInt(event.target.value))}/>
                                    </FormControl>
                                    <FormDescription>
                                        Your diastolic blood pressure
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={"flex flex-col w-1/2 gap-4"}>
                        <FormField
                            control={form.control}
                            name="ldlCholesterol"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LDL Cholesterol</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="LDL Cholesterol (67-110)" onChange={event => field.onChange(parseInt(event.target.value))}/>
                                    </FormControl>
                                    <FormDescription>
                                        Your LDL Cholesterol
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hdlCholesterol"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>HDL Cholesterol</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="HDL Cholesterol (18-90)" onChange={event => field.onChange(parseInt(event.target.value))}/>
                                    </FormControl>
                                    <FormDescription>
                                        Your HDL Cholesterol
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fastingGlucose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fasting blood glucose</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="Fasting blood glucose (57-130)" onChange={event => field.onChange(parseInt(event.target.value))}/>
                                    </FormControl>
                                    <FormDescription>
                                        Your fasting blood glucose
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className={"flex flex-row gap-96 "}>
                    <div className={"flex flex-col gap-4"}>
                        <FormField
                            control={form.control}
                            name="sex"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Chose your gender</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="0" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Woman
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="1" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Man</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="exerciseTolerance"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Chose your exercise tolerance</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="1" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Low tolerance
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="2" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Average tolerance</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="3" />
                                                </FormControl>
                                                <FormLabel className="font-normal">High tolerance</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <FormField
                            control={form.control}
                            name="heartPalpitations"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Heart palpitation</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="0" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    No
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="1" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Yes</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="chestPain"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Chose your level of pain in chest</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="0" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    No pain
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="1" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Yes</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <FormField
                            control={form.control}
                            name="shortnessOfBreath"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Chose if you experience shortness of breath</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="0" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    No shortness of breath
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="1" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Yes</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="heartDisease"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Chose if you had/have heart disease</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="0" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    No heart disease
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="1" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Yes</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" className={"h-10 w-[250px]"}>Submit</Button>
            </form>
        </Form>
    );
};

export default HeartPredictionForm;