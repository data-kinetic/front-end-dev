import React, { ReactNode, useRef, useEffect } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

interface DroppableAreaProps {
    onDrop: (type: string) => void;
    children: ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ onDrop, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['text', 'select', 'checkbox', 'radio', 'textarea'],
        drop: (item: { type: string }) => onDrop(item.type),
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
            <div ref={ref} style={{ backgroundColor: isOver ? '#f0f0f0' : '#fff', minHeight: '200px', padding: '10px', border: '1px solid #ccc' }}>
                {children}
            </div>
    );
};

export default DroppableArea;