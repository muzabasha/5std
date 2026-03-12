"use client";
import { useState } from "react";
import DragDropActivity from "@/components/DragDropActivity";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";

export default function EnglishGrammar() {
    const [phase, setPhase] = useState<"concept" | "activity" | "quiz">("concept");

    return (
        <div className="space-y-6">
            <div className="flex gap-2 mb-4">
                {(["concept", "activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-success text-white" : "bg-white text-gray-600"}`}>
                        {p === "concept" ? "💡 Concept" : p === "activity" ? "🎯 Activity" : "📝 Quiz"}
                    </button>
                ))}
            </div>

            {phase === "concept" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                    <h3 className="font-poppins font-bold text-xl text-center">📝 Parts of Speech</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { name: "Noun", emoji: "🏠", examples: "dog, school, Riya", color: "bg-primary/10 text-primary" },
                            { name: "Verb", emoji: "🏃", examples: "run, eat, play", color: "bg-success/10 text-success" },
                            { name: "Adjective", emoji: "🌈", examples: "big, red, happy", color: "bg-warning/10 text-yellow-700" },
                            { name: "Adverb", emoji: "⚡", examples: "quickly, very, well", color: "bg-accent/10 text-accent" },
                        ].map((pos) => (
                            <div key={pos.name} className={`${pos.color} rounded-xl p-3 text-center`}>
                                <span className="text-2xl">{pos.emoji}</span>
                                <p className="font-bold text-sm mt-1">{pos.name}</p>
                                <p className="text-xs mt-1 opacity-70">{pos.examples}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setPhase("activity")} className="w-full bg-success text-white py-3 rounded-xl font-bold">
                        Practice Activity →
                    </button>
                </motion.div>
            )}

            {phase === "activity" && (
                <DragDropActivity
                    title="Sort the Words by Parts of Speech"
                    items={[
                        { id: "1", content: "dog", targetZone: "noun" },
                        { id: "2", content: "run", targetZone: "verb" },
                        { id: "3", content: "happy", targetZone: "adjective" },
                        { id: "4", content: "school", targetZone: "noun" },
                        { id: "5", content: "eat", targetZone: "verb" },
                        { id: "6", content: "big", targetZone: "adjective" },
                    ]}
                    zones={[
                        { id: "noun", label: "🏠 Nouns" },
                        { id: "verb", label: "🏃 Verbs" },
                        { id: "adjective", label: "🌈 Adjectives" },
                    ]}
                    onComplete={() => { }}
                />
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "g1", question: { en: "Which word is a noun?", hi: "कौन सा शब्द संज्ञा है?", kn: "ಯಾವ ಪದ ನಾಮಪದ?" }, options: { en: ["River", "Run", "Beautiful", "Quickly"], hi: ["River", "Run", "Beautiful", "Quickly"], kn: ["River", "Run", "Beautiful", "Quickly"] }, correctIndex: 0, explanation: { en: "River is a noun - a naming word", hi: "River संज्ञा है - नाम बताने वाला शब्द", kn: "River ನಾಮಪದ - ಹೆಸರಿಸುವ ಪದ" } },
                        { id: "g2", question: { en: "Which is an adjective?", hi: "कौन सा विशेषण है?", kn: "ಯಾವುದು ಗುಣವಾಚಕ?" }, options: { en: ["Tall", "Walk", "House", "Slowly"], hi: ["Tall", "Walk", "House", "Slowly"], kn: ["Tall", "Walk", "House", "Slowly"] }, correctIndex: 0, explanation: { en: "Tall describes a quality", hi: "Tall गुण बताता है", kn: "Tall ಗುಣವನ್ನು ವಿವರಿಸುತ್ತದೆ" } },
                        { id: "g3", question: { en: "'She sings beautifully.' What is 'beautifully'?", hi: "'She sings beautifully.' में 'beautifully' क्या है?", kn: "'She sings beautifully.' ನಲ್ಲಿ 'beautifully' ಏನು?" }, options: { en: ["Adverb", "Noun", "Verb", "Adjective"], hi: ["Adverb", "Noun", "Verb", "Adjective"], kn: ["Adverb", "Noun", "Verb", "Adjective"] }, correctIndex: 0, explanation: { en: "Beautifully describes how she sings - adverb", hi: "Beautifully बताता है कैसे गाती है - क्रिया विशेषण", kn: "Beautifully ಹೇಗೆ ಹಾಡುತ್ತಾಳೆ ಎಂದು ವಿವರಿಸುತ್ತದೆ - ಕ್ರಿಯಾವಿಶೇಷಣ" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
