"use client"
import * as z from "zod"
import { Category, Plan, Room } from '@prisma/client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button, buttonVariants } from "@/components/ui/button"
import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { compareAsc, format, isBefore, subDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface BookingFormProps {
    rooms: Room[];
    userId: string;
    startDate: string;
    endDate: string;
    plans: Plan[];
    categories: Category[],
    defaultCategory: string;
}
const formSchema = z.object({
    roomId: z.string().array(),
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
    categoryId: z.string(),
    adults: z.string(),
    childrens: z.string(),
})
type BookingFormValues = z.infer<typeof formSchema>
export const BookingForm: React.FC<BookingFormProps> = ({ rooms, userId, endDate, startDate, plans, categories, defaultCategory }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const title = "Book a Room"
    const description = "Fill out all the details to book your room offline."
    const { toast } = useToast()

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roomId: [],
            selectedPlan: "",
            userId: userId,
            endDate: new Date(endDate),
            startDate: new Date(startDate),
            categoryId: defaultCategory,
            adults: "1",
            childrens: "0",
        }
    })
    interface ErrorResponse {
        response: AxiosResponse;
    }

    const isErrorResponse = (error: any): error is ErrorResponse => {
        return error.response !== undefined;
    };
    const onFilter = () => {
        const formData = form.getValues();

        const startDate = formData.startDate;
        const endDate = formData.endDate;

        // Compare start date and end date
        const comparisonResult = compareAsc(startDate, endDate);

        if (comparisonResult === 1) {
            // Start date is greater than end date, show alert
            toast({
                title: "Invalid date range. Start date should be before end date.",
                variant: "destructive"
            })
            return;
        }

        // Valid date range, proceed with the routing
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        router.push(`/admin/offlinebooking?categoryId=${formData.categoryId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
    }
    const onCreate = async (data: BookingFormValues) => {
        const startDate = data.startDate;
        const endDate = data.endDate;

        // Compare start date and end date
        const comparisonResult = compareAsc(startDate, endDate);
        if (comparisonResult === 1) {
            // Start date is greater than end date, show alert
            toast({
                title: "Invalid date range. Start date should be before end date.",
                variant: "destructive"
            })
            return;
        }
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');

        try {
            setLoading(true);
            const response: AxiosResponse = await axios.post(`/api/book`, { userId: data.userId, roomIds: data.roomId, startDate: formattedStartDate, endDate: formattedEndDate, totalPrice: data.totalPrice, selectedPlan: data.selectedPlan, username: data.username, useremail: data.useremail, userphone: data.userphone, childrens : Number(data.childrens), adults: Number(data.adults)});
            router.refresh();
            router.push('/admin')
            alert(`Created Successfully. ${response.status}`);
        } catch (error) {
            if (isErrorResponse(error)) {
                alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                alert('An error occurred.');
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
                            <form onSubmit={form.handleSubmit(onCreate)} className="space-y-8 w-full">
                                <div className="flex gap-10 items-center flex-col">
                                    <div className="flex flex-wrap gap-10 items-center justify-around w-full">
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Check in Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[240px] pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    isBefore(date, subDays(new Date(), 1)) || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Checkout Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[240px] pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    isBefore(date, subDays(new Date(), 1)) || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="categoryId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a category" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {
                                                                categories.map((category) => (
                                                                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className={cn(buttonVariants(), "cursor-pointer select-none text-white")} onClick={onFilter}>Filter</div>
                                    </div>
                                    <div className="flex flex-wrap gap-10 items-center">
                                        <br />
                                        {rooms.length !== 0 &&
                                            <>
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
                                                <FormField
                                                    control={form.control}
                                                    name="adults"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{`Enter Number of Adults`}</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter number" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="childrens"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{`Enter Number of Children`}</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter number" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="totalPrice"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Enter Total Rent</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter Rent" {...field} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This rent includes GST.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    name="selectedPlan"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Select a Plan</FormLabel>
                                                            <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            defaultValue={field.value}
                                                                            placeholder="Select a plan"
                                                                        />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {plans.map((plan) => (
                                                                        <SelectItem key={plan.id} value={plan.name}>
                                                                            {plan.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>)}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="roomId"
                                                    render={() => (
                                                        <FormItem>
                                                            <div className="mb-4">
                                                                <FormLabel className="text-base">Select Rooms</FormLabel>
                                                                <FormDescription>
                                                                    you can select multiple rooms at once
                                                                </FormDescription>
                                                            </div>
                                                            {rooms.map((item: Room) => (
                                                                <FormField
                                                                    key={item.id}
                                                                    control={form.control}
                                                                    name="roomId"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem
                                                                                key={item.id}
                                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                                            >
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={field.value?.includes(item.id)}
                                                                                        onCheckedChange={(checked) => {
                                                                                            return checked
                                                                                                ? field.onChange([...field.value, item.id])
                                                                                                : field.onChange(
                                                                                                    field.value?.filter(
                                                                                                        (value) => value !== item.id
                                                                                                    )
                                                                                                )
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    {item.name}
                                                                                </FormLabel>
                                                                            </FormItem>
                                                                        )
                                                                    }}
                                                                />
                                                            ))}
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                        }
                                    </div>
                                </div>
                                {
                                    rooms &&
                                    <Button disabled={loading} className="ml-auto text-white" type="submit">Book Now</Button>
                                }
                            </form>
                        </Form>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}