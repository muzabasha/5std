"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { speak } from "@/lib/voice";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";
import { CheckCircle, RotateCcw, Volume2 } from "lucide-react";

const wordExercises = [
    { letters: ["ಶಾ", "ಲೆ"], answer: "ಶಾಲೆ", meaning: { en: "School", hi: "विद्यालय", kn: "ಶಾಲೆ" }, image: "🏫" },
    { letters: ["ಮ", "ನೆ"], answer: "ಮನೆ", meaning: { en: "House", hi: "घर", kn: "ಮನೆ" }, image: "🏠" },
    { letters: ["ಹೂ", "ವು"], answer: "ಹೂವು", meaning: { en: "Flower", hi: "फूल", kn: "ಹೂವು" }, image: "🌸" },
    { letters: ["ಮ", "ರ"], answer: "ಮರ", meaning: { en: "Tree", hi: "पेड़", kn: "ಮರ" }, image: "🌳" },
    { letters: ["ನೀ", "ರು"], answer: "ನೀರು", meaning: { en: "Water", hi: "पानी", kn: "ನೀರು" }, image: "💧" },
];

export default function KannadaPadaRachane() {
    const { language, voiceEnabled, addStars } = useAppStore();
    const [exerciseIdx, setExerciseIdx] = useState(0);
    const [placed, setPlaced] = useState<string[]>([]);
    const [available, setAvailable] = useState([...wordExercises[0].letters].sort(() => Math.random() - 0.5));
    const [correct, setCorrect] = useState(false);
    const [phase, setPhase] = useState<"activity" | "quiz">("activity");
    const exercise = wordExercises[exerciseIdx];

    const addLetter = (l: string, i: number) => { setPlaced([...placed, l]); setAvailable(available.filter((_, j) => j !== i)); };
    const check = () => {
        if (placed.join("") === exercise.answer) { setCorrect(true); addStars(3); if (voiceEnabled) speak(exercise.answer, "kn"); }
        else if (voiceEnabled) speak("ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ", "kn");
    };
    const next = () => { const n = (exerciseIdx + 1) % wordExercises.length; setExerciseIdx(n); setPlaced([]); setAvailable([...wordExercises[n].letters].sort(() => Math.random() - 0.5)); setCorrect(false); };
    const reset = () => { setPlaced([]); setAvailable([...exercise.letters].sort(() => Math.random() - 0.5)); setCorrect(false); };

    return (
        <div className="space-y-6">
            <div className="flex gap-2 mb-4">
                {(["activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-fun-purple text-white" : "bg-white text-gray-600"}`}>
                        {p === "activity" ? "🎯 ಪದ ರಚನೆ" : "📝 ರಸಪ್ರಶ್ನೆ"}
                    </button>
                ))}
            </div>

            {phase === "activity" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-2 text-center">✏️ {language === "kn" ? "ಪದ ರಚನೆ" : "Kannada Word Builder"}</h3>
                    <div className="text-center mb-4">
                        <span className="text-5xl">{exercise.image}</span>
                        <p className="text-gray-500 text-sm mt-1">{exercise.meaning[language]}</p>
                    </div>
                    <div className="min-h-[60px] bg-fun-purple/5 border-2 border-dashed border-fun-purple/30 rounded-xl p-3 mb-4 flex flex-wrap gap-2 justify-center">
                        {placed.length === 0 && <span className="text-gray-400 text-sm">{language === "kn" ? "ಅಕ್ಷರಗಳ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ..." : "Click letters..."}</span>}
                        {placed.map((l, i) => (
                            <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="bg-fun-purple text-white px-4 py-2 rounded-xl font-bold text-xl cursor-pointer"
                                onClick={() => { setAvailable([...available, l]); setPlaced(placed.filter((_, j) => j !== i)); }}>
                                {l}
                            </motion.span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {available.map((l, i) => (
                            <motion.button key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                onClick={() => addLetter(l, i)}
                                className="bg-gray-100 hover:bg-fun-purple/10 px-4 py-2 rounded-xl font-bold text-xl border border-gray-200">
                                {l}
                            </motion.button>
                        ))}
                    </div>
                    {correct && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center justify-center gap-2 bg-success/10 text-success p-3 rounded-xl mb-4">
                            <CheckCircle className="w-5 h-5" /><span className="font-bold">ಸರಿ! {exercise.answer} +3 ⭐</span>
                            <button onClick={() => speak(exercise.answer, "kn")} className="ml-2"><Volume2 className="w-4 h-4" /></button>
                        </motion.div>
                    )}
                    <div className="flex gap-2">
                        <button onClick={reset} className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold"><RotateCcw className="w-3 h-3" /> Reset</button>
                        <button onClick={check} className="flex-1 bg-fun-purple text-white py-2 rounded-xl font-bold">{language === "kn" ? "ಪರಿಶೀಲಿಸಿ" : "Check"}</button>
                        {correct && <button onClick={next} className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm">ಮುಂದೆ →</button>}
                    </div>
                </motion.div>
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "k1", question: { en: "What does 'ಶಾಲೆ' mean?", hi: "'ಶಾಲೆ' का अर्थ?", kn: "'ಶಾಲೆ' ಅರ್ಥವೇನು?" }, options: { en: ["School", "House", "Tree", "Water"], hi: ["विद्यालय", "घर", "पेड़", "पानी"], kn: ["ಶಾಲೆ", "ಮನೆ", "ಮರ", "ನೀರು"] }, correctIndex: 0, explanation: { en: "ಶಾಲೆ = School", hi: "ಶಾಲೆ = विद्यालय", kn: "ಶಾಲೆ = School" } },
                        { id: "k2", question: { en: "Complete: ಇದು ಒಂದು ___. (🏫)", hi: "पूरा करें: ಇದು ಒಂದು ___. (🏫)", kn: "ಪೂರ್ಣಗೊಳಿಸಿ: ಇದು ಒಂದು ___. (🏫)" }, options: { en: ["ಶಾಲೆ", "ಮನೆ", "ಹೂವು", "ಮರ"], hi: ["ಶಾಲೆ", "ಮನೆ", "ಹೂವು", "ಮರ"], kn: ["ಶಾಲೆ", "ಮನೆ", "ಹೂವು", "ಮರ"] }, correctIndex: 0, explanation: { en: "ಇದು ಒಂದು ಶಾಲೆ.", hi: "ಇದು ಒಂದು ಶಾಲೆ.", kn: "ಇದು ಒಂದು ಶಾಲೆ." } },
                        { id: "k3", question: { en: "Which is a Kannada vowel (ಸ್ವರ)?", hi: "कौन सा कन्नड़ स्वर है?", kn: "ಯಾವುದು ಕನ್ನಡ ಸ್ವರ?" }, options: { en: ["ಅ", "ಕ", "ಗ", "ಪ"], hi: ["ಅ", "ಕ", "ಗ", "ಪ"], kn: ["ಅ", "ಕ", "ಗ", "ಪ"] }, correctIndex: 0, explanation: { en: "ಅ is a vowel", hi: "ಅ एक स्वर है", kn: "ಅ ಒಂದು ಸ್ವರ" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
