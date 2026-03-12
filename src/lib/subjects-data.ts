import { Subject, Language } from "./types";

export interface SubjectInfo {
    id: Subject;
    name: Record<Language, string>;
    icon: string;
    color: string;
    gradient: string;
    topicCount: number;
    description: Record<Language, string>;
}

export const subjectsData: SubjectInfo[] = [
    {
        id: "math",
        name: { en: "Mathematics", hi: "गणित", kn: "ಗಣಿತ" },
        icon: "🔢",
        color: "bg-primary",
        gradient: "from-primary to-blue-600",
        topicCount: 10,
        description: {
            en: "Explore numbers, shapes, and patterns through fun activities!",
            hi: "मज़ेदार गतिविधियों से संख्याएँ, आकार और पैटर्न सीखें!",
            kn: "ಮಜಾ ಚಟುವಟಿಕೆಗಳ ಮೂಲಕ ಸಂಖ್ಯೆಗಳು, ಆಕಾರಗಳು ಮತ್ತು ಮಾದರಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ!",
        },
    },
    {
        id: "english",
        name: { en: "English", hi: "अंग्रेज़ी", kn: "ಇಂಗ್ಲಿಷ್" },
        icon: "📖",
        color: "bg-success",
        gradient: "from-success to-green-600",
        topicCount: 6,
        description: {
            en: "Build vocabulary, grammar, and reading skills with stories!",
            hi: "कहानियों से शब्दावली, व्याकरण और पठन कौशल बनाएँ!",
            kn: "ಕಥೆಗಳೊಂದಿಗೆ ಶಬ್ದಕೋಶ, ವ್ಯಾಕರಣ ಮತ್ತು ಓದುವ ಕೌಶಲ್ಯ ಬೆಳೆಸಿ!",
        },
    },
    {
        id: "hindi",
        name: { en: "Hindi", hi: "हिंदी", kn: "ಹಿಂದಿ" },
        icon: "🇮🇳",
        color: "bg-accent",
        gradient: "from-accent to-orange-600",
        topicCount: 5,
        description: {
            en: "Learn Hindi through interactive word and sentence building!",
            hi: "शब्द और वाक्य निर्माण से हिंदी सीखें!",
            kn: "ಸಂವಾದಾತ್ಮಕ ಪದ ಮತ್ತು ವಾಕ್ಯ ನಿರ್ಮಾಣದ ಮೂಲಕ ಹಿಂದಿ ಕಲಿಯಿರಿ!",
        },
    },
    {
        id: "kannada",
        name: { en: "Kannada", hi: "कन्नड़", kn: "ಕನ್ನಡ" },
        icon: "🏛️",
        color: "bg-fun-purple",
        gradient: "from-fun-purple to-purple-700",
        topicCount: 5,
        description: {
            en: "Discover Kannada through letters, words, and stories!",
            hi: "अक्षरों, शब्दों और कहानियों से कन्नड़ सीखें!",
            kn: "ಅಕ್ಷರಗಳು, ಪದಗಳು ಮತ್ತು ಕಥೆಗಳ ಮೂಲಕ ಕನ್ನಡ ಅನ್ವೇಷಿಸಿ!",
        },
    },
    {
        id: "science",
        name: { en: "Science", hi: "विज्ञान", kn: "ವಿಜ್ಞಾನ" },
        icon: "🔬",
        color: "bg-fun-teal",
        gradient: "from-fun-teal to-teal-600",
        topicCount: 7,
        description: {
            en: "Experiment with the wonders of nature and the human body!",
            hi: "प्रकृति और मानव शरीर के चमत्कारों का प्रयोग करें!",
            kn: "ಪ್ರಕೃತಿ ಮತ್ತು ಮಾನವ ದೇಹದ ಅದ್ಭುತಗಳೊಂದಿಗೆ ಪ್ರಯೋಗ ಮಾಡಿ!",
        },
    },
    {
        id: "social",
        name: { en: "Social Studies", hi: "सामाजिक अध्ययन", kn: "ಸಮಾಜ ಅಧ್ಯಯನ" },
        icon: "🌍",
        color: "bg-fun-pink",
        gradient: "from-fun-pink to-pink-600",
        topicCount: 5,
        description: {
            en: "Explore maps, history, and the world around you!",
            hi: "नक्शे, इतिहास और अपने आसपास की दुनिया का अन्वेषण करें!",
            kn: "ನಕ್ಷೆಗಳು, ಇತಿಹಾಸ ಮತ್ತು ನಿಮ್ಮ ಸುತ್ತಲಿನ ಜಗತ್ತನ್ನು ಅನ್ವೇಷಿಸಿ!",
        },
    },
];
