"use client";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/translations";
import { Language } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Star, Coins } from "lucide-react";

export default function Navbar() {
    const { language, setLanguage, stars, coins, voiceEnabled, toggleVoice } = useAppStore();

    return (
        <motion.nav
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 glass shadow-md"
        >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-3xl">🧪</span>
                    <span className="font-poppins font-bold text-xl text-gradient from-primary to-fun-purple">
                        {t("appName", language)}
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-warning/20 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-warning" fill="currentColor" />
                            <span className="font-bold text-sm">{stars}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full">
                            <Coins className="w-4 h-4 text-accent" />
                            <span className="font-bold text-sm">{coins}</span>
                        </div>
                    </div>

                    {/* Language Selector */}
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="bg-white border-2 border-primary/30 rounded-full px-3 py-1 text-sm font-nunito font-bold focus:outline-none focus:border-primary"
                        aria-label={t("selectLanguage", language)}
                    >
                        <option value="en">English</option>
                        <option value="hi">हिंदी</option>
                        <option value="kn">ಕನ್ನಡ</option>
                    </select>

                    {/* Voice Toggle */}
                    <button
                        onClick={toggleVoice}
                        className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                        aria-label={voiceEnabled ? "Disable voice" : "Enable voice"}
                    >
                        {voiceEnabled ? (
                            <Volume2 className="w-5 h-5 text-primary" />
                        ) : (
                            <VolumeX className="w-5 h-5 text-gray-400" />
                        )}
                    </button>

                    {/* Dashboard Link */}
                    <Link
                        href="/dashboard"
                        className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-primary-dark transition-colors"
                    >
                        {t("dashboard", language)}
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
