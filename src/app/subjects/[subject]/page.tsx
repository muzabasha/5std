"use client";
import { useAppStore } from "@/lib/store";
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
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/" className="p-2 rounded-full hover:bg-gray-100">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <span className="text-4xl">{subject.icon}</span>
                    <div>
                        <h1 className="font-poppins font-bold text-2xl">{subject.name[language]}</h1>
                        <p className="text-gray-500 text-sm">{subject.description[language]}</p>
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {topics.map((topic, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <Link href={`/subjects/${subjectId}/${topic.id}`}>
                                    <div className="bg-white rounded-2xl shadow-md p-5 card-hover cursor-pointer border-2 border-transparent hover:border-primary/30">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center mb-3`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-poppins font-bold text-base mb-1">
                                            {topic.name[language]}
                                        </h3>
                                        <p className="text-gray-500 text-sm">{topic.description[language]}</p>
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                                                {topic.lessonCount} lessons
                                            </span>
                                            <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full font-bold">
                                                Interactive
                                            </span>
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
