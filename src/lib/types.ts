export type Language = "en" | "hi" | "kn";
export type UserRole = "student" | "teacher" | "parent";
export type Subject = "math" | "english" | "hindi" | "kannada" | "science" | "social";

export interface User {
    id: string;
    name: string;
    role: UserRole;
    language: Language;
    grade: number;
    avatar: string;
    stars: number;
    coins: number;
    badges: Badge[];
    completedLessons: string[];
    progress: Record<Subject, number>;
}

export interface Badge {
    id: string;
    name: string;
    icon: string;
    description: string;
    earnedAt?: string;
}

export interface Lesson {
    id: string;
    subject: Subject;
    title: Record<Language, string>;
    description: Record<Language, string>;
    icon: string;
    steps: LessonStep[];
    difficulty: 1 | 2 | 3;
}

export interface LessonStep {
    type: "story" | "concept" | "activity" | "game" | "quiz" | "realworld";
    title: Record<Language, string>;
    content: Record<Language, string>;
}

export interface QuizQuestion {
    id: string;
    question: Record<Language, string>;
    options: Record<Language, string[]>;
    correctIndex: number;
    explanation: Record<Language, string>;
}

export interface SubjectModule {
    id: Subject;
    name: Record<Language, string>;
    icon: string;
    color: string;
    topics: Topic[];
}

export interface Topic {
    id: string;
    name: Record<Language, string>;
    description: Record<Language, string>;
    icon: string;
    lessons: Lesson[];
}
