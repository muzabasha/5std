"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { speak } from "@/lib/voice";
import { CheckCircle } from "lucide-react";

interface DragItem {
    id: string;
    content: string;
    targetZone: string;
}

interface DropZone {
    id: string;
    label: string;
}

interface DragDropActivityProps {
    items: DragItem[];
    zones: DropZone[];
    title: string;
    onComplete: () => void;
}

export default function DragDropActivity({ items, zones, title, onComplete }: DragDropActivityProps) {
    const { language, voiceEnabled, addStars } = useAppStore();
    const [placed, setPlaced] = useState<Record<string, string[]>>({});
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [completed, setCompleted] = useState(false);

    const availableItems = items.filter(
        (item) => !Object.values(placed).flat().includes(item.id)
    );

    const handleDragStart = (itemId: string) => {
        setDraggedItem(itemId);
    };

    const handleDrop = useCallback(
        (zoneId: string) => {
            if (!draggedItem) return;
            const item = items.find((i) => i.id === draggedItem);
            if (!item) return;

            if (item.targetZone === zoneId) {
                setPlaced((prev) => ({
                    ...prev,
                    [zoneId]: [...(prev[zoneId] || []), draggedItem],
                }));
                if (voiceEnabled) speak("Correct!", language);

                const newPlaced = { ...placed, [zoneId]: [...(placed[zoneId] || []), draggedItem] };
                const totalPlaced = Object.values(newPlaced).flat().length;
                if (totalPlaced === items.length) {
                    setCompleted(true);
                    addStars(5);
                    onComplete();
                }
            } else {
                if (voiceEnabled) speak("Try again!", language);
            }
            setDraggedItem(null);
        },
        [draggedItem, items, placed, voiceEnabled, language, addStars, onComplete]
    );

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-poppins font-bold text-lg mb-4">{title}</h3>

            {completed && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 bg-success/10 text-success p-3 rounded-xl mb-4"
                >
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold">All correct! +5 ⭐</span>
                </motion.div>
            )}

            {/* Draggable Items */}
            <div className="flex flex-wrap gap-2 mb-6 min-h-[60px] p-3 bg-gray-50 rounded-xl">
                {availableItems.map((item) => (
                    <motion.div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-white px-4 py-2 rounded-xl cursor-grab active:cursor-grabbing font-bold text-sm shadow-md"
                    >
                        {item.content}
                    </motion.div>
                ))}
            </div>

            {/* Drop Zones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {zones.map((zone) => (
                    <div
                        key={zone.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(zone.id)}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[100px] transition-colors hover:border-primary hover:bg-primary/5"
                    >
                        <p className="font-bold text-sm text-gray-500 mb-2">{zone.label}</p>
                        <div className="flex flex-wrap gap-2">
                            {(placed[zone.id] || []).map((itemId) => {
                                const item = items.find((i) => i.id === itemId);
                                return (
                                    <span
                                        key={itemId}
                                        className="bg-success/20 text-success px-3 py-1 rounded-lg text-sm font-bold"
                                    >
                                        {item?.content}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
