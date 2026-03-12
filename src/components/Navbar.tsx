"use client";
import { useAppStore } from "@/lib/store";
import { Language } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Coins } from "lucide-react";

export default function Navbar() {
    const { language, setLanguage, stars, coins, voiceEnabled, toggleVoice, userName, avatar, grade } = useAppStore();

    return (
        <motion.nav
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 px-4 py-3"
        >
            <div className="max-w-7xl mx-auto premium-glass rounded-[2rem] px-6 py-3 flex items-center justify-between shadow-2xl shadow-primary/5">
                <Link href="/" className="flex items-center gap-3 group">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        className="w-12 h-12 bg-gradient-to-br from-primary to-fun-purple rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/20"
                    >
                        🧪
                    </motion.div>
                    <span className="font-poppins font-black text-2xl tracking-tighter text-gray-800">
                        FunLearn <span className="text-primary">Lab</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Language Hub */}
                    <div className="hidden lg:flex items-center gap-1 bg-gray-50/50 p-1 rounded-2xl border border-gray-100">
                        {["en", "hi", "kn"].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang as Language)}
                                className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${language === lang ? 'bg-white shadow-md text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {lang === "hi" ? "HIN" : lang === "kn" ? "KAN" : "ENG"}
                            </button>
                        ))}
                    </div>

                    {/* Profile HUD */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="hidden md:flex items-center gap-4 bg-white/80 border border-gray-100 p-1.5 rounded-2xl shadow-sm pr-6"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                            {avatar}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Grade {grade}</span>
                            <span className="text-sm font-black text-gray-800 leading-none">{userName}</span>
                        </div>
                        
                        <div className="h-8 w-[1px] bg-gray-100 mx-2" />
                        
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-warning" fill="currentColor" />
                                <span className="text-sm font-black text-gray-700">{stars}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                                    <Coins className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span className="text-sm font-black text-gray-700">{coins}</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex items-center gap-2">
                        {/* Voice Assistant Module */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleVoice}
                            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${voiceEnabled ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'}`}
                        >
                            <div className={`w-2 h-2 rounded-full ${voiceEnabled ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
                            {voiceEnabled ? 'Voice ON' : 'Voice OFF'}
                        </motion.button>

                        <Link
                            href="/dashboard"
                            className="bg-gray-900 text-white w-10 h-10 rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl hover:shadow-primary/20"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}


