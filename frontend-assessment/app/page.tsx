"use client"

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import styles from './page.module.css';

export default function Home() {
    return (
            <DndProvider backend={HTML5Backend}>
                <div className={styles.page}>
                    <main className={styles.main}>
                        <FormBuilder />
                    </main>
                </div>
            </DndProvider>
    );
}