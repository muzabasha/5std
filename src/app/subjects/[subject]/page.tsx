"use client";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/translations";
import { subjectsData } from "@/lib/subjects-data";
import { Subject } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Gamepad2, FlaskConical, PenTool } from "lucide-react";
import { useParams } from "next/navigation";
import { getTopicsForSubject } from "@/lib/topic-data";

export default function SubjectPage() {
    const params = useParams();
    const subjectId = params.subject as Subject;
    const { language } = useAppStore();
    const subject = subjectsData.find((s) => s.id === subjectId);
    const topics = getTopicsForSubject(subjectId);

    if (!subject) return <div>Subject not found</div>;

    const icons = [BookOpen, Gamepad2, FlaskConical, PenTool];

    return (
        <div className="min-h-screen bg-[#fcfcfd]">
            <Navbar />
            
            {/* Immersive Header */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${subject.gradient} pt-20 pb-16 text-white`}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-24 -mb-24 blur-3xl" />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <Link href="/" className="p-3 rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all group">
                            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div className="h-0.5 w-12 bg-white/30 rounded-full" />
                        <span className="text-sm font-black uppercase tracking-widest opacity-80">Subject Catalog</span>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center text-7xl shadow-2xl border border-white/30"
                        >
                            {subject.icon}
                        </motion.div>
                        <div className="text-center md:text-left">
                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-poppins font-black text-5xl md:text-6xl mb-3 tracking-tighter"
                            >
                                {subject.name[language]}
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white/80 text-xl font-medium max-w-2xl leading-relaxed"
                            >
                                {subject.description[language]}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-16 -mt-10 relative z-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-poppins font-black text-3xl tracking-tight text-gray-800 flex items-center gap-3">
                        {t("exploringTopics", language)}
                        <span className="text-sm bg-gray-100 text-gray-400 px-3 py-1 rounded-full font-bold">{topics.length}</span>
                    </h2>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topics.map((topic, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <Link href={`/subjects/${subjectId}/${topic.id}`}>
                                    <div className="bg-white rounded-[2rem] shadow-xl shadow-black/5 p-8 border border-gray-100 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:translate-y-[-4px] relative overflow-hidden">
                                        
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${subject.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-bl-[100px]`} />

                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.gradient} shadow-lg shadow-black/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        
                                        <h3 className="font-poppins font-black text-xl mb-3 text-gray-800 group-hover:text-primary transition-colors">
                                            {topic.name[language]}
                                        </h3>
                                        
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {topic.description[language]}
                                        </p>
                                        
                                        <div className="mt-auto flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                                <div className={`w-2 h-2 rounded-full ${subject.color}`} />
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">
                                                    {topic.lessonCount} Lessons
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-success/5 px-3 py-1.5 rounded-xl border border-success/10">
                                                <div className="w-2 h-2 rounded-full bg-success" />
                                                <span className="text-[10px] font-black text-success uppercase tracking-widest leading-none">Interactive</span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-6 right-8 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

