"use client";
import * as z from "zod";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form validation schema using Zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string(),
  description: z.string().optional(),
  duration: z
    .string()
    .min(1, "Duration must be at least 1 month")
    .max(12, "Duration can't exceed 12 months"),
  features: z.array(z.string()),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

type PlanFormCreateValues = z.infer<typeof formSchema>;

export const PlanFormCreate = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const title = "Create a Plan";
  const description = "Fill in the details below to create a new plan.";

  // Initialize form using React Hook Form with Zod resolver for validation
  const form = useForm<PlanFormCreateValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: "1",
      features: [],
      status: "ACTIVE",
    },
  });

  // Using useFieldArray for dynamic features
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "features",
  });

  interface ErrorResponse {
    response: AxiosResponse;
  }

  const isErrorResponse = (error: any): error is ErrorResponse => {
    return error.response !== undefined;
  };

  // Handle form submission
  const onCreate = async (data: PlanFormCreateValues) => {
    try {
      setLoading(true);
      const response: AxiosResponse = await axios.post(`/api/plan`, {
        name: data.name,
        price: Number(data.price),
        description: data.description,
        duration: Number(data.duration),
        features: data.features,
        status: data.status,
      });
      router.refresh();
      router.push("/admin/yourrooms");
      toast({
        title: `Success!`,
        description: "Plan created successfully.",
      });
    } catch (error) {
      if (isErrorResponse(error)) {
        toast({
          title: "Error",
          description: JSON.stringify(error.response.data),
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
      <Card className="w-full max-w-md mx-4 md:mx-0 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onCreate)}
              className="space-y-6 w-full"
            >
              {/* Form Fields */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Plan Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Enter Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="duration"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={loading}
                        placeholder="Duration (days)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Dynamic Features Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700 w-[80%]">
                    Features
                  </label>
                  <Button
                    type="button"
                    className="text-white"
                    onClick={() => append("")}
                  >
                    Add
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm mb-4"
                  >
                    <FormField
                      name={`features.${index}`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Feature"
                              {...field}
                              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="destructive"
                      className="text-white hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button
                disabled={loading}
                className="w-full text-white"
                type="submit"
              >
                {loading ? "Creating..." : "Create Plan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
