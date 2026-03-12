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
                <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${subject.gradient} p-8 text-white shadow-2xl shadow-black/10 cursor-pointer min-h-[280px] flex flex-col justify-between transition-all duration-500 group-hover:shadow-primary/20`}>
                    
                    {/* Decorative background icon */}
                    <div className="absolute -top-6 -right-6 text-[10rem] opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                        {subject.icon}
                    </div>

                    <div className="relative z-10">
                        <motion.div 
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl mb-6 border border-white/30 shadow-xl"
                        >
                            {subject.icon}
                        </motion.div>
                        
                        <h3 className="font-poppins font-black text-2xl mb-2 tracking-tight group-hover:translate-x-1 transition-transform">
                            {subject.name[language]}
                        </h3>
                        
                        <p className="text-white/80 text-sm font-semibold leading-relaxed line-clamp-2">
                            {subject.description[language]}
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between mt-8 bg-black/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                                {subject.topicCount}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                                {t("topics", language)}
                            </span>
                        </div>
                        <motion.div 
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="bg-white text-black p-2 rounded-xl shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

