"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Gamepad2, Sparkles, ArrowRight, Lightbulb, Globe } from "lucide-react";
import { TopicInfo } from "@/lib/topic-data";
import { SubjectInfo } from "@/lib/subjects-data";
import { universalTopicContent } from "@/lib/topic-content";
import StoryPlayer from "@/components/StoryPlayer";

interface GenericLessonProps {
    topic?: TopicInfo;
    subject?: SubjectInfo;
}

type Phase = "story" | "concept" | "activity" | "realworld";

export default function GenericLesson({ topic, subject }: GenericLessonProps) {
    const { language } = useAppStore();
    const [phase, setPhase] = useState<Phase>("story");
    const content = topic ? (universalTopicContent[topic.id] || {
        story: [
            { emoji: "🚀", text: { en: `Let's start learning about ${topic.name.en}!`, hi: `आइए ${topic.name.hi} के बारे में सीखना शुरू करें!`, kn: `${topic.name.kn} ಬಗ್ಗೆ ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸೋಣ!` } },
            { emoji: "💡", text: { en: topic.description.en, hi: topic.description.hi, kn: topic.description.kn } },
        ],
        concept: {
            title: { en: `${topic.name.en} Concepts`, hi: `${topic.name.hi} अवधारणाएं`, kn: `${topic.name.kn} ಪರಿಕಲ್ಪನೆಗಳು` },
            description: { en: `Welcome to the wonderful world of ${topic.name.en}. Here we will explore its core principles.`, hi: `${topic.name.hi} की अद्भुत दुनिया में आपका स्वागत है। यहां हम इसके मूल सिद्धांतों का पता लगाएंगे।`, kn: `${topic.name.kn} ದ ಅದ್ಭುತ ಜಗತ್ತಿಗೆ ಸುಸ್ವಾಗತ. ಇಲ್ಲಿ ನಾವು ಅದರ ಮೂಲ ತತ್ವಗಳನ್ನು ಅನ್ವೇಷಿಸುತ್ತೇವೆ.` },
            points: [
                { en: "Understanding the basics", hi: "मूल बातों को समझना", kn: "ಮೂಲ ವಿಷಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು" },
                { en: "Practicing with examples", hi: "उदाहरणों के साथ अभ्यास करना", kn: "ಉದಾಹರಣೆಗಳೊಂದಿಗೆ ಅಭ್ಯಾಸ ಮಾಡುವುದು" },
            ]
        },
        activity: {
            type: "visual",
            data: [topic.name.en, "Explore", "Learn"]
        },
        realWorld: [
            { 
                emoji: "🌍", 
                title: { en: "In Real Life", hi: "असल जिंदगी में", kn: "ನಿಜ ಜೀವನದಲ್ಲಿ" }, 
                desc: { en: `${topic.name.en} helps us in our everyday life by solving problems.`, hi: `${topic.name.hi} समस्याओं को हल करने में हमारे रोजमर्रा के जीवन में हमारी मदद करता है।`, kn: `${topic.name.kn} ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸುವ ಮೂಲಕ ನಮ್ಮ ದಿನನಿತ್ಯದ ಜೀವನದಲ್ಲಿ ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.` } 
            }
        ]
    }) : null;

    if (!content) {
        return <div aria-hidden className="hidden" />;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Phase Tabs */}
            <div className="flex justify-center flex-wrap gap-2 bg-white/50 backdrop-blur-md p-2 rounded-3xl border border-white w-fit mx-auto shadow-xl shadow-black/5">
                {[
                    { id: "story", icon: <BookOpen className="w-4 h-4" />, label: "Story" },
                    { id: "concept", icon: <Lightbulb className="w-4 h-4" />, label: "Learn" },
                    { id: "activity", icon: <Gamepad2 className="w-4 h-4" />, label: "Activity" },
                    { id: "realworld", icon: <Globe className="w-4 h-4" />, label: "World" },
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setPhase(t.id as Phase)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                            phase === t.id 
                            ? `bg-gradient-to-br ${subject?.gradient} text-white shadow-lg` 
                            : "text-gray-400 hover:text-gray-600 hover:bg-white"
                        }`}
                    >
                        {t.icon}
                        {t.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={phase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="min-h-[400px]"
                >
                    {phase === "story" && (
                        <StoryPlayer 
                            title={topic?.name[language] || ""}
                            slides={content.story.map(s => ({ emoji: s.emoji, text: s.text[language] }))}
                            onComplete={() => setPhase("concept")}
                        />
                    )}

                    {phase === "concept" && (
                        <div className="bg-white rounded-[3rem] shadow-2xl shadow-black/5 overflow-hidden border border-gray-100">
                            <div className={`p-10 md:p-12 bg-gradient-to-br ${subject?.gradient} text-white`}>
                                <h2 className="text-4xl font-black mb-4 tracking-tight">{content.concept.title[language]}</h2>
                                <p className="text-white/80 text-xl font-medium leading-relaxed">{content.concept.description[language]}</p>
                            </div>
                            <div className="p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {content.concept.points.map((p, i) => (
                                    <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject?.gradient} flex-shrink-0 flex items-center justify-center text-white shadow-md`}>
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <p className="text-gray-700 font-bold">{p[language]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {phase === "activity" && (
                        <div className="bg-white rounded-[3rem] shadow-2xl shadow-black/5 p-10 md:p-12 border border-gray-100 text-center">
                            <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${subject?.gradient} flex items-center justify-center mx-auto mb-8 text-white shadow-xl`}>
                                <Gamepad2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-black mb-6 text-gray-800">Interactive Challenge</h3>
                            
                            {content.activity.type === "facts" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {content.activity.data.map((item: { label?: string; value?: string } | string, i: number) => (
                                        <motion.div 
                                            key={i}
                                            whileHover={{ scale: 1.05 }}
                                            className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center"
                                        >
                                            <div className={`text-2xl font-black mb-2 text-primary`}>{typeof item === 'string' ? item : (item.label || '')}</div>
                                            <div className="text-xs text-gray-400 font-bold uppercase">{typeof item === 'string' ? '' : (item.value || '')}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {content.activity.type === "sort" && (
                                <div className="flex flex-wrap justify-center gap-4">
                                    {content.activity.data.map((item: string | {label?: string; value?: string}, i: number) => (
                                        <motion.div 
                                            key={i}
                                            whileHover={{ y: -5 }}
                                            className="px-8 py-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 font-bold text-gray-600 shadow-sm"
                                        >
                                            {typeof item === 'string' ? item : (item.label || '')}
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {content.activity.type === "visual" && (
                                <div className="flex flex-wrap justify-center gap-6">
                                    {content.activity.data.map((item: string | {label?: string; value?: string}, i: number) => (
                                        <div key={i} className="flex flex-col items-center gap-4">
                                            <div className="w-24 h-24 bg-gray-50 rounded-full border-4 border-primary/20 flex items-center justify-center">
                                                <Sparkles className="w-8 h-8 text-primary/40" />
                                            </div>
                                            <span className="font-black text-gray-800">{typeof item === 'string' ? item : (item.label || '')}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-12 p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Ready for the World?</span>
                                <button onClick={() => setPhase("realworld")} className={`flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br ${subject?.gradient} text-white font-black text-sm shadow-xl hover:scale-105 transition-transform`}>
                                    Take Leap <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {phase === "realworld" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {content.realWorld.map((item, i) => (
                                 <motion.div 
                                    key={i}
                                    className="bg-white p-10 rounded-[3rem] shadow-xl shadow-black/5 border border-gray-100"
                                 >
                                     <div className="text-6xl mb-6">{item.emoji}</div>
                                     <h4 className="text-2xl font-black mb-3 text-gray-800">{item.title[language]}</h4>
                                     <p className="text-gray-500 font-medium leading-relaxed">{item.desc[language]}</p>
                                 </motion.div>
                             ))}
                             <div className={`bg-gradient-to-br ${subject?.gradient} p-10 rounded-[3rem] text-white flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden`}>
                                 <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                                 <Sparkles className="w-16 h-16 mb-6 opacity-50 relative z-10" />
                                 <h4 className="text-3xl font-black mb-2 relative z-10">Well Done!</h4>
                                 <p className="opacity-80 font-medium relative z-10">You completed this discovery!</p>
                             </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
