"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import StoryPlayer from "@/components/StoryPlayer";
import QuizEngine from "@/components/QuizEngine";
import { motion } from "framer-motion";

export default function MathPerimeterArea() {
    const { language, addStars } = useAppStore();
    const [phase, setPhase] = useState<"story" | "concept" | "activity" | "quiz">("story");
    const [gridW, setGridW] = useState(4);
    const [gridH, setGridH] = useState(3);

    const perimeter = 2 * (gridW + gridH);
    const area = gridW * gridH;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
                {(["story", "concept", "activity", "quiz"] as const).map((p) => (
                    <button key={p} onClick={() => setPhase(p)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold ${phase === p ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-primary/10"}`}>
                        {p === "story" ? "📖" : p === "concept" ? "💡" : p === "activity" ? "🎯" : "📝"} {p}
                    </button>
                ))}
            </div>

            {phase === "story" && (
                <StoryPlayer title="The Garden Story"
                    slides={[
                        { emoji: "🏡", text: language === "hi" ? "राम को अपने बगीचे के चारों ओर बाड़ लगानी है।" : "Ram needs to build a fence around his garden." },
                        { emoji: "📏", text: language === "hi" ? "बगीचा 4 मीटर लंबा और 3 मीटर चौड़ा है।" : "The garden is 4 meters long and 3 meters wide." },
                        { emoji: "🤔", text: language === "hi" ? "कितनी बाड़ चाहिए? और बगीचे का क्षेत्रफल क्या है?" : "How much fencing is needed? What is the garden's area?" },
                    ]}
                    onComplete={() => setPhase("concept")}
                />
            )}

            {phase === "concept" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                    <h3 className="font-poppins font-bold text-xl text-center">📐 {language === "hi" ? "परिमाप और क्षेत्रफल" : "Perimeter & Area"}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-primary/5 rounded-xl p-4 text-center">
                            <p className="font-bold text-primary text-lg">{language === "hi" ? "परिमाप" : "Perimeter"}</p>
                            <p className="text-3xl font-bold my-2">2 × (L + W)</p>
                            <p className="text-gray-500 text-sm">{language === "hi" ? "सभी भुजाओं का योग" : "Sum of all sides"}</p>
                        </div>
                        <div className="bg-success/5 rounded-xl p-4 text-center">
                            <p className="font-bold text-success text-lg">{language === "hi" ? "क्षेत्रफल" : "Area"}</p>
                            <p className="text-3xl font-bold my-2">L × W</p>
                            <p className="text-gray-500 text-sm">{language === "hi" ? "लंबाई × चौड़ाई" : "Length × Width"}</p>
                        </div>
                    </div>
                    <button onClick={() => setPhase("activity")} className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                        {language === "hi" ? "गतिविधि →" : "Try Activity →"}
                    </button>
                </motion.div>
            )}

            {phase === "activity" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-poppins font-bold text-xl mb-4 text-center">📐 {language === "hi" ? "क्षेत्रफल ग्रिड" : "Area Measurement Grid"}</h3>
                    <div className="flex justify-center gap-6 mb-4">
                        <label className="text-sm font-bold">
                            {language === "hi" ? "लंबाई" : "Length"}: {gridW}
                            <input type="range" min={1} max={10} value={gridW} onChange={(e) => setGridW(+e.target.value)} className="block w-32" />
                        </label>
                        <label className="text-sm font-bold">
                            {language === "hi" ? "चौड़ाई" : "Width"}: {gridH}
                            <input type="range" min={1} max={8} value={gridH} onChange={(e) => setGridH(+e.target.value)} className="block w-32" />
                        </label>
                    </div>
                    <div className="flex justify-center mb-4">
                        <div className="inline-grid gap-0.5 border-2 border-primary rounded-lg p-1" style={{ gridTemplateColumns: `repeat(${gridW}, 2rem)` }}>
                            {Array.from({ length: gridW * gridH }).map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-primary/30 rounded-sm" />
                            ))}
                        </div>
                    </div>
                    <div className="text-center space-y-1">
                        <p className="font-bold text-primary text-lg">{language === "hi" ? "परिमाप" : "Perimeter"} = 2 × ({gridW} + {gridH}) = {perimeter} units</p>
                        <p className="font-bold text-success text-lg">{language === "hi" ? "क्षेत्रफल" : "Area"} = {gridW} × {gridH} = {area} sq units</p>
                    </div>
                    <button onClick={() => { setPhase("quiz"); addStars(3); }} className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-bold">
                        {language === "hi" ? "प्रश्नोत्तरी →" : "Take Quiz →"}
                    </button>
                </motion.div>
            )}

            {phase === "quiz" && (
                <QuizEngine
                    questions={[
                        { id: "pa1", question: { en: "Perimeter of a rectangle with L=6, W=4?", hi: "L=6, W=4 वाले आयत का परिमाप?", kn: "L=6, W=4 ಆಯತದ ಪರಿಧಿ?" }, options: { en: ["20", "24", "10", "14"], hi: ["20", "24", "10", "14"], kn: ["20", "24", "10", "14"] }, correctIndex: 0, explanation: { en: "2×(6+4)=20", hi: "2×(6+4)=20", kn: "2×(6+4)=20" } },
                        { id: "pa2", question: { en: "Area of a square with side 5 cm?", hi: "5 सेमी भुजा वाले वर्ग का क्षेत्रफल?", kn: "5 ಸೆಂ.ಮೀ ಬದಿಯ ಚೌಕದ ವಿಸ್ತೀರ್ಣ?" }, options: { en: ["25 cm²", "20 cm²", "10 cm²", "15 cm²"], hi: ["25 cm²", "20 cm²", "10 cm²", "15 cm²"], kn: ["25 cm²", "20 cm²", "10 cm²", "15 cm²"] }, correctIndex: 0, explanation: { en: "5×5=25", hi: "5×5=25", kn: "5×5=25" } },
                        { id: "pa3", question: { en: "A room is 8m × 6m. What is its area?", hi: "कमरा 8m × 6m है। क्षेत्रफल?", kn: "ಕೋಣೆ 8m × 6m. ವಿಸ್ತೀರ್ಣ?" }, options: { en: ["48 m²", "28 m²", "14 m²", "56 m²"], hi: ["48 m²", "28 m²", "14 m²", "56 m²"], kn: ["48 m²", "28 m²", "14 m²", "56 m²"] }, correctIndex: 0, explanation: { en: "8×6=48", hi: "8×6=48", kn: "8×6=48" } },
                    ]}
                    onComplete={() => { }}
                />
            )}
        </div>
    );
}
