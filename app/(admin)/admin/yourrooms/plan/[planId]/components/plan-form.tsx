"use client";
import * as z from "zod";
import { Plan } from "@prisma/client";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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

interface ColorsFormProps {
  intialData: Plan | null;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  description: z.string().optional(),
  duration: z.string().min(1, "Duration must be at least 1 day"),
  features: z.array(z.string()).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

type ColorsFormValues = z.infer<typeof formSchema>;

export const PlanForm: React.FC<ColorsFormProps> = ({ intialData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const title = intialData ? "Edit Plan" : "Create a Plan";
  const description = intialData
    ? "You can edit Plan details"
    : "You can can create Plan here";

  const form = useForm<ColorsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: intialData?.name ?? "",
      price: String(intialData?.price) ?? "",
      description: intialData?.description ?? "",
      duration: String(intialData?.duration) ?? "0",
      features: intialData?.features,
      status: intialData?.status ?? "ACTIVE",
    } || {
      name: "",
      price: "0",
      description: "",
      features: ["please add features"],
      status: "ACTIVE",
    },
  });

  const onUpdate = async (data: ColorsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/plan/${intialData?.id}`, {
        ...data,
        price: Number(data.price),
        duration: Number(data.duration),
      });
      router.refresh();
      router.push("/admin/yourrooms");
      toast({
        title: `Room`,
        description: "Updated Successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  interface ErrorResponse {
    response: AxiosResponse;
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "features",
  });

  const isErrorResponse = (error: any): error is ErrorResponse => {
    return error.response !== undefined;
  };

  return (
    <div className="flex justify-center items-center w-full">
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
              onSubmit={form.handleSubmit(onUpdate)}
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
                <div className="flex w-full justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Features
                  </label>
                  <Button
                    type="button"
                    onClick={() => append("")}
                    className="text-white"
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
                {loading ? "Update..." : "Update Plan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
