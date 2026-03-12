"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { speak } from "@/lib/voice";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Volume2, BookOpen } from "lucide-react";

interface StorySlide {
    text: string;
    emoji: string;
}

interface StoryPlayerProps {
    title: string;
    slides: StorySlide[];
    onComplete: () => void;
}

export default function StoryPlayer({ title, slides, onComplete }: StoryPlayerProps) {
    const { language, voiceEnabled } = useAppStore();
    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        if (current < slides.length - 1) {
            setCurrent(current + 1);
        } else {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (current > 0) setCurrent(current - 1);
    };

    const handleSpeak = () => {
        if (voiceEnabled) speak(slides[current].text, language);
    };

    return (
        <div className="bg-gradient-to-br from-warning/20 to-accent/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-accent" />
                <h3 className="font-poppins font-bold text-lg">{title}</h3>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="bg-white rounded-xl p-8 shadow-md text-center min-h-[200px] flex flex-col items-center justify-center"
                >
                    <span className="text-6xl mb-4">{slides[current].emoji}</span>
                    <p className="font-nunito text-lg leading-relaxed">{slides[current].text}</p>
                    {voiceEnabled && (
                        <button
                            onClick={handleSpeak}
                            className="mt-4 flex items-center gap-1 text-primary hover:text-primary-dark text-sm"
                        >
                            <Volume2 className="w-4 h-4" /> Listen
                        </button>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={handlePrev}
                    disabled={current === 0}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white shadow-sm disabled:opacity-30 hover:bg-gray-50 font-bold text-sm"
                >
                    <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex gap-1">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-white shadow-sm hover:bg-primary-dark font-bold text-sm"
                >
                    {current < slides.length - 1 ? "Next" : "Continue"} <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
