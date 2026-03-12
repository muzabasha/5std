"use client";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/translations";
import { Language } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Star, Coins } from "lucide-react";

export default function Navbar() {
    const { language, setLanguage, stars, coins, voiceEnabled, toggleVoice, userName, avatar } = useAppStore();

    return (
        <motion.nav
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 glass"
        >
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.span 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl"
                    >
                        🧪
                    </motion.span>
                    <span className="font-poppins font-bold text-2xl text-gradient">
                        {t("appName", language)}
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    {/* User Profile */}
                    <div className="hidden md:flex items-center gap-3 bg-white/50 px-4 py-1.5 rounded-2xl border border-white shadow-sm">
                        <span className="text-xl">{avatar}</span>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter leading-none">Student</span>
                            <span className="text-sm font-black text-primary leading-none">{userName}</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-warning/10 px-4 py-1.5 rounded-xl border border-warning/20">
                            <Star className="w-4 h-4 text-warning" fill="currentColor" />
                            <span className="font-black text-sm text-warning-dark">{stars}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-accent/10 px-4 py-1.5 rounded-xl border border-accent/20">
                            <Coins className="w-4 h-4 text-accent" />
                            <span className="font-black text-sm text-accent-dark">{coins}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Language Selector */}
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            className="bg-white/80 border border-primary/20 rounded-xl px-3 py-1.5 text-xs font-nunito font-black text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                            aria-label={t("selectLanguage", language)}
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                            <option value="kn">ಕನ್ನಡ</option>
                        </select>

                        {/* Voice Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleVoice}
                            className={`p-2.5 rounded-xl transition-all ${voiceEnabled ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}
                            aria-label={voiceEnabled ? "Disable voice" : "Enable voice"}
                        >
                            {voiceEnabled ? (
                                <Volume2 className="w-5 h-5" />
                            ) : (
                                <VolumeX className="w-5 h-5" />
                            )}
                        </motion.button>
                    </div>

                    {/* Dashboard Link - More premium */}
                    <Link
                        href="/dashboard"
                        className="bg-gradient-to-r from-primary to-fun-purple text-white px-6 py-2 rounded-xl text-sm font-black hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        {t("dashboard", language)}
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}

