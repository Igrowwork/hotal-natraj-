"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name can not be empty" }),
    lastName: z.string(),
    email: z.string().min(1, { message: "Email address can not be empty" }),
    phone: z.string().min(10, { message: "Phone no contains atleast 10 digits" }).max(10, { message: "Phone no must contain 10 digits" }),
    plan: z.string(),
    checkIn: z.date(),
    checkOut: z.date(),
    checkbox: z.boolean().default(false).optional(),
})

export default function BookingForm() {
    const [Submited, setSubmited] = useState<boolean>(false)
    const [Sending, setSendig] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            plan: "",
            checkbox: false,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSendig(true)
        form.reset()
        setSendig(false)
        setSubmited(true)
    }

    if (Submited) {
        return (
            <div className="space-y-8 w-full bg-white py-10 px-5 border rounded-lg shadow-xl h-full">
                <p className="text-xl font-semibold text-center flex flex-col justify-between items-center gap-6">
                    <span>Form submitted successfully 👍👍</span>
                    Thanks for your interest 🎉🎉
                </p>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="flex flex-col gap-5 w-full">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="first name" {...field} className="border-none bg-[#F7F7F7] p-3 text-lg font-light" />
                                </FormControl>
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
                                    <Input placeholder="last name" {...field} className="border-none bg-[#F7F7F7] p-3 text-lg font-light" />
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
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="email id" {...field} className="border-none bg-[#F7F7F7] p-3 text-lg font-light" />
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="phone no" {...field} className="border-none bg-[#F7F7F7] p-3 text-lg font-light" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2">
                    <div className="p-4">
                        <FormField
                            control={form.control}
                            name="checkbox"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm font-normal">
                                            I have read all <a href="#" className="text-primary underline">terms & conditions</a> and <a href="#" className="text-primary underline">privacy policy.</a>
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full flex items-end justify-end">
                        <button className="w-fit h-fit text-white px-10 py-3 bg-blue-800 rounded-lg">Book Now</button>
                    </div>
                </div>
            </form>
        </Form>
    )
}