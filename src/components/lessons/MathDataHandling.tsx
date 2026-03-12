"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";

const fruitData = [
    { name: "🍎 Apple", votes: 8, color: "#EF4444" },
    { name: "🍌 Banana", votes: 5, color: "#FFD93D" },
    { name: "🍇 Grapes", votes: 7, color: "#A855F7" },
    { name: "🍊 Orange", votes: 6, color: "#FF8C42" },
    { name: "🥭 Mango", votes: 10, color: "#6BCB77" },
];

export default function MathDataHandling() {
    const { language } = useAppStore();
    const [phase, setPhase] = useState<"concept" | "activity" | "quiz">("concept");
    const [data, setData] = useState(fruitData);
    const maxVotes = Math.max(...data.map((d) => d.votes));

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
                {(["concept", "activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-primary text-white" : "bg-white text-gray-600"}`}>
                        {p === "concept" ? "💡" : p === "activity" ? "📊" : "📝"} {p}
                    </button>
                ))}
            </div>

            {phase === "concept" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6 text-center space-y-4">
                    <h3 className="font-poppins font-bold text-xl">📊 {language === "hi" ? "डेटा प्रबंधन" : "Data Handling"}</h3>
                    <p className="text-gray-600">{language === "hi" ? "डेटा को चार्ट और ग्राफ से समझें" : "Understand data using charts and graphs"}</p>
                    <div className="grid grid-cols-3 gap-3">
                        {["📊 Bar Chart", "📈 Line Graph", "🥧 Pie Chart"].map((c) => (
                            <div key={c} className="bg-primary/5 rounded-xl p-3 text-center">
                                <p className="text-2xl">{c.split(" ")[0]}</p>
                                <p className="text-xs font-bold mt-1">{c.split(" ").slice(1).join(" ")}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setPhase("activity")} className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                        {language === "hi" ? "चार्ट बनाएँ →" : "Build a Chart →"}
                    </button>
                </motion.div>
            )}

            {phase === "activity" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-4 text-center">📊 {language === "hi" ? "फल सर्वेक्षण चार्ट" : "Favourite Fruit Survey"}</h3>
                    <p className="text-center text-gray-500 text-sm mb-4">{language === "hi" ? "वोट बदलने के लिए + / - दबाएँ" : "Click + / - to change votes"}</p>
                    {/* Bar Chart */}
                    <div className="flex items-end justify-center gap-4 h-48 mb-4">
                        {data.map((d, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <span className="text-xs font-bold">{d.votes}</span>
                                <motion.div animate={{ height: `${(d.votes / maxVotes) * 150}px` }} className="w-10 rounded-t-lg" style={{ backgroundColor: d.color }} />
                                <span className="text-xs text-center">{d.name}</span>
                                <div className="flex gap-1">
                                    <button onClick={() => setData(data.map((x, j) => j === i ? { ...x, votes: Math.max(0, x.votes - 1) } : x))} className="w-6 h-6 bg-gray-200 rounded text-xs font-bold">-</button>
                                    <button onClick={() => setData(data.map((x, j) => j === i ? { ...x, votes: x.votes + 1 } : x))} className="w-6 h-6 bg-gray-200 rounded text-xs font-bold">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-primary/5 rounded-xl p-3 text-center text-sm">
                        <p><span className="font-bold">{language === "hi" ? "सबसे लोकप्रिय:" : "Most popular:"}</span> {data.reduce((a, b) => a.votes > b.votes ? a : b).name}</p>
                        <p><span className="font-bold">{language === "hi" ? "कुल वोट:" : "Total votes:"}</span> {data.reduce((a, b) => a + b.votes, 0)}</p>
                    </div>
                    <button onClick={() => setPhase("quiz")} className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-bold">Quiz →</button>
                </motion.div>
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "dh1", question: { en: "In a bar chart, which fruit got 10 votes?", hi: "बार चार्ट में किस फल को 10 वोट मिले?", kn: "ಬಾರ್ ಚಾರ್ಟ್‌ನಲ್ಲಿ ಯಾವ ಹಣ್ಣಿಗೆ 10 ಮತ ಸಿಕ್ಕಿತು?" }, options: { en: ["Mango", "Apple", "Banana", "Grapes"], hi: ["आम", "सेब", "केला", "अंगूर"], kn: ["ಮಾವು", "ಸೇಬು", "ಬಾಳೆ", "ದ್ರಾಕ್ಷಿ"] }, correctIndex: 0, explanation: { en: "Mango had 10 votes", hi: "आम को 10 वोट मिले", kn: "ಮಾವಿಗೆ 10 ಮತ ಸಿಕ್ಕಿತು" } },
                        { id: "dh2", question: { en: "Total votes for Apple and Banana?", hi: "सेब और केले के कुल वोट?", kn: "ಸೇಬು ಮತ್ತು ಬಾಳೆಯ ಒಟ್ಟು ಮತ?" }, options: { en: ["13", "15", "10", "12"], hi: ["13", "15", "10", "12"], kn: ["13", "15", "10", "12"] }, correctIndex: 0, explanation: { en: "8+5=13", hi: "8+5=13", kn: "8+5=13" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
