"use client";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/translations";
import { motion } from "framer-motion";
import { Star, Coins, Award } from "lucide-react";

export default function GamificationBanner() {
    const { language, stars, coins, badges } = useAppStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary/10 via-success/10 to-warning/10 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-6"
        >
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-warning" fill="currentColor" />
                </div>
                <div>
                    <p className="text-xs text-gray-500">{t("stars", language)}</p>
                    <p className="font-bold text-lg">{stars}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <Coins className="w-5 h-5 text-accent" />
                </div>
                <div>
                    <p className="text-xs text-gray-500">{t("coins", language)}</p>
                    <p className="font-bold text-lg">{coins}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-fun-purple/20 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-fun-purple" />
                </div>
                <div>
                    <p className="text-xs text-gray-500">{t("badges", language)}</p>
                    <p className="font-bold text-lg">{badges.length}</p>
                </div>
            </div>
        </motion.div>
    );
}
