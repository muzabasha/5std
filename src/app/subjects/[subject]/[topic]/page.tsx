"use client";
import { useParams } from "next/navigation";
import { Subject } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { subjectsData } from "@/lib/subjects-data";
import { getTopicsForSubject } from "@/lib/topic-data";
import MathFractions from "@/components/lessons/MathFractions";
import MathPerimeterArea from "@/components/lessons/MathPerimeterArea";
import MathDataHandling from "@/components/lessons/MathDataHandling";
import EnglishSentences from "@/components/lessons/EnglishSentences";
import EnglishGrammar from "@/components/lessons/EnglishGrammar";
import HindiShabdNirman from "@/components/lessons/HindiShabdNirman";
import KannadaPadaRachane from "@/components/lessons/KannadaPadaRachane";
import SciencePlants from "@/components/lessons/SciencePlants";
import ScienceHumanBody from "@/components/lessons/ScienceHumanBody";
import ScienceAnimals from "@/components/lessons/ScienceAnimals";
import SocialMaps from "@/components/lessons/SocialMaps";
import SocialGeography from "@/components/lessons/SocialGeography";
import GenericLesson from "@/components/lessons/GenericLesson";

const lessonComponents: Record<string, Record<string, React.ComponentType>> = {
    math: {
        fractions: MathFractions,
        "perimeter-area": MathPerimeterArea,
        "data-handling": MathDataHandling,
    },
    english: {
        sentences: EnglishSentences,
        grammar: EnglishGrammar,
    },
    hindi: {
        "shabd-nirman": HindiShabdNirman,
    },
    kannada: {
        "pada-rachane": KannadaPadaRachane,
    },
    science: {
        plants: SciencePlants,
        "human-body": ScienceHumanBody,
        "animals-habitats": ScienceAnimals,
    },
    social: {
        "maps-directions": SocialMaps,
        "indian-geography": SocialGeography,
    },
};

export default function TopicPage() {
    const params = useParams();
    const subjectId = params.subject as Subject;
    const topicId = params.topic as string;
    const { language } = useAppStore();

    const subject = subjectsData.find((s) => s.id === subjectId);
    const topics = getTopicsForSubject(subjectId);
    const topic = topics.find((t) => t.id === topicId);

    const LessonComponent = lessonComponents[subjectId]?.[topicId] || GenericLesson;

    return (
        <div className="min-h-screen bg-gray-50/30">
            <Navbar />
            
            {/* Context Header */}
            <div className={`h-2 w-full bg-gradient-to-r ${subject?.gradient}`} />
            
            <main className="max-w-6xl mx-auto px-6 py-12">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-100"
                >
                    <Link 
                        href={`/subjects/${subjectId}`} 
                        className={`p-4 rounded-2xl bg-gradient-to-br ${subject?.gradient} text-white shadow-lg hover:scale-110 transition-transform group`}
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <span className="text-2xl">{subject?.icon}</span>
                            <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">
                                {subject?.name[language]} Module
                            </span>
                        </div>
                        <h1 className="font-poppins font-black text-3xl md:text-4xl text-gray-800 tracking-tight">
                            {topic?.name[language] || topicId}
                        </h1>
                        <p className="text-gray-400 font-medium text-lg mt-1">
                            {topic?.description[language]}
                        </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-3xl border border-gray-100">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Lesson Support</p>
                            <p className="text-sm font-bold text-gray-600">Voice Assistant Active</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-3 h-3 bg-primary rounded-full" 
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <LessonComponent />
                </motion.div>
            </main>
        </div>
    );
}

