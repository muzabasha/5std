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
  const { language, userName, grade, avatar } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Navbar />

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex gap-2 bg-white/50 backdrop-blur-md rounded-3xl p-2 shadow-2xl shadow-primary/5 w-fit mx-auto border border-white/50 premium-shadow">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === "home"
              ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
              : "text-gray-500 hover:bg-primary/10 hover:text-primary"
              }`}
          >
            <Home className="w-4 h-4" />
            {t("home", language)}
          </button>
          <button
            onClick={() => setActiveTab("resource")}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === "resource"
              ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
              : "text-gray-500 hover:bg-primary/10 hover:text-primary"
              }`}
          >
            <UserCircle className="w-4 h-4" />
            {language === "hi" ? "संसाधन व्यक्ति" : language === "kn" ? "ಸಂಪನ್ಮೂಲ ವ್ಯಕ್ತಿ" : "Resource Person"}
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* HOME TAB */}
        {activeTab === "home" && (
          <>
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16 relative"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 4 },
                  y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }}
                className="text-7xl mb-6 inline-block filter drop-shadow-2xl"
              >
                {avatar}
              </motion.div>
              
              <h1 className="font-poppins font-bold text-5xl md:text-6xl mb-4 tracking-tight">
                <span className="text-gradient">
                  {t("appName", language)}
                </span>
              </h1>
              
              <p className="text-gray-500 text-xl font-nunito max-w-2xl mx-auto leading-relaxed mb-6">
                {t("tagline", language)}
              </p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl shadow-primary/5 border border-primary/10"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                  {avatar}
                </div>
                <div className="text-left">
                  <p className="text-primary font-black text-lg">
                    {t("welcome", language)}, Sadiya! 👋
                  </p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Sadiya • Grade {grade}
                  </p>
                </div>
              </motion.div>
            </motion.section>

            {/* Gamification Banner */}
            <section className="mb-12">
              <GamificationBanner />
            </section>

            {/* Learning Pedagogy */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: "🔍", label: t("explore", language), color: "bg-primary/10 text-primary border-primary/20" },
                  { icon: "💡", label: t("understand", language), color: "bg-warning/10 text-warning border-warning/20" },
                  { icon: "🧪", label: t("experiment", language), color: "bg-success/10 text-success border-success/20" },
                  { icon: "✏️", label: t("practice", language), color: "bg-accent/10 text-accent border-accent/20" },
                  { icon: "🚀", label: t("apply", language), color: "bg-fun-purple/10 text-fun-purple border-fun-purple/20" },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`${step.color} rounded-2xl p-5 text-center border shadow-lg shadow-black/5 hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-3xl mb-2 block">{step.icon}</span>
                    <p className="font-bold text-sm">{step.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Subject Cards */}
            <section className="mb-24 relative">
              {/* Decorative background blur */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

              <div className="flex flex-col items-center mb-16 relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-4"
                >
                  Learning Catalog
                </motion.div>
                <h2 className="font-poppins font-black text-4xl md:text-5xl mb-4 text-center tracking-tight">
                  {t("chooseSubject", language)} <span className="inline-block animate-bounce">📚</span>
                </h2>
                <div className="h-2 w-32 bg-gradient-to-r from-primary via-indigo-500 to-fun-purple rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
                {subjectsData.map((subject, i) => (
                  <SubjectCard key={subject.id} subject={subject} index={i} />
                ))}
              </div>
            </section>


            {/* Features */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: <BookOpen className="w-8 h-8" />, title: "Story-Based Learning", desc: "Learn through engaging stories and real-life scenarios", color: "text-primary", bg: "bg-primary/5" },
                { icon: <Gamepad2 className="w-8 h-8" />, title: "Fun Games & Activities", desc: "Interactive games, puzzles, and drag-drop activities", color: "text-success", bg: "bg-success/5" },
                { icon: <Brain className="w-8 h-8" />, title: "Smart Quizzes", desc: "Test your knowledge with instant feedback", color: "text-fun-purple", bg: "bg-fun-purple/5" },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`bg-white rounded-3xl p-8 shadow-xl shadow-black/5 flex items-start gap-4 border border-gray-100 group hover:bg-gradient-to-br hover:from-white hover:to-gray-50 transition-all duration-300`}
                >
                  <div className={`${f.bg} ${f.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </section>

            {/* Daily Challenge */}
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-primary via-indigo-600 to-fun-purple rounded-[2.5rem] p-12 text-white text-center mb-12 relative overflow-hidden shadow-2xl shadow-primary/20"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-3xl" />
              
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                <h3 className="font-poppins font-bold text-3xl mb-2">{t("dailyChallenge", language)}</h3>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  If a rectangle has length 8 cm and width 5 cm, what is its area?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {["13 cm²", "40 cm²", "26 cm²", "45 cm²"].map((opt, i) => (
                    <button
                      key={i}
                      className="bg-white/10 backdrop-blur-md hover:bg-white/30 border border-white/20 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>
          </>
        )}

        {/* RESOURCE PERSON TAB */}
        {activeTab === "resource" && <ResourcePerson />}
      </main>

      {/* Footer */}
      <footer className="text-center py-12 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <p className="text-gray-500 font-bold mb-2">🧪 FunLearn Lab © 2026</p>
        <p className="text-gray-400 text-xs">Aligned with NEP 2020 & CBSE Curriculum Standards</p>
        <p className="mt-3 text-primary font-bold text-sm">
          Resource Person: Dr. Syed Muzamil Basha • REVA University
        </p>
      </footer>
    </div>
  );
}

