"use client";
import * as z from "zod";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(1),
  price: z.string(),
  features: z.array(z.string()).nonempty("At least one feature is required"),
  images: z.array(z.string()).nonempty("At least one image URL is required"),
  description: z.string(),
  status: z.boolean(),
});

type ColorsFormCreateValues = z.infer<typeof formSchema>;

export const CategoryFormCreate = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const title = "Create a Category";
  const description = "You can create a category here";

  const { toast } = useToast();

  const form = useForm<ColorsFormCreateValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      features: [
        "Doctor on call",
        "Laundry",
        "24*7 room service",
        "Pet friendly ",
        "Pick up and drop",
        "Food facilities",
        "Seth Saawariya ji ",
        "The multi cuisine pure veg restaurant",
      ],
      images: [
        "data:image/jpeg;base64,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",
      ],
      status: true,
    },
  });

  const { control, handleSubmit, watch } = form;

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "features",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "images",
  });

  interface ErrorResponse {
    response: AxiosResponse;
  }

  const isErrorResponse = (error: any): error is ErrorResponse => {
    return error.response !== undefined;
  };

  const onCreate = async (data: ColorsFormCreateValues) => {
    try {
      setLoading(true);
      const response: AxiosResponse = await axios.post(`/api/category`, {
        name: data.name,
        price: Number(data.price),
        description: data.description,
        features: data.features,
        images: data.images,
        status: data.status,
      });
      router.refresh();
      router.push("/admin/yourrooms");
      alert(`Created Successfully. ${response.status}`);
      toast({
        title: "Error updating category",
        variant: "destructive",
      });
    } catch (error) {
      if (isErrorResponse(error)) {
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onCreate)} className="space-y-6">
              <FormField
                name="name"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="price"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
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
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Features</h3>
                  <Button
                    type="button"
                    className="text-white"
                    onClick={() => appendFeature("")}
                    disabled={loading}
                  >
                    Add
                  </Button>
                </div>

                {featureFields.map((item, index) => (
                  <FormField
                    key={item.id}
                    name={`features.${index}`}
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder={`Feature ${index + 1}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          type="button"
                          onClick={() => removeFeature(index)}
                          disabled={loading}
                          className="mt-2 text-white"
                        >
                          Remove Feature
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Images</h3>
                  <Button
                    type="button"
                    className="text-white"
                    onClick={() => appendImage("")}
                    disabled={loading}
                  >
                    Add
                  </Button>
                </div>

                {imageFields.map((item, index) => (
                  <FormField
                    key={item.id}
                    name={`images.${index}`}
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder={`Image URL ${index + 1}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          disabled={loading}
                          className="mt-2 text-white"
                        >
                          Remove Image
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormField
                name="status"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={loading}
                        />
                        <label className="ml-2">Active</label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={loading}
                className="ml-auto text-white"
                type="submit"
              >
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
