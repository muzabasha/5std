"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/translations";
import { speak } from "@/lib/voice";
import { QuizQuestion } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, Trophy } from "lucide-react";

interface QuizEngineProps {
    questions: QuizQuestion[];
    onComplete: (score: number, total: number) => void;
}

export default function QuizEngine({ questions, onComplete }: QuizEngineProps) {
    const { language, voiceEnabled, addStars, addCoins } = useAppStore();
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answered, setAnswered] = useState(false);

    const question = questions[current];
    const isCorrect = selected === question?.correctIndex;

    const handleSelect = (idx: number) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === question.correctIndex) {
            setScore((s) => s + 1);
            if (voiceEnabled) speak(t("correct", language), language);
        } else {
            if (voiceEnabled) speak(t("incorrect", language), language);
        }
    };

    const handleNext = () => {
        if (current < questions.length - 1) {
            setCurrent((c) => c + 1);
            setSelected(null);
            setAnswered(false);
        } else {
            const finalScore = score;
            addStars(finalScore * 2);
            addCoins(finalScore);
            setShowResult(true);
            onComplete(finalScore, questions.length);
        }
    };

    if (showResult) {
        const pct = Math.round((score / questions.length) * 100);
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto"
            >
                <Trophy className="w-16 h-16 text-warning mx-auto mb-4" />
                <h2 className="font-poppins font-bold text-2xl mb-2">{t("wellDone", language)}</h2>
                <p className="text-4xl font-bold text-primary mb-2">
                    {score}/{questions.length}
                </p>
                <p className="text-gray-500 mb-4">{pct}%</p>
                <div className="flex justify-center gap-2 mb-4">
                    <span className="bg-warning/20 px-3 py-1 rounded-full text-sm font-bold">
                        +{score * 2} ⭐
                    </span>
                    <span className="bg-accent/20 px-3 py-1 rounded-full text-sm font-bold">
                        +{score} 🪙
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                        className={`h-3 rounded-full transition-all duration-1000 ${pct >= 70 ? "bg-success" : pct >= 40 ? "bg-warning" : "bg-fun-red"}`}
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
                <span className="text-sm font-bold text-gray-500">
                    {current + 1}/{questions.length}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                >
                    <h3 className="font-poppins font-bold text-lg mb-6">
                        {question.question[language]}
                    </h3>

                    <div className="space-y-3">
                        {question.options[language].map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                disabled={answered}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all font-nunito font-semibold ${answered
                                        ? idx === question.correctIndex
                                            ? "border-success bg-success/10 text-success"
                                            : idx === selected
                                                ? "border-fun-red bg-fun-red/10 text-fun-red"
                                                : "border-gray-200 text-gray-400"
                                        : selected === idx
                                            ? "border-primary bg-primary/10"
                                            : "border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className="flex-1">{option}</span>
                                    {answered && idx === question.correctIndex && (
                                        <CheckCircle className="w-5 h-5 text-success" />
                                    )}
                                    {answered && idx === selected && idx !== question.correctIndex && (
                                        <XCircle className="w-5 h-5 text-fun-red" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Feedback */}
                    {answered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 p-3 rounded-xl text-sm ${isCorrect ? "bg-success/10 text-success" : "bg-fun-red/10 text-fun-red"}`}
                        >
                            {isCorrect ? t("correct", language) : t("incorrect", language)}
                            <p className="mt-1 text-gray-600">{question.explanation[language]}</p>
                        </motion.div>
                    )}

                    {/* Next Button */}
                    {answered && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={handleNext}
                            className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
                        >
                            {current < questions.length - 1 ? t("nextQuestion", language) : t("complete", language)}
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
