"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import DragDropActivity from "@/components/DragDropActivity";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";

export default function ScienceAnimals() {
    const { language } = useAppStore();
    const [phase, setPhase] = useState<"concept" | "activity" | "quiz">("concept");

    const habitats = [
        { name: { en: "Forest", hi: "जंगल", kn: "ಕಾಡು" }, emoji: "🌲", animals: "🦁🐒🦜🐍", color: "bg-green-100" },
        { name: { en: "Desert", hi: "रेगिस्तान", kn: "ಮರುಭೂಮಿ" }, emoji: "🏜️", animals: "🐪🦎🦂🐍", color: "bg-yellow-100" },
        { name: { en: "Ocean", hi: "समुद्र", kn: "ಸಮುದ್ರ" }, emoji: "🌊", animals: "🐋🐠🦈🐙", color: "bg-blue-100" },
        { name: { en: "Arctic", hi: "आर्कटिक", kn: "ಆರ್ಕ್ಟಿಕ್" }, emoji: "🧊", animals: "🐧🦭🐻‍❄️🦌", color: "bg-cyan-100" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex gap-2 mb-4">
                {(["concept", "activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-fun-teal text-white" : "bg-white text-gray-600"}`}>
                        {p === "concept" ? "💡" : p === "activity" ? "🎯" : "📝"} {p}
                    </button>
                ))}
            </div>

            {phase === "concept" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-4 text-center">🦁 {language === "hi" ? "जानवर और आवास" : "Animals & Habitats"}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {habitats.map((h) => (
                            <div key={h.name.en} className={`${h.color} rounded-xl p-4 text-center`}>
                                <span className="text-4xl">{h.emoji}</span>
                                <p className="font-bold mt-1">{h.name[language]}</p>
                                <p className="text-2xl mt-1">{h.animals}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setPhase("activity")} className="w-full mt-4 bg-fun-teal text-white py-3 rounded-xl font-bold">
                        {language === "hi" ? "गतिविधि →" : "Activity →"}
                    </button>
                </motion.div>
            )}

            {phase === "activity" && (
                <DragDropActivity
                    title={language === "hi" ? "जानवरों को सही आवास में रखें" : "Sort Animals to Their Habitats"}
                    items={[
                        { id: "1", content: "🐪 Camel", targetZone: "desert" },
                        { id: "2", content: "🐋 Whale", targetZone: "ocean" },
                        { id: "3", content: "🐒 Monkey", targetZone: "forest" },
                        { id: "4", content: "🐧 Penguin", targetZone: "arctic" },
                        { id: "5", content: "🦁 Lion", targetZone: "forest" },
                        { id: "6", content: "🦈 Shark", targetZone: "ocean" },
                    ]}
                    zones={[
                        { id: "forest", label: "🌲 Forest" },
                        { id: "desert", label: "🏜️ Desert" },
                        { id: "ocean", label: "🌊 Ocean" },
                        { id: "arctic", label: "🧊 Arctic" },
                    ]}
                    onComplete={() => { }}
                />
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "a1", question: { en: "Where do camels live?", hi: "ऊँट कहाँ रहते हैं?", kn: "ಒಂಟೆಗಳು ಎಲ್ಲಿ ವಾಸಿಸುತ್ತವೆ?" }, options: { en: ["Desert", "Ocean", "Forest", "Arctic"], hi: ["रेगिस्तान", "समुद्र", "जंगल", "आर्कटिक"], kn: ["ಮರುಭೂಮಿ", "ಸಮುದ್ರ", "ಕಾಡು", "ಆರ್ಕ್ಟಿಕ್"] }, correctIndex: 0, explanation: { en: "Camels are adapted to desert life", hi: "ऊँट रेगिस्तान के लिए अनुकूलित हैं", kn: "ಒಂಟೆಗಳು ಮರುಭೂಮಿ ಜೀವನಕ್ಕೆ ಹೊಂದಿಕೊಂಡಿವೆ" } },
                        { id: "a2", question: { en: "Which animal lives in the Arctic?", hi: "कौन सा जानवर आर्कटिक में रहता है?", kn: "ಯಾವ ಪ್ರಾಣಿ ಆರ್ಕ್ಟಿಕ್‌ನಲ್ಲಿ ವಾಸಿಸುತ್ತದೆ?" }, options: { en: ["Polar Bear", "Lion", "Monkey", "Camel"], hi: ["ध्रुवीय भालू", "शेर", "बंदर", "ऊँट"], kn: ["ಧ್ರುವ ಕರಡಿ", "ಸಿಂಹ", "ಕೋತಿ", "ಒಂಟೆ"] }, correctIndex: 0, explanation: { en: "Polar bears live in the Arctic", hi: "ध्रुवीय भालू आर्कटिक में रहते हैं", kn: "ಧ್ರುವ ಕರಡಿಗಳು ಆರ್ಕ್ಟಿಕ್‌ನಲ್ಲಿ ವಾಸಿಸುತ್ತವೆ" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
