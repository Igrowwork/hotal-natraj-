"use client";
import * as z from "zod";
import { Category } from "@prisma/client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
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
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1),
  price: z.string(),
  features: z.array(z.string()).nonempty("At least one feature is required"),
  images: z.array(z.string()).nonempty("At least one image URL is required"),
  description: z.string(),
  status: z.boolean(),
});

type ColorsFormValues = z.infer<typeof formSchema>;

interface ColorsFormProps {
  intialData: Category | null;
}

export const CategoryForm: React.FC<ColorsFormProps> = ({ intialData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const title = intialData ? "Edit Category" : "Create a Category";
  const description = intialData
    ? "You can edit Category details"
    : "You can create a category here";

  const form = useForm<ColorsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: intialData?.name || "",
      price: String(intialData?.price || "0"),
      features: intialData?.features || ["Default Feature"],
      images: intialData?.images || ["https://example.com/default-image.jpg"],
      description: intialData?.description || "",
      status: intialData?.status || true,
    },
  });

  const { control, handleSubmit } = form;
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

  const onUpdate = async (data: ColorsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/category/${intialData?.id}`, {
        name: data.name,
        price: Number(data.price),
        features: data.features,
        images: data.images,
        description: data.description,
        status: data.status,
      });
      router.refresh();
      router.push("/admin/yourrooms");
      toast({
        title: "Updated Successfully",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error updating category",
        variant: "destructive"
    })
    } finally {
      setLoading(false);
    }
  };

  interface ErrorResponse {
    response: AxiosResponse;
  }

  const isErrorResponse = (error: any): error is ErrorResponse => {
    return error.response !== undefined;
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
            <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
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
                          className="mt-2 text-white my-2"
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
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
