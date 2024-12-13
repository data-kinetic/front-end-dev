import React, { ReactNode, useRef, useEffect } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import "./styles.css"

interface DraggableElementProps {
    type: string;
    label: string;
    children?: ReactNode;
}

const DraggableElement: React.FC<DraggableElementProps> = ({ type, label, children }) => {
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
            <div ref={ref} className="draggable-item">
                {label}
                {children}
            </div>
    );
};

export default DraggableElement;;