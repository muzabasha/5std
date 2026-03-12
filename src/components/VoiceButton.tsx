"use client";
import { useAppStore } from "@/lib/store";
import { speak, stopSpeaking } from "@/lib/voice";
import { Volume2 } from "lucide-react";

export default function VoiceButton({ text, className = "" }: { text: string; className?: string }) {
    const { language, voiceEnabled } = useAppStore();

    if (!voiceEnabled) return null;

    return (
        <button
            onClick={() => speak(text, language)}
            onDoubleClick={stopSpeaking}
            className={`inline-flex items-center gap-1 text-primary hover:text-primary-dark transition-colors ${className}`}
            aria-label="Listen"
            title="Click to listen"
        >
            <Volume2 className="w-4 h-4" />
        </button>
    );
}
