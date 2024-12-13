"use client"

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient';

interface Template {
    id: string;
    name: string;
}

const fetchTemplates = async (): Promise<Template[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/templates`);
    if (!response.ok) {
        throw new Error("Failed to fetch templates");
    }
    return response.json();
};

interface FetchFormsPageProps {
    dehydratedState: unknown;
}

const FetchFormsPage: React.FC<FetchFormsPageProps> = () => {
    const { data: templates, isLoading, isError } = useQuery({
        queryKey: ["templates"],
        queryFn: fetchTemplates,
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading templates.</p>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <main>
                    <h1>Saved Forms</h1>
                    <ul>
                        {templates?.map((template) => (
                                <li key={template.id}>{template.name}</li>
                        ))}
                    </ul>
                </main>
            </div>
        </QueryClientProvider>
    );
};

export default FetchFormsPage;
