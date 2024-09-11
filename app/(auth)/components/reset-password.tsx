"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";

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
import { useState } from "react";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorComponent from "./error-component";
import { signIn } from "next-auth/react";
import { title } from "process";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "please enter a valid Password address" }),
  confirmPassword: z
    .string()
    .min(6, { message: "please enter a valid Password address" }),
});

export function ResetPasswordForm() {
  const { toast } = useToast();
  const [sending, setSending] = useState<boolean>(false);
  const [showError, setShowError] = useState<string>("");
  const router = useRouter();

  const searchParams = useSearchParams(); 
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      if (values.newPassword != values.confirmPassword) {
        toast({
          title: "Passwords do not match",
        });
        return; // prevent form submission if passwords do not match
      }

      setSending(true);
      const res = await axios.post("/api/reset-password/token", {
        newPassword: values.newPassword,
        token: token,
      });
      if (res.status == 200) {
        toast({
          title: "Password is updated",
        });
        router.push("/login");
      }

      if (res.status == 500) {
        toast({
          title: "Try agin",
        });
      }
      setSending(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data;
        setShowError(errorMsg);
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="enter your email id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="enter your email id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="text-white text-lg bg-primary hover:bg-primary w-full"
        >
          {sending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Submit
        </Button>
      </form>
      {showError && <ErrorComponent message={showError} />}
    </Form>
  );
}
