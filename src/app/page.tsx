"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/translations";
import { subjectsData } from "@/lib/subjects-data";
import Navbar from "@/components/Navbar";
import SubjectCard from "@/components/SubjectCard";
import GamificationBanner from "@/components/GamificationBanner";
import ResourcePerson from "@/components/ResourcePerson";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Gamepad2, Brain, Home, UserCircle } from "lucide-react";

type Tab = "home" | "resource";

export default function HomePage() {
  const { language, userName } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-sm w-fit mx-auto">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "home"
              ? "bg-primary text-white shadow-md"
              : "text-gray-500 hover:bg-primary/10 hover:text-primary"
              }`}
          >
            <Home className="w-4 h-4" />
            {t("home", language)}
          </button>
          <button
            onClick={() => setActiveTab("resource")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "resource"
              ? "bg-primary text-white shadow-md"
              : "text-gray-500 hover:bg-primary/10 hover:text-primary"
              }`}
          >
            <UserCircle className="w-4 h-4" />
            {language === "hi" ? "संसाधन व्यक्ति" : language === "kn" ? "ಸಂಪನ್ಮೂಲ ವ್ಯಕ್ತಿ" : "Resource Person"}
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* HOME TAB */}
        {activeTab === "home" && (
          <>
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="text-6xl mb-4 inline-block"
              >
                🧪
              </motion.div>
              <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-3">
                <span className="text-gradient from-primary via-fun-purple to-accent">
                  {t("appName", language)}
                </span>
              </h1>
              <p className="text-gray-600 text-lg font-nunito max-w-xl mx-auto">
                {t("tagline", language)}
              </p>
              <p className="text-primary font-bold mt-2">
                {t("welcome", language)}, {userName}! 👋
              </p>
            </motion.section>

            {/* Gamification Banner */}
            <section className="mb-8">
              <GamificationBanner />
            </section>

            {/* Learning Pedagogy */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { icon: "🔍", label: t("explore", language), color: "bg-primary/10 text-primary" },
                  { icon: "💡", label: t("understand", language), color: "bg-warning/10 text-warning-dark" },
                  { icon: "🧪", label: t("experiment", language), color: "bg-success/10 text-success" },
                  { icon: "✏️", label: t("practice", language), color: "bg-accent/10 text-accent" },
                  { icon: "🚀", label: t("apply", language), color: "bg-fun-purple/10 text-fun-purple" },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`${step.color} rounded-xl p-3 text-center`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <p className="font-bold text-sm mt-1">{step.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Subject Cards */}
            <section className="mb-10">
              <h2 className="font-poppins font-bold text-2xl mb-6 text-center">
                {t("chooseSubject", language)} 📚
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjectsData.map((subject, i) => (
                  <SubjectCard key={subject.id} subject={subject} index={i} />
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { icon: <BookOpen className="w-6 h-6" />, title: "Story-Based Learning", desc: "Learn through engaging stories and real-life scenarios", color: "text-primary" },
                { icon: <Gamepad2 className="w-6 h-6" />, title: "Fun Games & Activities", desc: "Interactive games, puzzles, and drag-drop activities", color: "text-success" },
                { icon: <Brain className="w-6 h-6" />, title: "Smart Quizzes", desc: "Test your knowledge with instant feedback", color: "text-fun-purple" },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-3"
                >
                  <div className={`${f.color}`}>{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-sm">{f.title}</h3>
                    <p className="text-gray-500 text-xs">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </section>

            {/* Daily Challenge */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-primary to-fun-purple rounded-2xl p-6 text-white text-center mb-8"
            >
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-poppins font-bold text-xl mb-1">{t("dailyChallenge", language)}</h3>
              <p className="text-white/80 text-sm mb-3">
                If a rectangle has length 8 cm and width 5 cm, what is its area?
              </p>
              <div className="flex justify-center gap-3">
                {["13 cm²", "40 cm²", "26 cm²", "45 cm²"].map((opt, i) => (
                  <button
                    key={i}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl font-bold text-sm transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.section>
          </>
        )}

        {/* RESOURCE PERSON TAB */}
        {activeTab === "resource" && <ResourcePerson />}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>🧪 FunLearn Lab © 2026 | Aligned with NEP 2020 & CBSE Curriculum</p>
        <p className="mt-1">Resource Person: Dr. Syed Muzamil Basha, REVA University</p>
      </footer>
    </div>
  );
}
