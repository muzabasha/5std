"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { speak } from "@/lib/voice";
import StoryPlayer from "@/components/StoryPlayer";
import QuizEngine from "@/components/QuizEngine";
import VoiceButton from "@/components/VoiceButton";
import { motion } from "framer-motion";
import { CheckCircle, RotateCcw } from "lucide-react";

type Phase = "story" | "concept" | "activity" | "game" | "quiz" | "realworld";

export default function MathFractions() {
    const { language, voiceEnabled, addStars } = useAppStore();
    const [phase, setPhase] = useState<Phase>("story");
    const [pizzaSlices, setPizzaSlices] = useState<boolean[]>(Array(8).fill(false));
    const [gameScore, setGameScore] = useState(0);
    const [gameMatches, setGameMatches] = useState<string[]>([]);

    const phases: Phase[] = ["story", "concept", "activity", "game", "quiz", "realworld"];
    const phaseLabels = { story: "📖 Story", concept: "💡 Concept", activity: "🎯 Activity", game: "🎮 Game", quiz: "📝 Quiz", realworld: "🌍 Real World" };

    const toggleSlice = (i: number) => {
        const next = [...pizzaSlices];
        next[i] = !next[i];
        setPizzaSlices(next);
    };

    const selectedCount = pizzaSlices.filter(Boolean).length;

    const fractionGamePairs = [
        { id: "1", fraction: "1/2", visual: "🟡🟡🟡🟡⚪⚪⚪⚪" },
        { id: "2", fraction: "1/4", visual: "🟡🟡⚪⚪⚪⚪⚪⚪" },
        { id: "3", fraction: "3/4", visual: "🟡🟡🟡🟡🟡🟡⚪⚪" },
        { id: "4", fraction: "3/8", visual: "🟡🟡🟡⚪⚪⚪⚪⚪" },
    ];

    const [gameSelected, setGameSelected] = useState<string | null>(null);

    const handleGameClick = (id: string) => {
        if (gameMatches.includes(id)) return;
        if (!gameSelected) {
            setGameSelected(id);
        } else {
            const pair1 = fractionGamePairs.find((p) => `f-${p.id}` === gameSelected || `v-${p.id}` === gameSelected);
            const pair2 = fractionGamePairs.find((p) => `f-${p.id}` === id || `v-${p.id}` === id);
            if (pair1 && pair2 && pair1.id === pair2.id && gameSelected !== id) {
                setGameMatches([...gameMatches, `f-${pair1.id}`, `v-${pair1.id}`]);
                setGameScore(gameScore + 1);
                if (voiceEnabled) speak("Correct match!", language);
                if (gameScore + 1 === fractionGamePairs.length) addStars(5);
            }
            setGameSelected(null);
        }
    };

    const quizQuestions = [
        {
            id: "f1", question: { en: "What fraction of a pizza is 3 slices out of 8?", hi: "8 में से 3 टुकड़े पिज़्ज़ा का कौन सा भिन्न है?", kn: "8 ತುಂಡುಗಳಲ್ಲಿ 3 ತುಂಡು ಪಿಜ್ಜಾದ ಯಾವ ಭಿನ್ನರಾಶಿ?" },
            options: { en: ["3/8", "8/3", "1/3", "3/4"], hi: ["3/8", "8/3", "1/3", "3/4"], kn: ["3/8", "8/3", "1/3", "3/4"] },
            correctIndex: 0, explanation: { en: "3 out of 8 slices = 3/8", hi: "8 में से 3 = 3/8", kn: "8 ರಲ್ಲಿ 3 = 3/8" },
        },
        {
            id: "f2", question: { en: "Which is greater: 1/2 or 1/4?", hi: "कौन बड़ा है: 1/2 या 1/4?", kn: "ಯಾವುದು ದೊಡ್ಡದು: 1/2 ಅಥವಾ 1/4?" },
            options: { en: ["1/2", "1/4", "Both equal", "Cannot tell"], hi: ["1/2", "1/4", "दोनों बराबर", "पता नहीं"], kn: ["1/2", "1/4", "ಎರಡೂ ಸಮ", "ಹೇಳಲಾಗದು"] },
            correctIndex: 0, explanation: { en: "1/2 is greater because half is more than a quarter", hi: "1/2 बड़ा है क्योंकि आधा, चौथाई से ज़्यादा है", kn: "1/2 ದೊಡ್ಡದು ಏಕೆಂದರೆ ಅರ್ಧ ಕಾಲುಭಾಗಕ್ಕಿಂತ ಹೆಚ್ಚು" },
        },
        {
            id: "f3", question: { en: "What is 1/4 + 1/4?", hi: "1/4 + 1/4 = ?", kn: "1/4 + 1/4 = ?" },
            options: { en: ["2/4 or 1/2", "2/8", "1/8", "1/4"], hi: ["2/4 या 1/2", "2/8", "1/8", "1/4"], kn: ["2/4 ಅಥವಾ 1/2", "2/8", "1/8", "1/4"] },
            correctIndex: 0, explanation: { en: "1/4 + 1/4 = 2/4 = 1/2", hi: "1/4 + 1/4 = 2/4 = 1/2", kn: "1/4 + 1/4 = 2/4 = 1/2" },
        },
        {
            id: "f4", question: { en: "If 8 slices are shared among 4 friends, how many slices each?", hi: "8 टुकड़े 4 दोस्तों में बाँटें तो हर एक को कितने?", kn: "8 ತುಂಡುಗಳನ್ನು 4 ಸ್ನೇಹಿತರಲ್ಲಿ ಹಂಚಿದರೆ ಪ್ರತಿಯೊಬ್ಬರಿಗೆ ಎಷ್ಟು?" },
            options: { en: ["2", "4", "3", "1"], hi: ["2", "4", "3", "1"], kn: ["2", "4", "3", "1"] },
            correctIndex: 0, explanation: { en: "8 ÷ 4 = 2 slices each", hi: "8 ÷ 4 = 2 टुकड़े प्रत्येक", kn: "8 ÷ 4 = ಪ್ರತಿಯೊಬ್ಬರಿಗೆ 2 ತುಂಡು" },
        },
        {
            id: "f5", question: { en: "What fraction is shaded? ■■■□□□□□", hi: "कितना भाग रंगा है? ■■■□□□□□", kn: "ಎಷ್ಟು ಭಾಗ ಬಣ್ಣ ಹಾಕಲಾಗಿದೆ? ■■■□□□□□" },
            options: { en: ["3/8", "5/8", "3/5", "8/3"], hi: ["3/8", "5/8", "3/5", "8/3"], kn: ["3/8", "5/8", "3/5", "8/3"] },
            correctIndex: 0, explanation: { en: "3 shaded out of 8 total = 3/8", hi: "8 में से 3 रंगे = 3/8", kn: "8 ರಲ್ಲಿ 3 ಬಣ್ಣ = 3/8" },
        },
    ];

    return (
        <div className="space-y-6">
            {/* Phase Navigation */}
            <div className="flex flex-wrap gap-2 mb-4">
                {phases.map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${phase === p ? "bg-primary text-white shadow-md" : "bg-white text-gray-600 hover:bg-primary/10"}`}>
                        {phaseLabels[p]}
                    </button>
                ))}
            </div>

            {/* STORY PHASE */}
            {phase === "story" && (
                <StoryPlayer
                    title={language === "hi" ? "पिज़्ज़ा पार्टी की कहानी" : language === "kn" ? "ಪಿಜ್ಜಾ ಪಾರ್ಟಿ ಕಥೆ" : "The Pizza Party Story"}
                    slides={[
                        { emoji: "👧", text: language === "hi" ? "आज रिया का जन्मदिन है!" : language === "kn" ? "ಇಂದು ರಿಯಾಳ ಹುಟ್ಟುಹಬ್ಬ!" : "Today is Riya's birthday!" },
                        { emoji: "🍕", text: language === "hi" ? "उसकी माँ ने एक बड़ा पिज़्ज़ा ऑर्डर किया।" : language === "kn" ? "ಅವಳ ಅಮ್ಮ ದೊಡ್ಡ ಪಿಜ್ಜಾ ಆರ್ಡರ್ ಮಾಡಿದರು." : "Her mom ordered a big pizza." },
                        { emoji: "🔪", text: language === "hi" ? "पिज़्ज़ा को 8 बराबर टुकड़ों में काटा गया।" : language === "kn" ? "ಪಿಜ್ಜಾವನ್ನು 8 ಸಮ ತುಂಡುಗಳಾಗಿ ಕತ್ತರಿಸಲಾಯಿತು." : "The pizza was cut into 8 equal slices." },
                        { emoji: "👨‍👩‍👧‍👦", text: language === "hi" ? "रिया और उसके 3 दोस्त पिज़्ज़ा बाँटेंगे।" : language === "kn" ? "ರಿಯಾ ಮತ್ತು ಅವಳ 3 ಸ್ನೇಹಿತರು ಪಿಜ್ಜಾ ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ." : "Riya and her 3 friends will share the pizza." },
                        { emoji: "🤔", text: language === "hi" ? "हर एक को कितने टुकड़े मिलेंगे? चलो पता करते हैं!" : language === "kn" ? "ಪ್ರತಿಯೊಬ್ಬರಿಗೆ ಎಷ್ಟು ತುಂಡು ಸಿಗುತ್ತದೆ? ಕಂಡುಹಿಡಿಯೋಣ!" : "How many slices will each person get? Let's find out!" },
                    ]}
                    onComplete={() => setPhase("concept")}
                />
            )}

            {/* CONCEPT PHASE */}
            {phase === "concept" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                    <div className="text-center">
                        <h3 className="font-poppins font-bold text-xl mb-2">
                            {language === "hi" ? "भिन्न क्या है?" : language === "kn" ? "ಭಿನ್ನರಾಶಿ ಎಂದರೇನು?" : "What is a Fraction?"} <VoiceButton text={language === "hi" ? "भिन्न एक पूर्ण का भाग है" : "A fraction is a part of a whole"} />
                        </h3>
                        <p className="text-gray-600">{language === "hi" ? "भिन्न एक पूर्ण का भाग है।" : language === "kn" ? "ಭಿನ್ನರಾಶಿ ಒಂದು ಸಂಪೂರ್ಣದ ಭಾಗ." : "A fraction represents a part of a whole."}</p>
                    </div>
                    {/* Visual Fraction */}
                    <div className="flex justify-center gap-8 flex-wrap">
                        {[{ n: 1, d: 2, label: "1/2" }, { n: 1, d: 4, label: "1/4" }, { n: 3, d: 4, label: "3/4" }].map((f) => (
                            <div key={f.label} className="text-center">
                                <div className="w-24 h-24 rounded-full border-4 border-primary relative overflow-hidden mx-auto">
                                    <div className="absolute inset-0 bg-primary" style={{ clipPath: `polygon(50% 50%, 50% 0%, ${f.n / f.d >= 0.5 ? "100% 0%, 100% 100%" : "100% 0%"}, ${f.n / f.d >= 0.75 ? "0% 100%, 0% 0%" : ""})` }} />
                                </div>
                                <p className="font-bold text-lg mt-2 text-primary">{f.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-primary/5 rounded-xl p-4 text-center">
                        <p className="font-bold">{language === "hi" ? "अंश / हर" : language === "kn" ? "ಅಂಶ / ಛೇದ" : "Numerator / Denominator"}</p>
                        <p className="text-5xl font-bold text-primary my-2">3 / 8</p>
                        <p className="text-sm text-gray-500">{language === "hi" ? "3 = चुने हुए भाग, 8 = कुल भाग" : language === "kn" ? "3 = ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಗ, 8 = ಒಟ್ಟು ಭಾಗ" : "3 = parts selected, 8 = total parts"}</p>
                    </div>
                    <button onClick={() => setPhase("activity")} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors">
                        {language === "hi" ? "गतिविधि शुरू करें →" : language === "kn" ? "ಚಟುವಟಿಕೆ ಪ್ರಾರಂಭಿಸಿ →" : "Start Activity →"}
                    </button>
                </motion.div>
            )}

            {/* ACTIVITY PHASE - Pizza Builder */}
            {phase === "activity" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-2 text-center">
                        🍕 {language === "hi" ? "पिज़्ज़ा भिन्न बिल्डर" : language === "kn" ? "ಪಿಜ್ಜಾ ಭಿನ್ನರಾಶಿ ಬಿಲ್ಡರ್" : "Pizza Fraction Builder"}
                    </h3>
                    <p className="text-center text-gray-500 mb-4">{language === "hi" ? "टुकड़ों पर क्लिक करके भिन्न बनाएँ" : language === "kn" ? "ತುಂಡುಗಳ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ ಭಿನ್ನರಾಶಿ ರಚಿಸಿ" : "Click slices to build fractions"}</p>
                    {/* Pizza */}
                    <div className="flex justify-center mb-4">
                        <div className="relative w-64 h-64">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                {pizzaSlices.map((selected, i) => {
                                    const angle = (i * 360) / 8;
                                    const nextAngle = ((i + 1) * 360) / 8;
                                    const rad1 = (angle - 90) * (Math.PI / 180);
                                    const rad2 = (nextAngle - 90) * (Math.PI / 180);
                                    const x1 = 100 + 90 * Math.cos(rad1);
                                    const y1 = 100 + 90 * Math.sin(rad1);
                                    const x2 = 100 + 90 * Math.cos(rad2);
                                    const y2 = 100 + 90 * Math.sin(rad2);
                                    return (
                                        <path key={i} d={`M100,100 L${x1},${y1} A90,90 0 0,1 ${x2},${y2} Z`}
                                            fill={selected ? "#FF8C42" : "#FFE4C4"} stroke="#fff" strokeWidth="2"
                                            className="cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => toggleSlice(i)} />
                                    );
                                })}
                                <circle cx="100" cy="100" r="15" fill="#FFD93D" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-primary">{selectedCount}/8</p>
                        <p className="text-gray-500">{language === "hi" ? `${selectedCount} टुकड़े चुने, 8 में से` : language === "kn" ? `8 ರಲ್ಲಿ ${selectedCount} ತುಂಡು ಆಯ್ಕೆ` : `${selectedCount} slices selected out of 8`}</p>
                        <button onClick={() => setPizzaSlices(Array(8).fill(false))} className="mt-2 text-sm text-gray-400 flex items-center gap-1 mx-auto hover:text-gray-600">
                            <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                    </div>
                    <button onClick={() => setPhase("game")} className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors">
                        {language === "hi" ? "खेल खेलें →" : language === "kn" ? "ಆಟ ಆಡಿ →" : "Play Game →"}
                    </button>
                </motion.div>
            )}

            {/* GAME PHASE - Match fractions */}
            {phase === "game" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-4 text-center">
                        🎮 {language === "hi" ? "भिन्न मिलान खेल" : language === "kn" ? "ಭಿನ್ನರಾಶಿ ಹೊಂದಾಣಿಕೆ ಆಟ" : "Fraction Matching Game"}
                    </h3>
                    <p className="text-center text-gray-500 mb-4">{language === "hi" ? "भिन्न को उसके चित्र से मिलाएँ" : language === "kn" ? "ಭಿನ್ನರಾಶಿಯನ್ನು ಅದರ ಚಿತ್ರಕ್ಕೆ ಹೊಂದಿಸಿ" : "Match each fraction with its visual"}</p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        {/* Fraction cards */}
                        {fractionGamePairs.map((p) => (
                            <button key={`f-${p.id}`} onClick={() => handleGameClick(`f-${p.id}`)}
                                className={`p-4 rounded-xl border-2 text-center font-bold text-xl transition-all ${gameMatches.includes(`f-${p.id}`) ? "bg-success/20 border-success" : gameSelected === `f-${p.id}` ? "bg-primary/20 border-primary" : "bg-white border-gray-200 hover:border-primary/50"}`}>
                                {p.fraction}
                            </button>
                        ))}
                        {/* Visual cards */}
                        {[...fractionGamePairs].sort(() => 0.5 - Math.random()).map((p) => (
                            <button key={`v-${p.id}`} onClick={() => handleGameClick(`v-${p.id}`)}
                                className={`p-4 rounded-xl border-2 text-center text-lg transition-all ${gameMatches.includes(`v-${p.id}`) ? "bg-success/20 border-success" : gameSelected === `v-${p.id}` ? "bg-primary/20 border-primary" : "bg-white border-gray-200 hover:border-primary/50"}`}>
                                {p.visual}
                            </button>
                        ))}
                    </div>
                    {gameScore === fractionGamePairs.length && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-center">
                            <CheckCircle className="w-12 h-12 text-success mx-auto mb-2" />
                            <p className="font-bold text-success">All matched! +5 ⭐</p>
                        </motion.div>
                    )}
                    <button onClick={() => setPhase("quiz")} className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-bold">
                        {language === "hi" ? "प्रश्नोत्तरी →" : language === "kn" ? "ರಸಪ್ರಶ್ನೆ →" : "Take Quiz →"}
                    </button>
                </motion.div>
            )}

            {/* QUIZ PHASE */}
            {phase === "quiz" && (
                <QuizEngine questions={quizQuestions} onComplete={() => setTimeout(() => setPhase("realworld"), 1500)} />
            )}

            {/* REAL WORLD PHASE */}
            {phase === "realworld" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                    <h3 className="font-poppins font-bold text-xl text-center">
                        🌍 {language === "hi" ? "वास्तविक दुनिया में भिन्न" : language === "kn" ? "ನಿಜ ಜಗತ್ತಿನಲ್ಲಿ ಭಿನ್ನರಾಶಿ" : "Fractions in Real Life"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { emoji: "🍕", title: language === "hi" ? "पिज़्ज़ा बाँटना" : "Sharing Pizza", desc: language === "hi" ? "दोस्तों में पिज़्ज़ा बराबर बाँटना" : "Dividing pizza equally among friends" },
                            { emoji: "⏰", title: language === "hi" ? "समय" : "Time", desc: language === "hi" ? "आधा घंटा = 1/2 घंटा = 30 मिनट" : "Half hour = 1/2 hour = 30 minutes" },
                            { emoji: "🥤", title: language === "hi" ? "पानी की बोतल" : "Water Bottle", desc: language === "hi" ? "बोतल 3/4 भरी है" : "The bottle is 3/4 full" },
                            { emoji: "📏", title: language === "hi" ? "मापन" : "Measurement", desc: language === "hi" ? "1/2 मीटर = 50 सेमी" : "1/2 meter = 50 cm" },
                        ].map((item, i) => (
                            <div key={i} className="bg-gradient-to-br from-primary/5 to-fun-purple/5 rounded-xl p-4 flex items-start gap-3">
                                <span className="text-3xl">{item.emoji}</span>
                                <div>
                                    <h4 className="font-bold text-sm">{item.title}</h4>
                                    <p className="text-gray-500 text-xs">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-success/10 rounded-xl p-4 text-center">
                        <p className="font-bold text-success text-lg">🎉 {language === "hi" ? "पाठ पूरा हुआ!" : language === "kn" ? "ಪಾಠ ಪೂರ್ಣ!" : "Lesson Complete!"}</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
