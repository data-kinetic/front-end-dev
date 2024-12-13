import React, { ReactNode, useRef, useEffect } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';

interface DraggableElementProps {
    type: string;
    children: ReactNode;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ type, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        item: { type },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        if (ref.current) {
            drag(ref.current);
        }
    }, [ref, drag]);

    return (
            <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
                {children}
            </div>
    );
};

export default DraggableElement;