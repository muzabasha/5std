"use client";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/translations";
import { motion } from "framer-motion";
import { Star, Coins, Award } from "lucide-react";

export default function GamificationBanner() {
    const { language, stars, coins, badges } = useAppStore();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            {[
                { 
                    label: t("stars", language), 
                    value: stars, 
                    icon: <Star className="w-8 h-8 text-warning" fill="currentColor" />, 
                    color: "from-amber-400 to-orange-500",
                    bg: "bg-warning/10",
                    desc: "Weekly Goal: 100"
                },
                { 
                    label: t("coins", language), 
                    value: coins, 
                    icon: <Coins className="w-8 h-8 text-accent" />, 
                    color: "from-pink-400 to-rose-500",
                    bg: "bg-accent/10",
                    desc: "Store Credits"
                },
                { 
                    label: t("badges", language), 
                    value: badges.length, 
                    icon: <Award className="w-8 h-8 text-fun-purple" />, 
                    color: "from-purple-400 to-indigo-600",
                    bg: "bg-fun-purple/10",
                    desc: "Mastery Level"
                }
            ].map((stat, i) => (
                <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="relative group overflow-hidden bg-white p-6 rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-50 transition-all duration-300"
                >
                    <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stat.color} rounded-l-full`} />
                    
                    <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 ${stat.bg} rounded-3xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500`}>
                            {stat.icon}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                                {stat.label}
                            </p>
                            <div className="flex items-baseline gap-2">
                                <h4 className="text-4xl font-poppins font-black text-gray-800 tracking-tighter">
                                    {stat.value}
                                </h4>
                                <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">+12%</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{stat.desc}</p>
                        </div>
                        
                        <div className="w-12 h-12 relative flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="20" className="stroke-gray-100 fill-none" strokeWidth="4" />
                                <circle 
                                    cx="24" cy="24" r="20" 
                                    className={`stroke-current ${stat.label === t("stars", language) ? 'text-warning' : stat.label === t("coins", language) ? 'text-accent' : 'text-fun-purple'} fill-none`} 
                                    strokeWidth="4" 
                                    strokeDasharray="125.6" 
                                    strokeDashoffset={125.6 - (125.6 * (stat.value / (stat.label === t("badges", language) ? 10 : 100)))} 
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="absolute text-[8px] font-black">{Math.round((stat.value / (stat.label === t("badges", language) ? 10 : 100)) * 100)}%</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}

