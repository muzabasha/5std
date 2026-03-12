"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import DragDropActivity from "@/components/DragDropActivity";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";

const bodySystems = [
    { name: { en: "Skeletal", hi: "कंकाल", kn: "ಅಸ್ಥಿಪಂಜರ" }, emoji: "🦴", desc: { en: "206 bones support your body", hi: "206 हड्डियाँ शरीर को सहारा देती हैं", kn: "206 ಮೂಳೆಗಳು ದೇಹವನ್ನು ಬೆಂಬಲಿಸುತ್ತವೆ" } },
    { name: { en: "Muscular", hi: "पेशीय", kn: "ಸ್ನಾಯು" }, emoji: "💪", desc: { en: "Muscles help you move", hi: "मांसपेशियाँ चलने में मदद करती हैं", kn: "ಸ್ನಾಯುಗಳು ಚಲಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ" } },
    { name: { en: "Digestive", hi: "पाचन", kn: "ಜೀರ್ಣ" }, emoji: "🫁", desc: { en: "Breaks down food for energy", hi: "भोजन को ऊर्जा में बदलता है", kn: "ಆಹಾರವನ್ನು ಶಕ್ತಿಗಾಗಿ ವಿಭಜಿಸುತ್ತದೆ" } },
    { name: { en: "Circulatory", hi: "परिसंचरण", kn: "ರಕ್ತಪರಿಚಲನೆ" }, emoji: "❤️", desc: { en: "Heart pumps blood to all parts", hi: "हृदय सभी अंगों में रक्त पहुँचाता है", kn: "ಹೃದಯ ಎಲ್ಲಾ ಭಾಗಗಳಿಗೆ ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುತ್ತದೆ" } },
    { name: { en: "Respiratory", hi: "श्वसन", kn: "ಉಸಿರಾಟ" }, emoji: "🫁", desc: { en: "Lungs help you breathe", hi: "फेफड़े साँस लेने में मदद करते हैं", kn: "ಶ್ವಾಸಕೋಶಗಳು ಉಸಿರಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ" } },
    { name: { en: "Nervous", hi: "तंत्रिका", kn: "ನರ" }, emoji: "🧠", desc: { en: "Brain controls everything", hi: "मस्तिष्क सब कुछ नियंत्रित करता है", kn: "ಮೆದುಳು ಎಲ್ಲವನ್ನೂ ನಿಯಂತ್ರಿಸುತ್ತದೆ" } },
];

export default function ScienceHumanBody() {
    const { language } = useAppStore();
    const [phase, setPhase] = useState<"concept" | "activity" | "quiz">("concept");
    const [selectedSystem, setSelectedSystem] = useState(0);

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
                    <h3 className="font-poppins font-bold text-xl mb-4 text-center">🧬 {language === "hi" ? "मानव शरीर प्रणालियाँ" : "Human Body Systems"}</h3>
                    <div className="flex justify-center mb-4">
                        <div className="text-8xl">🧍</div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {bodySystems.map((sys, i) => (
                            <button key={i} onClick={() => setSelectedSystem(i)}
                                className={`p-3 rounded-xl text-center transition-all ${selectedSystem === i ? "bg-fun-teal/10 border-2 border-fun-teal" : "bg-gray-50 border-2 border-transparent hover:border-fun-teal/30"}`}>
                                <span className="text-3xl">{sys.emoji}</span>
                                <p className="font-bold text-sm mt-1">{sys.name[language]}</p>
                                <p className="text-xs text-gray-500">{sys.desc[language]}</p>
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setPhase("activity")} className="w-full mt-4 bg-fun-teal text-white py-3 rounded-xl font-bold">Activity →</button>
                </motion.div>
            )}

            {phase === "activity" && (
                <DragDropActivity
                    title={language === "hi" ? "अंगों को सही प्रणाली में रखें" : "Match Organs to Body Systems"}
                    items={[
                        { id: "1", content: "🧠 Brain", targetZone: "nervous" },
                        { id: "2", content: "❤️ Heart", targetZone: "circulatory" },
                        { id: "3", content: "🫁 Lungs", targetZone: "respiratory" },
                        { id: "4", content: "🦴 Bones", targetZone: "skeletal" },
                        { id: "5", content: "💪 Biceps", targetZone: "muscular" },
                        { id: "6", content: "🫃 Stomach", targetZone: "digestive" },
                    ]}
                    zones={[
                        { id: "nervous", label: "🧠 Nervous System" },
                        { id: "circulatory", label: "❤️ Circulatory System" },
                        { id: "respiratory", label: "🫁 Respiratory System" },
                        { id: "skeletal", label: "🦴 Skeletal System" },
                        { id: "muscular", label: "💪 Muscular System" },
                        { id: "digestive", label: "🫃 Digestive System" },
                    ]}
                    onComplete={() => { }}
                />
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "hb1", question: { en: "How many bones in the human body?", hi: "मानव शरीर में कितनी हड्डियाँ हैं?", kn: "ಮಾನವ ದೇಹದಲ್ಲಿ ಎಷ್ಟು ಮೂಳೆಗಳಿವೆ?" }, options: { en: ["206", "106", "306", "150"], hi: ["206", "106", "306", "150"], kn: ["206", "106", "306", "150"] }, correctIndex: 0, explanation: { en: "An adult has 206 bones", hi: "वयस्क में 206 हड्डियाँ होती हैं", kn: "ವಯಸ್ಕರಲ್ಲಿ 206 ಮೂಳೆಗಳಿವೆ" } },
                        { id: "hb2", question: { en: "Which organ pumps blood?", hi: "कौन सा अंग रक्त पंप करता है?", kn: "ಯಾವ ಅಂಗ ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುತ್ತದೆ?" }, options: { en: ["Heart", "Brain", "Lungs", "Stomach"], hi: ["हृदय", "मस्तिष्क", "फेफड़े", "पेट"], kn: ["ಹೃದಯ", "ಮೆದುಳು", "ಶ್ವಾಸಕೋಶ", "ಹೊಟ್ಟೆ"] }, correctIndex: 0, explanation: { en: "The heart pumps blood", hi: "हृदय रक्त पंप करता है", kn: "ಹೃದಯ ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುತ್ತದೆ" } },
                        { id: "hb3", question: { en: "Which system helps you breathe?", hi: "कौन सी प्रणाली साँस लेने में मदद करती है?", kn: "ಯಾವ ವ್ಯವಸ್ಥೆ ಉಸಿರಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ?" }, options: { en: ["Respiratory", "Digestive", "Nervous", "Muscular"], hi: ["श्वसन", "पाचन", "तंत्रिका", "पेशीय"], kn: ["ಉಸಿರಾಟ", "ಜೀರ್ಣ", "ನರ", "ಸ್ನಾಯು"] }, correctIndex: 0, explanation: { en: "Respiratory system with lungs helps breathing", hi: "श्वसन तंत्र फेफड़ों से साँस लेने में मदद करता है", kn: "ಶ್ವಾಸಕೋಶಗಳೊಂದಿಗೆ ಉಸಿರಾಟ ವ್ಯವಸ್ಥೆ ಉಸಿರಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
