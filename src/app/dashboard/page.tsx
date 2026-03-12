"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/translations";
import { subjectsData } from "@/lib/subjects-data";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Star, Coins, Award, TrendingUp, BookOpen, Target, Users, BarChart3 } from "lucide-react";

type Tab = "student" | "teacher" | "parent";

export default function DashboardPage() {
    const { language, stars, coins, badges, completedLessons, progress, userName } = useAppStore();
    const [tab, setTab] = useState<Tab>("student");

    const totalProgress = Object.values(progress).reduce((a, b) => a + b, 0) / 6;

    const allBadges = [
        { id: "math-master", name: "Math Master", icon: "🔢", description: "Complete all math lessons" },
        { id: "science-explorer", name: "Science Explorer", icon: "🔬", description: "Complete all science lessons" },
        { id: "language-champion", name: "Language Champion", icon: "📖", description: "Complete all language lessons" },
        { id: "geography-genius", name: "Geography Genius", icon: "🌍", description: "Complete all social studies" },
        { id: "puzzle-solver", name: "Puzzle Solver", icon: "🧩", description: "Solve 50 puzzles" },
        { id: "star-collector", name: "Star Collector", icon: "⭐", description: "Earn 100 stars" },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/" className="p-2 rounded-full hover:bg-gray-100"><ArrowLeft className="w-5 h-5" /></Link>
                    <h1 className="font-poppins font-bold text-2xl">{t("dashboard", language)}</h1>
                </div>

                {/* Tab Selector */}
                <div className="flex gap-2 mb-6">
                    {(["student", "teacher", "parent"] as const).map((r) => (
                        <button key={r} onClick={() => setTab(r)}
                            className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${tab === r ? "bg-primary text-white shadow-md" : "bg-white text-gray-600 hover:bg-primary/10"}`}>
                            {r === "student" ? "👨‍🎓" : r === "teacher" ? "👩‍🏫" : "👨‍👩‍👧"} {t(r, language)}
                        </button>
                    ))}
                </div>

                {/* STUDENT DASHBOARD */}
                {tab === "student" && (
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: <Star className="w-6 h-6 text-warning" fill="currentColor" />, label: t("stars", language), value: stars, bg: "bg-warning/10" },
                                { icon: <Coins className="w-6 h-6 text-accent" />, label: t("coins", language), value: coins, bg: "bg-accent/10" },
                                { icon: <Award className="w-6 h-6 text-fun-purple" />, label: t("badges", language), value: badges.length, bg: "bg-fun-purple/10" },
                                { icon: <BookOpen className="w-6 h-6 text-primary" />, label: "Lessons", value: completedLessons.length, bg: "bg-primary/10" },
                            ].map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className={`${s.bg} rounded-2xl p-4 flex items-center gap-3`}>
                                    {s.icon}
                                    <div>
                                        <p className="text-xs text-gray-500">{s.label}</p>
                                        <p className="font-bold text-2xl">{s.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Subject Progress */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" /> {t("progress", language)}
                            </h3>
                            <div className="space-y-3">
                                {subjectsData.map((sub) => (
                                    <div key={sub.id} className="flex items-center gap-3">
                                        <span className="text-xl w-8">{sub.icon}</span>
                                        <span className="font-bold text-sm w-24">{sub.name[language]}</span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-3">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${progress[sub.id]}%` }}
                                                transition={{ duration: 1, delay: 0.3 }}
                                                className={`h-3 rounded-full bg-gradient-to-r ${sub.gradient}`} />
                                        </div>
                                        <span className="text-sm font-bold text-gray-500 w-10">{progress[sub.id]}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-fun-purple" /> {t("badges", language)}
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                {allBadges.map((b) => {
                                    const earned = badges.some((eb) => eb.id === b.id);
                                    return (
                                        <div key={b.id} className={`text-center p-3 rounded-xl ${earned ? "bg-fun-purple/10" : "bg-gray-50 opacity-50"}`}>
                                            <span className="text-3xl">{b.icon}</span>
                                            <p className="text-xs font-bold mt-1">{b.name}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* TEACHER DASHBOARD */}
                {tab === "teacher" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { icon: <Users className="w-6 h-6 text-primary" />, label: "Total Students", value: "32", bg: "bg-primary/10" },
                                { icon: <Target className="w-6 h-6 text-success" />, label: "Avg. Completion", value: "68%", bg: "bg-success/10" },
                                { icon: <BarChart3 className="w-6 h-6 text-fun-purple" />, label: "Active Today", value: "24", bg: "bg-fun-purple/10" },
                            ].map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className={`${s.bg} rounded-2xl p-5 flex items-center gap-3`}>
                                    {s.icon}
                                    <div>
                                        <p className="text-xs text-gray-500">{s.label}</p>
                                        <p className="font-bold text-2xl">{s.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Class Performance */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="font-poppins font-bold text-lg mb-4">📊 Class Performance by Subject</h3>
                            <div className="space-y-3">
                                {subjectsData.map((sub) => {
                                    const avg = Math.floor(Math.random() * 40 + 50);
                                    return (
                                        <div key={sub.id} className="flex items-center gap-3">
                                            <span className="text-xl w-8">{sub.icon}</span>
                                            <span className="font-bold text-sm w-28">{sub.name[language]}</span>
                                            <div className="flex-1 bg-gray-100 rounded-full h-3">
                                                <div className={`h-3 rounded-full bg-gradient-to-r ${sub.gradient}`} style={{ width: `${avg}%` }} />
                                            </div>
                                            <span className="text-sm font-bold w-10">{avg}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Learning Gaps */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="font-poppins font-bold text-lg mb-4">⚠️ Learning Gap Analysis</h3>
                            <div className="space-y-2">
                                {[
                                    { topic: "Fractions", students: 8, severity: "high" },
                                    { topic: "Geometry", students: 5, severity: "medium" },
                                    { topic: "Hindi Grammar", students: 12, severity: "high" },
                                    { topic: "Photosynthesis", students: 3, severity: "low" },
                                ].map((gap, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <span className="font-bold text-sm">{gap.topic}</span>
                                        <span className="text-xs text-gray-500">{gap.students} students struggling</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${gap.severity === "high" ? "bg-fun-red/10 text-fun-red" : gap.severity === "medium" ? "bg-warning/10 text-yellow-700" : "bg-success/10 text-success"}`}>
                                            {gap.severity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* PARENT DASHBOARD */}
                {tab === "parent" && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-primary/10 to-fun-purple/10 rounded-2xl p-6">
                            <h3 className="font-poppins font-bold text-lg mb-2">👋 {userName}&apos;s Weekly Report</h3>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">{completedLessons.length}</p>
                                    <p className="text-xs text-gray-500">Lessons Done</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-success">{stars}</p>
                                    <p className="text-xs text-gray-500">Stars Earned</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-fun-purple">{Math.round(totalProgress)}%</p>
                                    <p className="text-xs text-gray-500">Overall Progress</p>
                                </div>
                            </div>
                        </div>

                        {/* Subject Insights */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="font-poppins font-bold text-lg mb-4">📈 Learning Insights</h3>
                            <div className="space-y-3">
                                {subjectsData.map((sub) => (
                                    <div key={sub.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <span className="text-2xl">{sub.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm">{sub.name[language]}</p>
                                            <div className="bg-gray-200 rounded-full h-2 mt-1">
                                                <div className={`h-2 rounded-full bg-gradient-to-r ${sub.gradient}`} style={{ width: `${progress[sub.id]}%` }} />
                                            </div>
                                        </div>
                                        <span className="text-sm font-bold">{progress[sub.id]}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="font-poppins font-bold text-lg mb-4">💡 Recommended Practice</h3>
                            <div className="space-y-2">
                                {[
                                    { subject: "🔢 Math", topic: "Practice fractions with real objects at home" },
                                    { subject: "📖 English", topic: "Read a short story together every day" },
                                    { subject: "🔬 Science", topic: "Observe plants in the garden and discuss" },
                                ].map((rec, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-primary/5 rounded-xl">
                                        <span className="text-xl">{rec.subject.split(" ")[0]}</span>
                                        <p className="text-sm">{rec.topic}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
