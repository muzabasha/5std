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
  const { language, userName, avatar } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? (language === "hi" ? "शुभ प्रभात" : language === "kn" ? "ಶುಭೋದಯ" : "Good Morning") 
                 : hour < 17 ? (language === "hi" ? "नमस्ते" : language === "kn" ? "ನಮಸ್ಕಾರ" : "Good Afternoon")
                 : (language === "hi" ? "शुभ संध्या" : language === "kn" ? "ಶುಭ ಸಂಜೆ" : "Good Evening");

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[#fbfdff]">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-fun-purple/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar />

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-2xl shadow-black/5 w-fit mx-auto border border-gray-100">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${activeTab === "home"
              ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
          >
            <Home className="w-4 h-4" />
            {t("home", language)}
          </button>
          <button
            onClick={() => setActiveTab("resource")}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${activeTab === "resource"
              ? "bg-emerald-600 text-white shadow-xl shadow-emerald-200"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
          >
            <UserCircle className="w-4 h-4" />
            {language === "hi" ? "संसाधन" : language === "kn" ? "ಸಂಪನ್ಮೂಲ" : "Resource"}
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16">

        {/* HOME TAB */}
        {activeTab === "home" && (
          <>
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-24 relative"
            >
              <div className="absolute left-1/2 -translate-x-1/2 -top-10 flex gap-4 pointer-events-none">
                <span className="text-4xl animate-float opacity-20">🚀</span>
                <span className="text-4xl animate-float opacity-20" style={{ animationDelay: '1s' }}>✨</span>
              </div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="text-8xl mb-10 inline-block drop-shadow-2xl"
              >
                {avatar}
              </motion.div>
              
              <div className="max-w-3xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full border border-gray-100 shadow-sm"
                >
                  <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">{greeting}, {userName}!</span>
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                </motion.div>

                <h1 className="font-poppins font-black text-6xl md:text-7xl mb-6 tracking-tight leading-[1.1] text-gray-900">
                  Ready to <span className="text-primary italic">Explore</span> & Learn?
                </h1>
                
                <p className="text-gray-500 text-xl font-medium max-w-xl mx-auto leading-relaxed mb-12">
                  Dive into amazing stories, interactive activities, and unlock your true potential in Grade 5!
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                    Start Learning
                  </button>
                  <button className="bg-white text-gray-600 border-2 border-gray-100 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all">
                    View Progress
                  </button>
                </div>
              </div>
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
                  { icon: "🔍", label: t("explore", language), color: "bg-blue-100 text-blue-700 border-blue-200" },
                  { icon: "💡", label: t("understand", language), color: "bg-amber-100 text-amber-700 border-amber-200" },
                  { icon: "🧪", label: t("experiment", language), color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
                  { icon: "✏️", label: t("practice", language), color: "bg-rose-100 text-rose-700 border-rose-200" },
                  { icon: "🚀", label: t("apply", language), color: "bg-violet-100 text-violet-700 border-violet-200" },
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
                { icon: <BookOpen className="w-8 h-8" />, title: "Story-Based Learning", desc: "Learn through engaging stories and real-life scenarios", color: "text-amber-600", bg: "bg-amber-50" },
                { icon: <Gamepad2 className="w-8 h-8" />, title: "Fun Games & Activities", desc: "Interactive games, puzzles, and drag-drop activities", color: "text-pink-600", bg: "bg-pink-50" },
                { icon: <Brain className="w-8 h-8" />, title: "Smart Quizzes", desc: "Test your knowledge with instant feedback", color: "text-indigo-600", bg: "bg-indigo-50" },
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
        <p className="text-gray-400 font-bold mb-2">🧪 FunLearn Lab © 2026</p>
        <p className="text-gray-300 text-xs">Aligned with NEP 2020 & CBSE Curriculum Standards</p>
        <p className="mt-3 text-emerald-600 font-black text-sm uppercase tracking-tighter">
          Resource Person: Dr. Syed Muzamil Basha • REVA University
        </p>
      </footer>
    </div>
  );
}

