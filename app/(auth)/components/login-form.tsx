"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AxiosError } from "axios";

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
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email({ message: "please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "password must contain 6 characters" })
    .max(16, { message: "password must be under 16 characters" }),
});

export function LogInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [showError, setShowError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setSending(true);
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });
      setSending(false);
      if (!response?.error) {
        router.push(callbackUrl);
      } else {
        setShowError("invalid email or password");
      }
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
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative select-none">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="enter your password"
                        {...field}
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-fit h-full absolute top-0 right-2 flex items-center"
                      >
                        {showPassword ? (
                          <EyeIcon className="text-primary h-5 w-5" />
                        ) : (
                          <EyeOff className="text-primary h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-primary hover:underline cursor-pointer w-fit"
            >{`forgot password`}</Link>
          </div>
        </div>
        <Button
          type="submit"
          className="text-white text-lg bg-primary hover:bg-primary w-full"
        >
          {sending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Login
        </Button>
      </form>
      {showError && <ErrorComponent message={showError} />}
    </Form>
  );
}
