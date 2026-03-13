"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Gamepad2, Sparkles, ArrowRight, Lightbulb, Globe, Construction } from "lucide-react";
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
    const content = topic ? universalTopicContent[topic.id] : null;

    if (!content) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-black/5 overflow-hidden border border-gray-100">
                    <div className={`relative p-12 text-center bg-gradient-to-br ${subject?.gradient || 'from-indigo-500 to-purple-600'} text-white overflow-hidden`}>
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mt-32 blur-3xl" />
                        </div>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative z-10 w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/30 text-white shadow-2xl">
                            <Sparkles className="w-12 h-12" />
                        </motion.div>
                        <h2 className="relative z-10 font-poppins font-black text-4xl mb-4 tracking-tight">
                            {language === "hi" ? "अन्वेषण केंद्र" : language === "kn" ? "ಅನ್ವೇಷಣಾ ಕೇಂದ್ರ" : "Discovery Hub"}
                        </h2>
                        <p className="relative z-10 text-white/80 text-lg font-medium max-w-xl mx-auto">
                            {language === "hi" 
                                ? `${topic?.name[language]} के लिए हम एक अद्भुत अनुभवात्मक लैब तैयार कर रहे हैं!` 
                                : `We are engineering a high-fidelity experiential lab for ${topic?.name[language]}!`}
                        </p>
                    </div>
                    <div className="p-12 bg-white text-center">
                        <Construction className="w-16 h-16 text-orange-400 mx-auto mb-6" />
                        <h3 className="font-bold text-2xl text-gray-800 mb-4">Module Preparation in Progress</h3>
                        <p className="text-gray-500 max-w-md mx-auto">Please check other topics while we finish this amazing immersive experience for Sadiya.</p>
                    </div>
                </div>
            </motion.div>
        );
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
