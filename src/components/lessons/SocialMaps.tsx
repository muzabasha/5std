"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";

export default function SocialMaps() {
    const { language, addStars } = useAppStore();
    const [phase, setPhase] = useState<"concept" | "activity" | "quiz">("concept");
    const [selectedDir, setSelectedDir] = useState<string | null>(null);

    const directions = [
        { id: "N", label: { en: "North", hi: "उत्तर", kn: "ಉತ್ತರ" }, pos: "top-0 left-1/2 -translate-x-1/2", emoji: "⬆️" },
        { id: "S", label: { en: "South", hi: "दक्षिण", kn: "ದಕ್ಷಿಣ" }, pos: "bottom-0 left-1/2 -translate-x-1/2", emoji: "⬇️" },
        { id: "E", label: { en: "East", hi: "पूर्व", kn: "ಪೂರ್ವ" }, pos: "top-1/2 right-0 -translate-y-1/2", emoji: "➡️" },
        { id: "W", label: { en: "West", hi: "पश्चिम", kn: "ಪಶ್ಚಿಮ" }, pos: "top-1/2 left-0 -translate-y-1/2", emoji: "⬅️" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex gap-2 mb-4">
                {(["concept", "activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-fun-pink text-white" : "bg-white text-gray-600"}`}>
                        {p === "concept" ? "💡" : p === "activity" ? "🗺️" : "📝"} {p}
                    </button>
                ))}
            </div>

            {phase === "concept" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                    <h3 className="font-poppins font-bold text-xl text-center">🧭 {language === "hi" ? "नक्शे और दिशाएँ" : "Maps & Directions"}</h3>
                    {/* Compass */}
                    <div className="relative w-48 h-48 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-fun-pink/30 bg-fun-pink/5" />
                        {directions.map((d) => (
                            <button key={d.id} onClick={() => setSelectedDir(d.id)}
                                className={`absolute ${d.pos} p-2 rounded-full transition-all ${selectedDir === d.id ? "bg-fun-pink text-white scale-110" : "bg-white shadow-md hover:bg-fun-pink/10"}`}>
                                <span className="text-lg">{d.emoji}</span>
                            </button>
                        ))}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">🧭</div>
                    </div>
                    {selectedDir && (
                        <p className="text-center font-bold text-fun-pink">
                            {directions.find((d) => d.id === selectedDir)?.label[language]}
                        </p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { emoji: "🗺️", label: language === "hi" ? "नक्शा" : "Map", desc: language === "hi" ? "किसी जगह का चित्र" : "A picture of a place" },
                            { emoji: "🧭", label: language === "hi" ? "दिशा सूचक" : "Compass", desc: language === "hi" ? "दिशा बताता है" : "Shows directions" },
                            { emoji: "📍", label: language === "hi" ? "प्रतीक" : "Symbols", desc: language === "hi" ? "नक्शे के चिह्न" : "Map symbols" },
                            { emoji: "📏", label: language === "hi" ? "पैमाना" : "Scale", desc: language === "hi" ? "दूरी मापता है" : "Measures distance" },
                        ].map((item) => (
                            <div key={item.label} className="bg-fun-pink/5 rounded-xl p-3 flex items-center gap-2">
                                <span className="text-2xl">{item.emoji}</span>
                                <div><p className="font-bold text-sm">{item.label}</p><p className="text-xs text-gray-500">{item.desc}</p></div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => { setPhase("activity"); addStars(2); }} className="w-full bg-fun-pink text-white py-3 rounded-xl font-bold">Activity →</button>
                </motion.div>
            )}

            {phase === "activity" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-4 text-center">🗺️ {language === "hi" ? "नक्शा पहेली" : "Map Puzzle"}</h3>
                    <p className="text-center text-gray-500 text-sm mb-4">{language === "hi" ? "भारत के नक्शे पर स्थानों को पहचानें" : "Identify places on the map of India"}</p>
                    {/* Simple India map representation */}
                    <div className="relative w-64 h-80 mx-auto bg-gradient-to-b from-green-100 to-blue-100 rounded-xl border-2 border-gray-200 p-4">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-bold bg-white px-2 py-0.5 rounded">🏔️ Himalayas</div>
                        <div className="absolute top-1/4 left-4 text-xs font-bold bg-white px-2 py-0.5 rounded">🏜️ Rajasthan</div>
                        <div className="absolute top-1/3 right-4 text-xs font-bold bg-white px-2 py-0.5 rounded">🌊 Bay of Bengal</div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-xs font-bold bg-yellow-100 px-2 py-0.5 rounded">⭐ Delhi</div>
                        <div className="absolute bottom-1/4 left-4 text-xs font-bold bg-white px-2 py-0.5 rounded">🌊 Arabian Sea</div>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold bg-white px-2 py-0.5 rounded">🏝️ Indian Ocean</div>
                        <div className="absolute top-2/3 right-4 text-xs font-bold bg-green-200 px-2 py-0.5 rounded">🌴 Karnataka</div>
                    </div>
                    <button onClick={() => setPhase("quiz")} className="w-full mt-4 bg-fun-pink text-white py-3 rounded-xl font-bold">Quiz →</button>
                </motion.div>
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "m1", question: { en: "Which direction does the sun rise from?", hi: "सूरज किस दिशा से उगता है?", kn: "ಸೂರ್ಯ ಯಾವ ದಿಕ್ಕಿನಿಂದ ಉದಯಿಸುತ್ತಾನೆ?" }, options: { en: ["East", "West", "North", "South"], hi: ["पूर्व", "पश्चिम", "उत्तर", "दक्षिण"], kn: ["ಪೂರ್ವ", "ಪಶ್ಚಿಮ", "ಉತ್ತರ", "ದಕ್ಷಿಣ"] }, correctIndex: 0, explanation: { en: "The sun rises in the East", hi: "सूरज पूर्व दिशा से उगता है", kn: "ಸೂರ್ಯ ಪೂರ್ವ ದಿಕ್ಕಿನಿಂದ ಉದಯಿಸುತ್ತಾನೆ" } },
                        { id: "m2", question: { en: "What shows directions on a map?", hi: "नक्शे पर दिशा क्या दिखाता है?", kn: "ನಕ್ಷೆಯಲ್ಲಿ ದಿಕ್ಕುಗಳನ್ನು ಏನು ತೋರಿಸುತ್ತದೆ?" }, options: { en: ["Compass", "Scale", "Legend", "Title"], hi: ["दिशा सूचक", "पैमाना", "संकेत", "शीर्षक"], kn: ["ದಿಕ್ಸೂಚಿ", "ಮಾಪಕ", "ಸಂಕೇತ", "ಶೀರ್ಷಿಕೆ"] }, correctIndex: 0, explanation: { en: "A compass shows directions", hi: "दिशा सूचक दिशाएँ दिखाता है", kn: "ದಿಕ್ಸೂಚಿ ದಿಕ್ಕುಗಳನ್ನು ತೋರಿಸುತ್ತದೆ" } },
                        { id: "m3", question: { en: "How many main directions are there?", hi: "कितनी मुख्य दिशाएँ हैं?", kn: "ಎಷ್ಟು ಮುಖ್ಯ ದಿಕ್ಕುಗಳಿವೆ?" }, options: { en: ["4", "6", "8", "2"], hi: ["4", "6", "8", "2"], kn: ["4", "6", "8", "2"] }, correctIndex: 0, explanation: { en: "N, S, E, W are the 4 main directions", hi: "उत्तर, दक्षिण, पूर्व, पश्चिम - 4 मुख्य दिशाएँ", kn: "ಉತ್ತರ, ದಕ್ಷಿಣ, ಪೂರ್ವ, ಪಶ್ಚಿಮ - 4 ಮುಖ್ಯ ದಿಕ್ಕುಗಳು" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
