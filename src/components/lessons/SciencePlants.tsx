"use client";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import StoryPlayer from "@/components/StoryPlayer";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";

export default function SciencePlants() {
    const { language, addStars } = useAppStore();
    const [phase, setPhase] = useState<"story" | "concept" | "activity" | "quiz">("story");
    const [water, setWater] = useState(0);
    const [sun, setSun] = useState(0);
    const [growth, setGrowth] = useState(0);

    useEffect(() => {
        const g = Math.min(100, (water + sun) / 2);
        setGrowth(g);
    }, [water, sun]);

    const plantHeight = 20 + (growth * 1.5);
    const leafSize = growth > 30 ? Math.min(40, growth * 0.4) : 0;
    const flowerSize = growth > 70 ? Math.min(30, (growth - 70) * 1) : 0;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
                {(["story", "concept", "activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-fun-teal text-white" : "bg-white text-gray-600"}`}>
                        {p === "story" ? "📖" : p === "concept" ? "💡" : p === "activity" ? "🌱" : "📝"} {p}
                    </button>
                ))}
            </div>

            {phase === "story" && (
                <StoryPlayer title={language === "hi" ? "बीज की कहानी" : "The Story of a Seed"}
                    slides={[
                        { emoji: "🌰", text: language === "hi" ? "एक छोटा बीज ज़मीन में गिरा।" : "A tiny seed fell into the soil." },
                        { emoji: "💧", text: language === "hi" ? "बारिश ने उसे पानी दिया।" : "Rain gave it water." },
                        { emoji: "☀️", text: language === "hi" ? "सूरज ने उसे रोशनी दी।" : "The sun gave it light." },
                        { emoji: "🌱", text: language === "hi" ? "बीज अंकुरित हुआ!" : "The seed sprouted!" },
                        { emoji: "🌳", text: language === "hi" ? "वह एक बड़ा पेड़ बन गया!" : "It grew into a big tree!" },
                    ]}
                    onComplete={() => setPhase("concept")}
                />
            )}

            {phase === "concept" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                    <h3 className="font-poppins font-bold text-xl text-center">🌿 {language === "hi" ? "प्रकाश संश्लेषण" : "Photosynthesis"}</h3>
                    <div className="bg-gradient-to-b from-blue-100 to-green-100 rounded-xl p-6 text-center">
                        <div className="flex justify-center items-center gap-4 flex-wrap">
                            {[
                                { emoji: "☀️", label: language === "hi" ? "सूर्य का प्रकाश" : "Sunlight" },
                                { emoji: "➕", label: "" },
                                { emoji: "💧", label: language === "hi" ? "पानी" : "Water" },
                                { emoji: "➕", label: "" },
                                { emoji: "💨", label: "CO₂" },
                                { emoji: "➡️", label: "" },
                                { emoji: "🍃", label: language === "hi" ? "भोजन (ग्लूकोज)" : "Food (Glucose)" },
                                { emoji: "➕", label: "" },
                                { emoji: "🫧", label: "O₂" },
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <span className="text-3xl">{item.emoji}</span>
                                    {item.label && <p className="text-xs font-bold mt-1">{item.label}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { part: language === "hi" ? "जड़" : "Roots", role: language === "hi" ? "पानी सोखती हैं" : "Absorb water", emoji: "🌱" },
                            { part: language === "hi" ? "तना" : "Stem", role: language === "hi" ? "पानी ऊपर ले जाता है" : "Carries water up", emoji: "🪵" },
                            { part: language === "hi" ? "पत्ती" : "Leaves", role: language === "hi" ? "भोजन बनाती हैं" : "Make food", emoji: "🍃" },
                            { part: language === "hi" ? "फूल" : "Flower", role: language === "hi" ? "बीज बनाते हैं" : "Make seeds", emoji: "🌸" },
                        ].map((p) => (
                            <div key={p.part} className="bg-fun-teal/5 rounded-xl p-3 flex items-center gap-2">
                                <span className="text-2xl">{p.emoji}</span>
                                <div><p className="font-bold text-sm">{p.part}</p><p className="text-xs text-gray-500">{p.role}</p></div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setPhase("activity")} className="w-full bg-fun-teal text-white py-3 rounded-xl font-bold">
                        {language === "hi" ? "पौधा उगाएँ →" : "Grow a Plant →"}
                    </button>
                </motion.div>
            )}

            {phase === "activity" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-4 text-center">🌱 {language === "hi" ? "पौधा विकास सिम्युलेटर" : "Plant Growth Simulator"}</h3>
                    {/* Plant visualization */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-48 h-64 bg-gradient-to-b from-blue-200 to-amber-100 rounded-xl overflow-hidden">
                            {/* Sun */}
                            <motion.div animate={{ opacity: sun / 100 }} className="absolute top-2 right-2 text-4xl">☀️</motion.div>
                            {/* Rain */}
                            {water > 50 && <motion.div animate={{ opacity: water / 100 }} className="absolute top-2 left-2 text-2xl">🌧️</motion.div>}
                            {/* Soil */}
                            <div className="absolute bottom-0 w-full h-16 bg-amber-800 rounded-b-xl" />
                            {/* Plant */}
                            <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                                <motion.div animate={{ height: plantHeight }} className="w-3 bg-green-600 rounded-t-full mx-auto" />
                                {leafSize > 0 && (
                                    <>
                                        <motion.div animate={{ width: leafSize, height: leafSize / 2 }} className="absolute bg-green-500 rounded-full" style={{ top: -plantHeight + 20, left: -leafSize / 2 - 5 }} />
                                        <motion.div animate={{ width: leafSize, height: leafSize / 2 }} className="absolute bg-green-500 rounded-full" style={{ top: -plantHeight + 30, right: -leafSize / 2 - 5 }} />
                                    </>
                                )}
                                {flowerSize > 0 && <motion.div animate={{ scale: flowerSize / 30 }} className="absolute text-2xl" style={{ top: -plantHeight - 10, left: -8 }}>🌸</motion.div>}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 max-w-sm mx-auto">
                        <label className="block">
                            <span className="text-sm font-bold">💧 {language === "hi" ? "पानी" : "Water"}: {water}%</span>
                            <input type="range" min={0} max={100} value={water} onChange={(e) => setWater(+e.target.value)} className="w-full" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-bold">☀️ {language === "hi" ? "सूर्य प्रकाश" : "Sunlight"}: {sun}%</span>
                            <input type="range" min={0} max={100} value={sun} onChange={(e) => setSun(+e.target.value)} className="w-full" />
                        </label>
                        <p className="text-center font-bold text-fun-teal">🌱 {language === "hi" ? "विकास" : "Growth"}: {Math.round(growth)}%</p>
                    </div>
                    {growth >= 80 && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 text-center bg-success/10 p-3 rounded-xl">
                            <p className="font-bold text-success">🎉 {language === "hi" ? "पौधा पूरी तरह बड़ा हो गया!" : "Plant fully grown!"}</p>
                        </motion.div>
                    )}
                    <button onClick={() => { setPhase("quiz"); addStars(3); }} className="w-full mt-4 bg-fun-teal text-white py-3 rounded-xl font-bold">Quiz →</button>
                </motion.div>
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "p1", question: { en: "What do plants need to make food?", hi: "पौधों को भोजन बनाने के लिए क्या चाहिए?", kn: "ಸಸ್ಯಗಳಿಗೆ ಆಹಾರ ತಯಾರಿಸಲು ಏನು ಬೇಕು?" }, options: { en: ["Sunlight, water, CO₂", "Only water", "Only sunlight", "Soil only"], hi: ["सूर्य प्रकाश, पानी, CO₂", "केवल पानी", "केवल सूर्य प्रकाश", "केवल मिट्टी"], kn: ["ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು, CO₂", "ಕೇವಲ ನೀರು", "ಕೇವಲ ಸೂರ್ಯನ ಬೆಳಕು", "ಕೇವಲ ಮಣ್ಣು"] }, correctIndex: 0, explanation: { en: "Plants need sunlight, water, and CO₂ for photosynthesis", hi: "प्रकाश संश्लेषण के लिए सूर्य प्रकाश, पानी और CO₂ चाहिए", kn: "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಗೆ ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು CO₂ ಬೇಕು" } },
                        { id: "p2", question: { en: "Which part of the plant absorbs water?", hi: "पौधे का कौन सा भाग पानी सोखता है?", kn: "ಸಸ್ಯದ ಯಾವ ಭಾಗ ನೀರನ್ನು ಹೀರುತ್ತದೆ?" }, options: { en: ["Roots", "Leaves", "Stem", "Flower"], hi: ["जड़", "पत्ती", "तना", "फूल"], kn: ["ಬೇರುಗಳು", "ಎಲೆಗಳು", "ಕಾಂಡ", "ಹೂವು"] }, correctIndex: 0, explanation: { en: "Roots absorb water from soil", hi: "जड़ें मिट्टी से पानी सोखती हैं", kn: "ಬೇರುಗಳು ಮಣ್ಣಿನಿಂದ ನೀರನ್ನು ಹೀರುತ್ತವೆ" } },
                        { id: "p3", question: { en: "What gas do plants release?", hi: "पौधे कौन सी गैस छोड़ते हैं?", kn: "ಸಸ್ಯಗಳು ಯಾವ ಅನಿಲವನ್ನು ಬಿಡುಗಡೆ ಮಾಡುತ್ತವೆ?" }, options: { en: ["Oxygen (O₂)", "Carbon dioxide", "Nitrogen", "Hydrogen"], hi: ["ऑक्सीजन (O₂)", "कार्बन डाइऑक्साइड", "नाइट्रोजन", "हाइड्रोजन"], kn: ["ಆಮ್ಲಜನಕ (O₂)", "ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್", "ಸಾರಜನಕ", "ಜಲಜನಕ"] }, correctIndex: 0, explanation: { en: "Plants release oxygen during photosynthesis", hi: "प्रकाश संश्लेषण में पौधे ऑक्सीजन छोड़ते हैं", kn: "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯಲ್ಲಿ ಸಸ್ಯಗಳು ಆಮ್ಲಜನಕವನ್ನು ಬಿಡುಗಡೆ ಮಾಡುತ್ತವೆ" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
