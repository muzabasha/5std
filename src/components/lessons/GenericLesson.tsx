"use client";
import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";
import { BookOpen, Gamepad2, FlaskConical, Sparkles, Construction, Clock } from "lucide-react";
import { TopicInfo } from "@/lib/topic-data";
import { SubjectInfo } from "@/lib/subjects-data";

interface GenericLessonProps {
    topic?: TopicInfo;
    subject?: SubjectInfo;
}

export default function GenericLesson({ topic, subject }: GenericLessonProps) {
    const { language } = useAppStore();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-black/5 overflow-hidden border border-gray-100">
                {/* Hero Section of the Discovery Hub */}
                <div className={`relative p-12 text-center bg-gradient-to-br ${subject?.gradient || 'from-indigo-500 to-purple-600'} text-white overflow-hidden`}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mt-32 blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mb-32 blur-3xl" />
                    </div>

                    <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="relative z-10 w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/30"
                    >
                        <Sparkles className="w-12 h-12 text-white" />
                    </motion.div>

                    <h2 className="relative z-10 font-poppins font-black text-4xl mb-4 tracking-tight">
                        {language === "hi" ? "नया अन्वेषण केंद्र" : language === "kn" ? "ಹೊಸ ಅನ್ವೇಷಣಾ ಕೇಂದ್ರ" : "Next-Gen Discovery Hub"}
                    </h2>
                    <p className="relative z-10 text-white/80 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                        {language === "hi" 
                            ? `${topic?.name[language]} के लिए हम एक अद्भुत अनुभवात्मक लैब तैयार कर रहे हैं!` 
                            : language === "kn" 
                                ? `${topic?.name[language]} ಗಾಗಿ ನಾವು ಅದ್ಭುತವಾದ ಅನುಭವಾತ್ಮಕ ಪ್ರಯೋಗಾಲಯವನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದ್ದೇವೆ!` 
                                : `We are engineering a high-fidelity experiential lab for ${topic?.name[language]}!`}
                    </p>
                </div>

                {/* Content Section */}
                <div className="p-12 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            { 
                                icon: <BookOpen className="w-8 h-8" />, 
                                title: language === "hi" ? "कहानी मोड" : "Story Mode", 
                                color: "text-blue-600",
                                bg: "bg-blue-50"
                            },
                            { 
                                icon: <Gamepad2 className="w-8 h-8" />, 
                                title: language === "hi" ? "गेम लैब" : "Game Lab", 
                                color: "text-emerald-600",
                                bg: "bg-emerald-50"
                            },
                            { 
                                icon: <FlaskConical className="w-8 h-8" />, 
                                title: language === "hi" ? "प्रयोगशाला" : "Experiment Zone", 
                                color: "text-violet-600",
                                bg: "bg-violet-50"
                            },
                        ].map((f, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -5 }}
                                className={`${f.bg} p-8 rounded-[2rem] text-center border border-gray-100 transition-all`}
                            >
                                <div className={`${f.color} flex flex-col items-center gap-4`}>
                                    <div className="p-4 bg-white rounded-2xl shadow-sm">
                                        {f.icon}
                                    </div>
                                    <span className="text-sm font-black uppercase tracking-widest">{f.title}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-dashed border-gray-200 text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Clock className="w-6 h-6 text-orange-500 animate-spin-slow" />
                            <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
                                Status: System Calibration
                            </span>
                        </div>
                        
                        <h3 className="font-poppins font-black text-2xl mb-4 text-gray-800">
                            {language === "hi" ? "जल्द ही लॉन्च हो रहा है!" : language === "kn" ? "ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ!" : "Launching Soon!"}
                        </h3>
                        
                        <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">
                            {language === "hi" 
                                ? "हमारे विशेषज्ञ इस लैब के लिए इंटरैक्टिव 3D सिमुलेशन और कहानियां तैयार कर रहे हैं।" 
                                : language === "kn" 
                                    ? "ನಮ್ಮ ತಜ್ಞರು ಈ ಪ್ರಯೋಗಾಲಯಕ್ಕಾಗಿ ಸಂವಾದಾತ್ಮಕ 3D ಸಿಮ್ಯುಲೇಶನ್‌ಗಳು ಮತ್ತು ಕಥೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದ್ದಾರೆ." 
                                    : "Our learning designers are finalizing interactive simulations and narrative-driven activities for this module."}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">NEP 2020 Aligned</span>
                            </div>
                            <div className="px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">3D Visuals Coming</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
