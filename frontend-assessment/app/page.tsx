"use client"

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import styles from './page.module.css';

export default function Home() {
    return (
            <QueryClientProvider client={queryClient}>
                <DndProvider backend={HTML5Backend}>
                    <div className={styles.page}>
                        <main className={styles.main}>
                            <FormBuilder />
                        </main>
                    </div>
                </DndProvider>
            </QueryClientProvider>
    );
}