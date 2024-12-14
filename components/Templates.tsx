"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Template = {
  id: string;
  components: {
    id: string;
    componentId: string;
    value: string;
  }[];
}

export const componentsList = [
  {
    id: "text-input",
    label: "Text Input",
    component: (value: string) => <Input type="text" placeholder="Enter Text" value={value} onChange={() => { }} />,
  },
  {
    id: "select-dropdown",
    label: "Select Dropdown",
    component: (value: string) => (
      <Select value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select an option</SelectLabel>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
  },
  {
    id: "checkbox",
    label: "Checkbox",
    component: (value: string) => (
       <div className="flex items-center space-x-2">
        <p
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Radio buttom value: {value ? "selected" : "no selected"}
        </p>
      </div>
    ),
  },
  {
    id: "radio-button",
    label: "Radio Button",
    component: (value: string) => (
      <div className="flex items-center space-x-2">
        <p
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Radio buttom value: {value}
        </p>
      </div>
    ),
  },
  {
    id: "textarea",
    label: "Textarea",
    component: (value: string) => <Textarea placeholder="Enter text here..." value={value} onChange={() => { }} />,
  },
];


function Templates() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const response = await axios.get("/api/templates");
      return response.data;
    },
  });

  if (isLoading) return <p>Loading templates...</p>;
  if (isError) return <p>Error fetching templates: {error.message}</p>;

  const renderComponent = (id: string, value: string) => {
    const foundComponent = componentsList.find((component) => component.id === id);
    if (!foundComponent) return null;
    return (
      <div>
        <div className="border p-2 mb-2">
          {foundComponent.component(value)}
        </div>

      </div>

    );
  };

  return (
    <div className="p-4 border-l">
      <h2 className="text-lg font-bold mb-4">Templates List</h2>
      {data.length === 0 ? (
        <p>No templates available. Create a new one!</p>
      ) : (
        <ul className="space-y-2">
          {data.map((template: Template) => (
            <div key={template.id}>
              <h2>Template id {template.id}</h2>
              {template.components.map((item: {
                id: string;
                componentId: string;
                value: string;
              }, index: number) => (
                <div key={index}>{renderComponent(item.id, item.value)}</div>
              ))}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Templates;
