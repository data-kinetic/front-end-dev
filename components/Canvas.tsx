import { useDroppable } from "@dnd-kit/core";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CanvasProps {
  droppedComponents: Array<{
    id: string;
    componentId: string;
    value: string;
  }>;
  setDroppedComponents: React.Dispatch<
    React.SetStateAction<
      Array<{ id: string; componentId: string; value: string; }>
    >
  >;
}
interface ComponentItem {
  id: string;
  componentId: string;
  value: string;
}

interface NewTemplate {
  components: ComponentItem[];
}

export const Canvas = ({ droppedComponents, setDroppedComponents }: CanvasProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas-drop-zone" });
  const queryClient = useQueryClient();

  // Dynamically build the validation scheme based on droppedComponents
  const formSchema = useMemo(() => {
    const schema: Record<string, any> = {};

    droppedComponents.forEach((component) => {
      switch (component.id) {
        case "text-input":
          schema["text-input"] = z
            .string()
            .nonempty({ message: "This field is required." })
            .min(2, { message: "Text must be at least 2 characters." });
          break;
        case "select-dropdown":
          schema["select-dropdown"] = z
            .string()
            .nonempty({ message: "Please select an option." });
          break;
        case "checkbox":
          schema.checkbox = z
            .boolean()
            .refine((val) => val === true, { message: "Please check this box." });
          break;
        case "radio-button":
          schema["radio-button"] = z
            .string()
            .nonempty({ message: "Please select a notification preference." });
          break;
        case "textarea":
          schema.textarea = z
            .string()
            .nonempty({ message: "This field is required." });
          break;
        default:
          break;
      }
    });

    return z.object(schema);
  }, [droppedComponents]);

  // Configure the form with the dynamic schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: droppedComponents.reduce((defaults, component) => {
      defaults[component.id] = component.value || "";
      return defaults;
    }, {} as Record<string, any>),
  });

  // Create mutation for new template
  const mutation = useMutation({
    mutationFn: async (newTemplate: NewTemplate) => {
      await axios.post("/api/templates", newTemplate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["templates"], { exact: true });
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("droppedComponents", droppedComponents);
    const components = droppedComponents.map(item => {
      item.value = values[item.id]
      return item
    })

    await mutation.mutate({
      components
    })

    setDroppedComponents([]);
    form.reset(); // reset form
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 bg-white p-4 border ${isOver ? "bg-blue-200" : "bg-white"}`}
    >
      <h2 className="text-lg font-bold mb-4">Form Elements</h2>

      {droppedComponents.length > 0 && (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {droppedComponents.map((item) => (
                <React.Fragment key={item.componentId}>
                  {item.id === "text-input" && (
                    <FormField
                      control={form.control}
                      name="text-input"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter text</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {item.id === "select-dropdown" && (
                    <FormField
                      control={form.control}
                      name="select-dropdown"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Option</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">Option 1</SelectItem>
                              <SelectItem value="2">Option 2</SelectItem>
                              <SelectItem value="3">Option 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {item.id === "checkbox" && (
                    <FormField
                      control={form.control}
                      name="checkbox"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Select checkbox sample</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}

                  {item.id === "radio-button" && (
                    <FormField
                      control={form.control}
                      name="radio-button"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Notify me about...</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <RadioGroupItem value="all" />
                                </FormControl>
                                <FormLabel className="font-normal">All new messages</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <RadioGroupItem value="mentions" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Direct messages and mentions
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <RadioGroupItem value="none" />
                                </FormControl>
                                <FormLabel className="font-normal">Nothing</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {item.id === "textarea" && (
                    <FormField
                      control={form.control}
                      name="textarea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little bit about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};
