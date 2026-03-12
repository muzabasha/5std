"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { speak } from "@/lib/voice";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";
import { CheckCircle, RotateCcw, Volume2 } from "lucide-react";

const wordExercises = [
    { letters: ["वि", "द्या", "ल", "य"], answer: "विद्यालय", meaning: { en: "School", hi: "विद्यालय", kn: "ಶಾಲೆ" }, image: "🏫" },
    { letters: ["पु", "स्त", "क"], answer: "पुस्तक", meaning: { en: "Book", hi: "पुस्तक", kn: "ಪುಸ್ತಕ" }, image: "📚" },
    { letters: ["अ", "ध्या", "प", "क"], answer: "अध्यापक", meaning: { en: "Teacher", hi: "अध्यापक", kn: "ಶಿಕ್ಷಕ" }, image: "👨‍🏫" },
    { letters: ["भो", "ज", "न"], answer: "भोजन", meaning: { en: "Food", hi: "भोजन", kn: "ಆಹಾರ" }, image: "🍽️" },
];

export default function HindiShabdNirman() {
    const { language, voiceEnabled, addStars } = useAppStore();
    const [exerciseIdx, setExerciseIdx] = useState(0);
    const [placed, setPlaced] = useState<string[]>([]);
    const [available, setAvailable] = useState([...wordExercises[0].letters].sort(() => Math.random() - 0.5));
    const [correct, setCorrect] = useState(false);
    const [phase, setPhase] = useState<"activity" | "quiz">("activity");

    const exercise = wordExercises[exerciseIdx];

    const addLetter = (letter: string, idx: number) => {
        setPlaced([...placed, letter]);
        setAvailable(available.filter((_, i) => i !== idx));
    };

    const check = () => {
        if (placed.join("") === exercise.answer) {
            setCorrect(true);
            addStars(3);
            if (voiceEnabled) speak(exercise.answer, "hi");
        } else {
            if (voiceEnabled) speak("फिर से कोशिश करें", "hi");
        }
    };

    const next = () => {
        const n = (exerciseIdx + 1) % wordExercises.length;
        setExerciseIdx(n);
        setPlaced([]);
        setAvailable([...wordExercises[n].letters].sort(() => Math.random() - 0.5));
        setCorrect(false);
    };

    const reset = () => {
        setPlaced([]);
        setAvailable([...exercise.letters].sort(() => Math.random() - 0.5));
        setCorrect(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-2 mb-4">
                {(["activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-accent text-white" : "bg-white text-gray-600"}`}>
                        {p === "activity" ? "🎯 शब्द निर्माण" : "📝 प्रश्नोत्तरी"}
                    </button>
                ))}
            </div>

            {phase === "activity" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-2 text-center">
                        ✏️ {language === "hi" ? "शब्द निर्माण" : "Hindi Word Builder"}
                    </h3>
                    <div className="text-center mb-4">
                        <span className="text-5xl">{exercise.image}</span>
                        <p className="text-gray-500 text-sm mt-1">{exercise.meaning[language]}</p>
                    </div>

                    {/* Word area */}
                    <div className="min-h-[60px] bg-accent/5 border-2 border-dashed border-accent/30 rounded-xl p-3 mb-4 flex flex-wrap gap-2 justify-center">
                        {placed.length === 0 && <span className="text-gray-400 text-sm">{language === "hi" ? "अक्षरों पर क्लिक करें..." : "Click letters below..."}</span>}
                        {placed.map((l, i) => (
                            <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="bg-accent text-white px-4 py-2 rounded-xl font-bold text-xl cursor-pointer"
                                onClick={() => { setAvailable([...available, l]); setPlaced(placed.filter((_, j) => j !== i)); }}>
                                {l}
                            </motion.span>
                        ))}
                    </div>

                    {/* Available letters */}
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {available.map((l, i) => (
                            <motion.button key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                onClick={() => addLetter(l, i)}
                                className="bg-gray-100 hover:bg-accent/10 px-4 py-2 rounded-xl font-bold text-xl border border-gray-200">
                                {l}
                            </motion.button>
                        ))}
                    </div>

                    {correct && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center justify-center gap-2 bg-success/10 text-success p-3 rounded-xl mb-4">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-bold">सही! {exercise.answer} +3 ⭐</span>
                            <button onClick={() => speak(exercise.answer, "hi")} className="ml-2"><Volume2 className="w-4 h-4" /></button>
                        </motion.div>
                    )}

                    <div className="flex gap-2">
                        <button onClick={reset} className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold">
                            <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                        <button onClick={check} className="flex-1 bg-accent text-white py-2 rounded-xl font-bold">
                            {language === "hi" ? "जाँचें" : "Check"}
                        </button>
                        {correct && <button onClick={next} className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm">अगला →</button>}
                    </div>
                </motion.div>
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "h1", question: { en: "What does 'विद्यालय' mean?", hi: "'विद्यालय' का अर्थ क्या है?", kn: "'विद्यालय' ಅರ್ಥವೇನು?" }, options: { en: ["School", "Book", "Teacher", "House"], hi: ["विद्यालय", "पुस्तक", "अध्यापक", "घर"], kn: ["ಶಾಲೆ", "ಪುಸ್ತಕ", "ಶಿಕ್ಷಕ", "ಮನೆ"] }, correctIndex: 0, explanation: { en: "विद्यालय means School", hi: "विद्यालय = School", kn: "विद्यालय = ಶಾಲೆ" } },
                        { id: "h2", question: { en: "Complete: यह एक ___ है। (🏫)", hi: "पूरा करें: यह एक ___ है। (🏫)", kn: "ಪೂರ್ಣಗೊಳಿಸಿ: यह एक ___ है। (🏫)" }, options: { en: ["विद्यालय", "पुस्तक", "भोजन", "बगीचा"], hi: ["विद्यालय", "पुस्तक", "भोजन", "बगीचा"], kn: ["विद्यालय", "पुस्तक", "भोजन", "बगीचा"] }, correctIndex: 0, explanation: { en: "यह एक विद्यालय है।", hi: "यह एक विद्यालय है।", kn: "ಇದು ಒಂದು ಶಾಲೆ." } },
                        { id: "h3", question: { en: "Which is a Hindi vowel (स्वर)?", hi: "कौन सा हिंदी स्वर है?", kn: "ಯಾವುದು ಹಿಂದಿ ಸ್ವರ?" }, options: { en: ["अ", "क", "ग", "प"], hi: ["अ", "क", "ग", "प"], kn: ["अ", "क", "ग", "प"] }, correctIndex: 0, explanation: { en: "अ is a vowel (स्वर)", hi: "अ एक स्वर है", kn: "अ ಒಂದು ಸ್ವರ" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
