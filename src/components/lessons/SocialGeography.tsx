"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import DragDropActivity from "@/components/DragDropActivity";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";

export default function SocialGeography() {
    const { language } = useAppStore();
    const [phase, setPhase] = useState<"concept" | "activity" | "quiz">("concept");

    const states = [
        { name: "Karnataka", capital: "Bengaluru", emoji: "🏛️" },
        { name: "Maharashtra", capital: "Mumbai", emoji: "🌆" },
        { name: "Tamil Nadu", capital: "Chennai", emoji: "🛕" },
        { name: "Kerala", capital: "Thiruvananthapuram", emoji: "🌴" },
        { name: "Rajasthan", capital: "Jaipur", emoji: "🏰" },
        { name: "West Bengal", capital: "Kolkata", emoji: "🌉" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex gap-2 mb-4">
                {(["concept", "activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-fun-pink text-white" : "bg-white text-gray-600"}`}>
                        {p === "concept" ? "💡" : p === "activity" ? "🎯" : "📝"} {p}
                    </button>
                ))}
            </div>

            {phase === "concept" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-4 text-center">🇮🇳 {language === "hi" ? "भारत का भूगोल" : "Indian Geography"}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {states.map((s) => (
                            <div key={s.name} className="bg-fun-pink/5 rounded-xl p-3 text-center">
                                <span className="text-3xl">{s.emoji}</span>
                                <p className="font-bold text-sm mt-1">{s.name}</p>
                                <p className="text-xs text-gray-500">{s.capital}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                        {[
                            { emoji: "🏔️", label: language === "hi" ? "हिमालय" : "Himalayas" },
                            { emoji: "🌊", label: language === "hi" ? "गंगा नदी" : "River Ganga" },
                            { emoji: "🏜️", label: language === "hi" ? "थार मरुस्थल" : "Thar Desert" },
                        ].map((f) => (
                            <div key={f.label} className="bg-blue-50 rounded-xl p-2 text-center">
                                <span className="text-2xl">{f.emoji}</span>
                                <p className="text-xs font-bold">{f.label}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setPhase("activity")} className="w-full mt-4 bg-fun-pink text-white py-3 rounded-xl font-bold">Activity →</button>
                </motion.div>
            )}

            {phase === "activity" && (
                <DragDropActivity
                    title={language === "hi" ? "राज्य और राजधानी मिलाएँ" : "Match States with Capitals"}
                    items={[
                        { id: "1", content: "Bengaluru", targetZone: "karnataka" },
                        { id: "2", content: "Mumbai", targetZone: "maharashtra" },
                        { id: "3", content: "Chennai", targetZone: "tamilnadu" },
                        { id: "4", content: "Jaipur", targetZone: "rajasthan" },
                    ]}
                    zones={[
                        { id: "karnataka", label: "🏛️ Karnataka" },
                        { id: "maharashtra", label: "🌆 Maharashtra" },
                        { id: "tamilnadu", label: "🛕 Tamil Nadu" },
                        { id: "rajasthan", label: "🏰 Rajasthan" },
                    ]}
                    onComplete={() => { }}
                />
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "sg1", question: { en: "What is the capital of Karnataka?", hi: "कर्नाटक की राजधानी क्या है?", kn: "ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?" }, options: { en: ["Bengaluru", "Mumbai", "Chennai", "Hyderabad"], hi: ["बेंगलुरु", "मुंबई", "चेन्नई", "हैदराबाद"], kn: ["ಬೆಂಗಳೂರು", "ಮುಂಬೈ", "ಚೆನ್ನೈ", "ಹೈದರಾಬಾದ್"] }, correctIndex: 0, explanation: { en: "Bengaluru is the capital of Karnataka", hi: "बेंगलुरु कर्नाटक की राजधानी है", kn: "ಬೆಂಗಳೂರು ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ" } },
                        { id: "sg2", question: { en: "Which is the longest river in India?", hi: "भारत की सबसे लंबी नदी कौन सी है?", kn: "ಭಾರತದ ಅತಿ ಉದ್ದ ನದಿ ಯಾವುದು?" }, options: { en: ["Ganga", "Yamuna", "Godavari", "Krishna"], hi: ["गंगा", "यमुना", "गोदावरी", "कृष्णा"], kn: ["ಗಂಗಾ", "ಯಮುನಾ", "ಗೋದಾವರಿ", "ಕೃಷ್ಣಾ"] }, correctIndex: 0, explanation: { en: "Ganga is the longest river in India", hi: "गंगा भारत की सबसे लंबी नदी है", kn: "ಗಂಗಾ ಭಾರತದ ಅತಿ ಉದ್ದ ನದಿ" } },
                        { id: "sg3", question: { en: "Which desert is in Rajasthan?", hi: "राजस्थान में कौन सा मरुस्थल है?", kn: "ರಾಜಸ್ಥಾನದಲ್ಲಿ ಯಾವ ಮರುಭೂಮಿ ಇದೆ?" }, options: { en: ["Thar Desert", "Sahara Desert", "Gobi Desert", "Kalahari"], hi: ["थार मरुस्थल", "सहारा", "गोबी", "कालाहारी"], kn: ["ಥಾರ್ ಮರುಭೂಮಿ", "ಸಹಾರಾ", "ಗೋಬಿ", "ಕಲಹಾರಿ"] }, correctIndex: 0, explanation: { en: "Thar Desert is in Rajasthan", hi: "थार मरुस्थल राजस्थान में है", kn: "ಥಾರ್ ಮರುಭೂಮಿ ರಾಜಸ್ಥಾನದಲ್ಲಿದೆ" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
