"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Phone, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { radley } from "@/app/fonts";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, { message: "Email must be at least 2 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  message: z.string(),
});

export function ContactForm() {
  const [isloading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://formserver-three.vercel.app/vishnudentalclinic",
        data
      );
      toast({
        title: response.data.message,
      });
      setIsLoading(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col gap-4 sm:gap-6 font-medium text-black p-4 lg:p-6 rounded shadow-[0_4px_60px_0_rgba(0,0,0,0.08)]"
      >
        <h2
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl text-primary text-center",
            radley.className
          )}
        >
          Contact Hotel Natraj
        </h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Name*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Name"
                  {...field}
                  className="h-12"
                />
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
              <FormLabel className="text-sm font-medium">Email*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Email I'd"
                  {...field}
                  className="h-12"
                />
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
              <FormLabel className="text-sm font-medium">Phone*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Phone number"
                  {...field}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Message*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Message and Queries"
                  {...field}
                  className=""
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <Button
            type="submit"
            disabled={isloading}
            className="bg-primary hover:bg-primary px-8 py-4 w-full text-white "
          >
            {isloading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
