import React, { ReactNode, useRef, useEffect } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import "./styles.css"

interface DroppableAreaProps {
    onDrop: (item: { type: string }) => void;
    children: ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['text', 'select', 'checkbox', 'radio', 'textarea'],
        drop: (item: { type: string }) => onDrop(item),
        collect: (monitor: DropTargetMonitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    useEffect(() => {
        if (ref.current) {
            drop(ref.current);
        }
    }, [ref, drop]);

    return (
            <div ref={ref} className="droppable-area">
                {children}
            </div>
    );
};

export default DroppableArea;