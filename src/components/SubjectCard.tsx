"use client";
import { useAppStore } from "@/lib/store";
import { SubjectInfo } from "@/lib/subjects-data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SubjectCard({ subject, index }: { subject: SubjectInfo; index: number }) {
    const { language } = useAppStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
        >
            <Link href={`/subjects/${subject.id}`}>
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${subject.gradient} p-6 text-white shadow-lg cursor-pointer min-h-[200px] flex flex-col justify-between`}>
                    <div className="absolute top-0 right-0 text-8xl opacity-20 -mr-4 -mt-4">
                        {subject.icon}
                    </div>
                    <div>
                        <span className="text-4xl mb-3 block">{subject.icon}</span>
                        <h3 className="font-poppins font-bold text-xl mb-1">
                            {subject.name[language]}
                        </h3>
                        <p className="text-white/80 text-sm font-nunito">
                            {subject.description[language]}
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                            {subject.topicCount} topics
                        </span>
                        <span className="text-2xl">→</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
