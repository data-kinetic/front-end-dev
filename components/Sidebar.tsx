import { useDraggable } from "@dnd-kit/core";
import { useMemo } from "react";
import { componentsList } from "@/app/utils/constants/componentsList";

export const Sidebar = ({
  droppedComponents,
}: {
  droppedComponents: Array<{ id: string; componentId: string; value: any }>;
}) => {

  const updatedComponentsList = useMemo(() => {
    return componentsList.map((item) => ({
      ...item,
      isDropped: droppedComponents.some((dropped) => dropped.id === item.id),
    }));
  }, [droppedComponents]);

  return (
    <div className="w-64 bg-gray-100 border-r p-4">
      <h2 className="text-lg font-bold mb-4">Drag and drop form elements in Form Builder section</h2>
      {updatedComponentsList
        .filter((item) => !item.isDropped)
        .map((item) => (
          <DraggableComponent
            key={item.id}
            id={item.id}
            label={item.label}
          />
        ))}
    </div>
  );
};

const DraggableComponent = ({
  id,
  label,
}: {
  id: string;
  label: string;
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-pointer bg-white border p-2 mb-2 text-sm"
    >
      {label}
    </div>
  );
};
