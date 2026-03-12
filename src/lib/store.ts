import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language, UserRole, Subject, Badge } from "./types";

interface AppState {
    language: Language;
    setLanguage: (lang: Language) => void;
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    userName: string;
    setUserName: (name: string) => void;
    grade: number;
    setGrade: (grade: number) => void;
    avatar: string;
    setAvatar: (avatar: string) => void;
    stars: number;
    coins: number;
    badges: Badge[];
    completedLessons: string[];
    progress: Record<Subject, number>;
    addStars: (n: number) => void;
    addCoins: (n: number) => void;
    addBadge: (badge: Badge) => void;
    completeLesson: (lessonId: string) => void;
    updateProgress: (subject: Subject, value: number) => void;
    voiceEnabled: boolean;
    toggleVoice: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            language: "en",
            setLanguage: (lang) => set({ language: lang }),
            userRole: "student",
            setUserRole: (role) => set({ userRole: role }),
            userName: "Sadiya",
            setUserName: (name) => set({ userName: name }),
            grade: 5,
            setGrade: (grade) => set({ grade: grade }),
            avatar: "👧",
            setAvatar: (avatar) => set({ avatar: avatar }),
            stars: 0,
            coins: 0,
            badges: [],
            completedLessons: [],
            progress: { math: 0, english: 0, hindi: 0, kannada: 0, science: 0, social: 0 },
            addStars: (n) => set((s) => ({ stars: s.stars + n })),
            addCoins: (n) => set((s) => ({ coins: s.coins + n })),
            addBadge: (badge) => set((s) => ({ badges: [...s.badges, badge] })),
            completeLesson: (id) =>
                set((s) => ({
                    completedLessons: s.completedLessons.includes(id)
                        ? s.completedLessons
                        : [...s.completedLessons, id],
                })),
            updateProgress: (subject, value) =>
                set((s) => ({ progress: { ...s.progress, [subject]: value } })),
            voiceEnabled: true,
            toggleVoice: () => set((s) => ({ voiceEnabled: !s.voiceEnabled })),
        }),
        { name: "funlearn-store" }
    )
);
