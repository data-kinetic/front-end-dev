"use client"

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient';
import FormBuilder from '@/components/FormBuilder/FormBuilder';

export default function FormBuilderPage() {
    return (
            <QueryClientProvider client={queryClient}>
                <DndProvider backend={HTML5Backend}>
                    <div >
                        <main>
                            <FormBuilder />
                        </main>
                    </div>
                </DndProvider>
            </QueryClientProvider>
    );
}