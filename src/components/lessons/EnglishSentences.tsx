"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { speak } from "@/lib/voice";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";
import { CheckCircle, RotateCcw } from "lucide-react";

const sentenceExercises = [
    { words: ["The", "cat", "sat", "on", "the", "mat"], answer: "The cat sat on the mat" },
    { words: ["She", "is", "reading", "a", "book"], answer: "She is reading a book" },
    { words: ["Birds", "fly", "in", "the", "sky"], answer: "Birds fly in the sky" },
];

export default function EnglishSentences() {
    const { language, voiceEnabled, addStars } = useAppStore();
    const [phase, setPhase] = useState<"activity" | "quiz">("activity");
    const [exerciseIdx, setExerciseIdx] = useState(0);
    const [placed, setPlaced] = useState<string[]>([]);
    const [available, setAvailable] = useState(
        [...sentenceExercises[0].words].sort(() => Math.random() - 0.5)
    );
    const [correct, setCorrect] = useState(false);

    const exercise = sentenceExercises[exerciseIdx];

    const addWord = (word: string, idx: number) => {
        setPlaced([...placed, word]);
        setAvailable(available.filter((_, i) => i !== idx));
    };

    const removeWord = (idx: number) => {
        const word = placed[idx];
        setAvailable([...available, word]);
        setPlaced(placed.filter((_, i) => i !== idx));
    };

    const checkAnswer = () => {
        if (placed.join(" ") === exercise.answer) {
            setCorrect(true);
            addStars(3);
            if (voiceEnabled) speak("Excellent! " + exercise.answer, language);
        } else {
            if (voiceEnabled) speak("Try rearranging the words", language);
        }
    };

    const nextExercise = () => {
        const next = (exerciseIdx + 1) % sentenceExercises.length;
        setExerciseIdx(next);
        setPlaced([]);
        setAvailable([...sentenceExercises[next].words].sort(() => Math.random() - 0.5));
        setCorrect(false);
    };

    const reset = () => {
        setPlaced([]);
        setAvailable([...exercise.words].sort(() => Math.random() - 0.5));
        setCorrect(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-2 mb-4">
                {(["activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-success text-white" : "bg-white text-gray-600"}`}>
                        {p === "activity" ? "🎯 Sentence Builder" : "📝 Quiz"}
                    </button>
                ))}
            </div>

            {phase === "activity" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-2 text-center">✏️ Sentence Builder</h3>
                    <p className="text-center text-gray-500 text-sm mb-4">Drag words to form a correct sentence</p>

                    {/* Sentence area */}
                    <div className="min-h-[60px] bg-success/5 border-2 border-dashed border-success/30 rounded-xl p-3 mb-4 flex flex-wrap gap-2">
                        {placed.length === 0 && <span className="text-gray-400 text-sm">Click words below to build your sentence...</span>}
                        {placed.map((word, i) => (
                            <motion.button key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                                onClick={() => removeWord(i)}
                                className="bg-success text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm hover:bg-success-dark">
                                {word}
                            </motion.button>
                        ))}
                    </div>

                    {/* Available words */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {available.map((word, i) => (
                            <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                onClick={() => addWord(word, i)}
                                className="bg-gray-100 hover:bg-primary/10 px-3 py-1.5 rounded-lg font-bold text-sm border border-gray-200">
                                {word}
                            </motion.button>
                        ))}
                    </div>

                    {correct && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 bg-success/10 text-success p-3 rounded-xl mb-4">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-bold">Correct! +3 ⭐</span>
                        </motion.div>
                    )}

                    <div className="flex gap-2">
                        <button onClick={reset} className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold">
                            <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                        <button onClick={checkAnswer} className="flex-1 bg-success text-white py-2 rounded-xl font-bold">Check</button>
                        {correct && <button onClick={nextExercise} className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm">Next →</button>}
                    </div>
                </motion.div>
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "es1", question: { en: "Which is a correct sentence?", hi: "कौन सा सही वाक्य है?", kn: "ಯಾವುದು ಸರಿಯಾದ ವಾಕ್ಯ?" }, options: { en: ["The dog runs fast.", "Dog the fast runs.", "Runs fast the dog.", "Fast dog the runs."], hi: ["The dog runs fast.", "Dog the fast runs.", "Runs fast the dog.", "Fast dog the runs."], kn: ["The dog runs fast.", "Dog the fast runs.", "Runs fast the dog.", "Fast dog the runs."] }, correctIndex: 0, explanation: { en: "Subject + Verb + Adverb", hi: "कर्ता + क्रिया + क्रिया विशेषण", kn: "ಕರ್ತೃ + ಕ್ರಿಯಾಪದ + ಕ್ರಿಯಾವಿಶೇಷಣ" } },
                        { id: "es2", question: { en: "Rearrange: 'is / beautiful / The / flower'", hi: "'है / सुंदर / फूल / यह' को सही क्रम में लगाएँ", kn: "'is / beautiful / The / flower' ಜೋಡಿಸಿ" }, options: { en: ["The flower is beautiful", "Beautiful the flower is", "Is the flower beautiful", "Flower beautiful the is"], hi: ["The flower is beautiful", "Beautiful the flower is", "Is the flower beautiful", "Flower beautiful the is"], kn: ["The flower is beautiful", "Beautiful the flower is", "Is the flower beautiful", "Flower beautiful the is"] }, correctIndex: 0, explanation: { en: "The flower is beautiful - correct order", hi: "The flower is beautiful - सही क्रम", kn: "The flower is beautiful - ಸರಿಯಾದ ಕ್ರಮ" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
