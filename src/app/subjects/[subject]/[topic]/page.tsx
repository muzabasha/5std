"use client";
import { useParams } from "next/navigation";
import { Subject } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <Link href={`/subjects/${subjectId}`} className="p-2 rounded-full hover:bg-gray-100">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <span className="text-3xl">{subject?.icon}</span>
                    <div>
                        <h1 className="font-poppins font-bold text-xl">
                            {topic?.name[language] || topicId}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {topic?.description[language]}
                        </p>
                    </div>
                </div>
                <LessonComponent />
            </main>
        </div>
    );
}
