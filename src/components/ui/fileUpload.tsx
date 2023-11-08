import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "@/context/auth-context.ts";
import {toast} from "react-toastify";
import {useMutation} from "react-query";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";

interface FileUpload {
    data: {
        probability: string;
        recognition_class: string;
    }[]
}

const FileUpload = () => {
    const auth = useContext(AuthContext);
    const MAX_IMAGE_SIZE = 1048576; // 1 MB
    const ALLOWED_IMAGE_TYPES = [
        "image/jpeg", "image/png", "image/webp", "image/jpg",
    ];
    const formSchema = z.object({
        images: z
            .custom<FileList>((val) => val instanceof FileList, "Required")
            .refine((files) => files.length > 0, `Required`)
            .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
            .refine(
                (files) =>
                    Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
                `Each file size should be less than 1 MB.`
            )
            .refine(
                (files) =>
                    Array.from(files).every((file) =>
                        ALLOWED_IMAGE_TYPES.includes(file.type)
                    ),
                "Only these types are allowed .jpg, .jpeg, .png and .webp"
            ),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const chestRecognition = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        for (let i = 0; i < values.images.length; i++) {
            formData.append('images', values.images[i]);
        }
        return await toast.promise(axios.post('http://localhost:8080/api/image/chest',
            formData,{
            headers: {
                Authorization: `Bearer ${auth.token}`,
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        }),{
            pending: 'Analyzing chest...',
            success: 'Chest analyzed successfully ! 😁',
            error: 'Something went wrong ! 😒',
        });
    };
    const {mutate, data,isLoading} = useMutation({
        mutationFn: chestRecognition,
        onSuccess: (data) => {
            console.log(data);
        }
    }) as {mutate: (values: z.infer<typeof formSchema>) => void, data: FileUpload, isLoading: boolean};
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        mutate(values);
    };

    return (
        <section className="flex flex-col gap-5 xl:gap-6">
            {data ?
            <Dialog>
                <DialogTrigger className={"w-[200px]"}>
                    <Button variant={"outline"} className={"w-[200px]"}>Show results</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Your results</DialogTitle>
                    <DialogDescription>
                        {isLoading ? <Loader2 className={"w-20 h-20 animate-spin mx-auto text-black"}/> :
                            data.data.map((item,index) => {
                                return(
                                    <div key={index} className={"flex flex-col w-full items-center justify-center mb-2"}>
                                        <div className={"flex flex-col text-xl"}>
                                            <p>Photo number: {index + 1}</p>
                                            <p>Probability of prediction: {item.probability}%</p>
                                            <p>Recognized: <span className={"font-bold"}>{item.recognition_class.toUpperCase()}</span></p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </DialogDescription>
                </DialogContent>
            </Dialog> : null}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 xl:gap-5"
                >
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field: { onChange }, ...field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    {/* File Upload */}
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            multiple={true}
                                            disabled={form.formState.isSubmitting}
                                            {...field}
                                            onChange={(event) => {
                                                const dataTransfer = new DataTransfer();
                                                Array.from(event.target.files!).forEach((image) =>
                                                    dataTransfer.items.add(image)
                                                );
                                                const newFiles = dataTransfer.files;
                                                onChange(newFiles);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <Button
                            variant="default"
                            className="flex w-full flex-row items-center gap-2"
                            size="lg"
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                            Send images
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
};

export default FileUpload;