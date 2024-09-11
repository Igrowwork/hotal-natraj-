"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios, { AxiosError } from "axios"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { EyeIcon, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import ErrorComponent from "./error-component"

const FormSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    phone: z.string().refine((value) => /^\d{10}$/.test(value), {
        message: "please enter a valid 10-digit phone number",
    }),
    email: z.string().email({ message: "please enter a valid email address" }),
    password: z.string().min(6, { message: "password must contain 6 characters" }).max(16, { message: "password must be under 16 characters" })
})

export function SignUpForm() {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [sending, setSending] = useState<boolean>(false)
    const [showError, setShowError] = useState<string>('')
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
        },
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            setSending(true);
            const response = await axios.post('/api/auth/signup', values);
            if(response?.data?.success){
                router.replace('/login??callbackUrl=/')                
            }
        } catch (error) {
            if(error instanceof AxiosError){
                const errorMsg = error.response?.data
                setShowError(errorMsg)
            }
        }
        setSending(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="flex flex-col gap-5 mb-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="enter your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="enter your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input placeholder="enter your email id" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <div className="relative select-none">
                                        <Input type={showPassword ? "text" : "password"} placeholder="enter your password" {...field} />
                                        <div onClick={() => setShowPassword(!showPassword)} className="w-fit h-full absolute top-0 right-2 flex items-center">
                                            {showPassword ? <EyeIcon className="text-primary h-5 w-5" /> : <EyeOff className="text-primary h-5 w-5" />}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="text-white text-lg bg-primary hover:bg-primary w-full hover:-top-[2px] hover:scale-[1.02] transition-all duration-300 ease-in relative top-0">
                    {sending && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
                    Signup
                </Button>
            </form>
            {
                showError && <ErrorComponent message={showError} />
            }
        </Form>
    )
}
