"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import DraggableElement from './DraggableElement';
import DroppableArea from './DroppableArea';

const FormBuilder: React.FC = () => {
    const [elements, setElements] = useState<string[]>([]);

    const addElement = (type: string) => {
        setElements([...elements, type]);
    };

    return (
            <div>
                <h1>Form Builder</h1>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <DraggableElement type="text"><Button>Add Text Input</Button></DraggableElement>
                    <DraggableElement type="select"><Button>Add Select Dropdown</Button></DraggableElement>
                    <DraggableElement type="checkbox"><Button>Add Checkbox</Button></DraggableElement>
                    <DraggableElement type="radio"><Button>Add Radio Button</Button></DraggableElement>
                    <DraggableElement type="textarea"><Button>Add Text Area</Button></DraggableElement>
                </div>
                <DroppableArea onDrop={addElement}>
                    {elements.map((element, index) => {
                        switch (element) {
                            case 'text':
                                return <Input key={index} />;
                            case 'select':
                                return (
                                        <Select key={index}>
                                            <SelectTrigger>Select an option</SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="option1">Option 1</SelectItem>
                                                <SelectItem value="option2">Option 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                );
                            case 'checkbox':
                                return <Checkbox key={index} />;
                            case 'radio':
                                return (
                                        <RadioGroup key={index}>
                                            <RadioGroupItem value="option1">Option 1</RadioGroupItem>
                                            <RadioGroupItem value="option2">Option 2</RadioGroupItem>
                                        </RadioGroup>
                                );
                            case 'textarea':
                                return <Textarea key={index} />;
                            default:
                                return null;
                        }
                    })}
                </DroppableArea>
            </div>
    );
};

export default FormBuilder;