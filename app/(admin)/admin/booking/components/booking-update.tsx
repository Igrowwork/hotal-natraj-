"use client"
import * as z from "zod"
import { BookingRoom, Plan, Room } from '@prisma/client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button, buttonVariants } from "@/components/ui/button"
import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { compareAsc, format, isBefore, subDays } from "date-fns"
import { Loader } from "lucide-react"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
interface UpdateBookingFormProps {
    userId: string;
    startDate: any;
    endDate: any;
    username: any;
    userphone: any;
    useremail: any;
    totalPrice: any;
    plans: Plan[];
    selectedPlan: any;
    rooms: Room[];
    bookedrooms: BookingRoom[] | undefined;
    bookId: any;
    status: any;
}
const formSchema = z.object({
    bookedrooms: z.array(z.object({
        id: z.string(),
        bookingid: z.string(),
        roomId: z.string(),
    })),
    userId: z.string(),
    startDate: z.date({
        required_error: "Start date is required.",
    }),
    endDate: z.date({
        required_error: "End Date is required.",
    }),
    totalPrice: z.string(),
    selectedPlan: z.string(),
    username: z.string(),
    useremail: z.string(),
    userphone: z.string().refine((value) => /^\d{10}$/.test(value), {
        message: "please enter a valid 10-digit phone number",
    }),
    status: z.enum(["Booked", "Cancelled", "Completed"], {
        required_error: "You need to select a status type.",
    }),
})
type UpdateBookingFormValues = z.infer<typeof formSchema>
export const UpdateBookingForm: React.FC<UpdateBookingFormProps> = ({ userId, endDate, startDate, useremail, username, userphone, totalPrice, selectedPlan, bookedrooms, bookId, status }) => {
    const [loading, setLoading] = useState(false)
    const [totalRent, setTotalRent] = useState(totalPrice)
    const { toast } = useToast()
    const router = useRouter();
    const title = "Update the Booking"
    const description = "Fill out all the details to update this perticular booking."
    const form = useForm<UpdateBookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bookedrooms: bookedrooms,
            selectedPlan,
            userId: userId,
            endDate: new Date(endDate),
            startDate: new Date(startDate),
            useremail,
            username,
            userphone,
            totalPrice: totalPrice.toString(),
            status: status
        }
    })
    interface ErrorResponse {
        response: AxiosResponse;
    }

    const isErrorResponse = (error: any): error is ErrorResponse => {
        return error.response !== undefined;
    };
    const onUpdate = async (data: UpdateBookingFormValues) => {
        const startDate = data.startDate;
        const endDate = data.endDate;

        // Compare start date and end date
        const comparisonResult = compareAsc(startDate, endDate);
        if (comparisonResult === 1) {
            // Start date is greater than end date
            toast({
                title: "Invalid Date Range",
                description: "Start date should be before end date.",
                variant: "destructive"
            })
            return;
        }
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        try {
            setLoading(true);
            const response: AxiosResponse = await axios.patch(`/api/book/${bookId}`, { userId: data.userId, rooms: data.bookedrooms, startDate: formattedStartDate, endDate: formattedEndDate, totalPrice: data.totalPrice, selectedPlan: data.selectedPlan, username: data.username, useremail: data.useremail, userphone: data.userphone, status: data.status });
            router.refresh();
            router.push('/admin')
            toast({
                title: String(response.status),
                description: "Updated Successfully"
            })
        } catch (error) {
            if (isErrorResponse(error)) {
                toast({
                    title: "Error",
                    description: JSON.stringify(error.response.data),
                    variant: "destructive"
                })
            } else {
                toast({
                    title: "Oops!",
                    description: "An error occurred.",
                    variant: "destructive"
                })
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex justify-center items-center w-full h-[80vh]">
            <Card className="min-w-[10rem]">
                <CardHeader>
                    <CardTitle>
                        {title}
                    </CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 w-full">
                                <div className="flex flex-wrap gap-10">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{`Enter Guest's Name`}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="useremail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{`Enter Guest's Email`}</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Enter email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="userphone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{`Enter Guest's Phone Number`}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="gap-2 flex flex-col">
                                        <p>Totoal Rent</p>
                                        <p className={buttonVariants({ variant: "outline" })}>{totalRent}</p>
                                    </div>
                                    {
                                        status !== "Booked" ?
                                            <div className="gap-2 flex flex-col">
                                                <p>Booking Status</p>
                                                <p className={buttonVariants({ variant: "outline" })}>{status}</p>
                                            </div>

                                            :
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3">
                                                        <FormLabel>Booking Status</FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="flex flex-col space-y-1"
                                                            >
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="Booked" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Book
                                                                    </FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="Cancelled" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Cancel
                                                                    </FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="Completed" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">Complete</FormLabel>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                    }
                                </div>
                                <Button disabled={loading} className="ml-auto text-white" type="submit" onClick={()=>onUpdate(form.getValues())}>
                                    {
                                        loading && <Loader className="w-4 h-4 mr-2 animate-spin" />
                                    }
                                    Update Booking
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}