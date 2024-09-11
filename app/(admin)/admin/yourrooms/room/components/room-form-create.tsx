"use client";
import * as z from "zod";
import { Category } from "@prisma/client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface RoomFormCreateProps {
  categories: Category[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
  image: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  rating: z.string().min(0).max(5).optional(),
});

type RoomFormCreateValues = z.infer<typeof formSchema>;

export const RoomFormCreate: React.FC<RoomFormCreateProps> = ({
  categories,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const title = "Create a Room";
  const description = "Choose a category to add your room with.";

  const form = useForm<RoomFormCreateValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
      image: "",
      description: "",
      features: [],
      rating: '0',
    },
  });

  const { fields, append, remove } = useFieldArray({
    // @ts-ignore
    name: "features",
    control: form.control,
  });

  interface ErrorResponse {
    response: AxiosResponse;
  }

  const isErrorResponse = (error: any): error is ErrorResponse => {
    return error.response !== undefined;
  };

  const onCreate = async (data:RoomFormCreateValues) => {
    try {
      setLoading(true);
      const response: AxiosResponse = await axios.post(`/api/room`, data);
      router.refresh();
      router.push("/admin/yourrooms");
      toast({
        title: "Success",
        description: "Room created successfully",
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
          title: "Oops!",
          description: "An error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="min-w-[10rem]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onCreate)}
              className="space-y-8 w-full"
            >
              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="image"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Image URL"
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
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
                name="rating"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Rating"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {fields.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2"
                          >
                            <Input
                              disabled={loading}
                              placeholder={`Feature ${index + 1}`}
                              {...form.register(`features.${index}`)}
                            />
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              variant="destructive"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => append("")}
                          disabled={loading}
                          className="text-white"
                        >
                          Add Feature
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-5">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Make this room featured on home page
                      </FormLabel>
                      <FormDescription>
                        Only 3 rooms can be featured. If you already have 3
                        featured rooms, then do not feature this.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button disabled={loading} className="ml-auto text-white" type="submit">
                Create Room
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
