"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import DraggableElement from '@/components/FormBuilder/DraggableElement';
import DroppableArea from '@/components/FormBuilder/DroppableArea';
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

const FormBuilder: React.FC = () => {
    const [elements, setElements] = useState<
            { id: string; type: string; label?: string; validation?: Record<string, any> }[]
    >([]);
    const [formName, setFormName] = useState<string>("");
    const queryClient = useQueryClient();

    const saveTemplate = useMutation<void, Error, void>({
        mutationFn: async () => {
            const response = await fetch("/api/templates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: formName, elements }),
            });
            if (!response.ok) {
                throw new Error("Failed to save template");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["templates"] });
        },
    });

    const handleSaveTemplate = () => {
        saveTemplate.mutate();
    };

    const addElement = (type: string) => {
        setElements([
            ...elements,
            {
                id: `${type}-${Date.now()}`,
                type,
                label: `${type.charAt(0).toUpperCase() + type.slice(1)} Label`,
                validation: { required: false, maxLength: null },
            },
        ]);
    };

    const updateElement = (id: string, field: string, value: any) => {
        setElements(
                elements.map((el) =>
                        el.id === id ? { ...el, [field]: value } : el
                )
        );
    };

    return (
            <div className="form-builder">
                <h1 className="text-xl font-bold">Form Builder</h1>
                <Input
                        className="mb-4"
                        placeholder="Form Name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                />
                <div className="flex gap-4 mb-4">
                    <DraggableElement type="text" label="Text Input" />
                    <DraggableElement type="select" label="Dropdown" />
                    <DraggableElement type="checkbox" label="Checkbox" />
                    <DraggableElement type="radio" label="Radio Button" />
                    <DraggableElement type="textarea" label="Text Area" />
                </div>
                <DroppableArea onDrop={(item) => addElement(item.type)}>
                    {elements.map((element) => (
                            <div key={element.id} className="element-config mb-4">
                                <label>
                                    <Input
                                            className="mb-2"
                                            placeholder="Label"
                                            value={element.label || ""}
                                            onChange={(e) =>
                                                    updateElement(element.id, "label", e.target.value)
                                            }
                                    />
                                </label>
                                {element.type === "text" && <Input />}
                                {element.type === "select" && (
                                        <Select>
                                            <SelectTrigger>Select an option</SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="option1">Option 1</SelectItem>
                                                <SelectItem value="option2">Option 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                )}
                                {element.type === "checkbox" && <Checkbox />}
                                {element.type === "radio" && (
                                        <RadioGroup>
                                            <RadioGroupItem value="option1">Option 1</RadioGroupItem>
                                            <RadioGroupItem value="option2">Option 2</RadioGroupItem>
                                        </RadioGroup>
                                )}
                                {element.type === "textarea" && <Textarea />}
                                {/* Validation Options */}
                                <div className="validation-config mt-2">
                                    <label>
                                        <input
                                                type="checkbox"
                                                checked={element.validation?.required || false}
                                                onChange={(e) =>
                                                        updateElement(element.id, "validation", {
                                                            ...element.validation,
                                                            required: e.target.checked,
                                                        })
                                                }
                                        />
                                        Required
                                    </label>
                                    <Input
                                            placeholder="Max Length"
                                            type="number"
                                            value={element.validation?.maxLength || ""}
                                            onChange={(e) =>
                                                    updateElement(element.id, "validation", {
                                                        ...element.validation,
                                                        maxLength: e.target.value,
                                                    })
                                            }
                                            className="ml-2"
                                    />
                                </div>
                            </div>
                    ))}
                </DroppableArea>
                <h2 className="text-lg font-bold mt-6">Preview</h2>
                <div className="form-preview">
                    {elements.map((element) => (
                            <div key={element.id} className="mb-4">
                                <label>{element.label}</label>
                                {element.type === "text" && <Input />}
                                {element.type === "select" && (
                                        <Select>
                                            <SelectTrigger>Select an option</SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="option1">Option 1</SelectItem>
                                                <SelectItem value="option2">Option 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                )}
                                {element.type === "checkbox" && <Checkbox />}
                                {element.type === "radio" && (
                                        <RadioGroup>
                                            <RadioGroupItem value="option1">Option 1</RadioGroupItem>
                                            <RadioGroupItem value="option2">Option 2</RadioGroupItem>
                                        </RadioGroup>
                                )}
                                {element.type === "textarea" && <Textarea />}
                            </div>
                    ))}
                </div>
                <Button className="mt-4" onClick={handleSaveTemplate}>
                    Save Template
                </Button>
            </div>
    );
};

export default FormBuilder;
