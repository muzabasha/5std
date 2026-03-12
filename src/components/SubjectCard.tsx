"use client";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/translations";
import { SubjectInfo } from "@/lib/subjects-data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SubjectCard({ subject, index }: { subject: SubjectInfo; index: number }) {
    const { language } = useAppStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="group"
        >
            <Link href={`/subjects/${subject.id}`}>
                <div className={`relative overflow-hidden rounded-[2.5rem] ${subject.lightBg} border-2 border-white p-8 cursor-pointer min-h-[300px] flex flex-col justify-between transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-black/5 premium-shadow`}>
                    
                    {/* Floating background gradient effect */}
                    <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${subject.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-700`} />

                    <div className="relative z-10">
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                            className={`w-20 h-20 bg-gradient-to-br ${subject.gradient} rounded-[2rem] flex items-center justify-center text-4xl mb-8 shadow-xl shadow-black/10`}
                        >
                            {subject.icon}
                        </motion.div>
                        
                        <h3 className={`font-poppins font-black text-3xl mb-3 tracking-tight ${subject.accentColor} group-hover:translate-x-1 transition-transform duration-300`}>
                            {subject.name[language]}
                        </h3>
                        
                        <p className="text-gray-500 text-base font-medium leading-relaxed line-clamp-2 pr-4">
                            {subject.description[language]}
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between mt-10">
                        <div className={`flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white shadow-sm`}>
                            <div className={`w-3 h-3 rounded-full ${subject.color} animate-pulse`} />
                            <span className={`text-xs font-black uppercase tracking-widest ${subject.accentColor}`}>
                                {subject.topicCount} {t("topics", language)}
                            </span>
                        </div>
                        
                        <motion.div 
                            whileHover={{ x: 5 }}
                            className={`w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center ${subject.accentColor} border border-gray-50`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Subtle bottom accent line */}
                    <div className={`absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full bg-gradient-to-r ${subject.gradient} transition-all duration-700`} />
                </div>
            </Link>
        </motion.div>
    );
}

