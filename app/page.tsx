"use client";

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Sidebar } from "@/components/Sidebar";
import { Canvas } from "@/components/Canvas";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Templates from "@/components/Templates";

const queryClient = new QueryClient();

export default function HomePage() {
  const [droppedComponents, setDroppedComponents] = useState<
    Array<{ id: string; componentId: string; value: string }>
  >([]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setDroppedComponents((prev) => [
        ...prev,
        {
          id: active.id,
          componentId: `${active.id}-${Date.now()}`,
          value: "",
        },
      ]);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen">
          <Sidebar droppedComponents={droppedComponents} />
          <Canvas
            droppedComponents={droppedComponents}
            setDroppedComponents={setDroppedComponents}
          />
          <Templates />
        </div>
      </DndContext>
    </QueryClientProvider>
  );
}
