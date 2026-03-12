"use client";
import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, UserCircle, ArrowRight } from "lucide-react";

export default function ResourcePerson() {
    const { language } = useAppStore();

    const title = language === "hi" ? "संसाधन व्यक्ति" : language === "kn" ? "ಸಂಪನ್ಮೂಲ ವ್ಯಕ್ತಿ" : "Resource Person";
    const subtitle = language === "hi"
        ? "आधिकारिक प्रोफाइल पर जाने के लिए नीचे दिए गए लिंक पर क्लिक करें"
        : language === "kn"
            ? "ಅಧಿಕೃತ ಪ್ರೊಫೈಲ್‌ಗೆ ಭೇಟಿ ನೀಡಲು ಕೆಳಗಿನ ಲಿಂಕ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ"
            : "Click the link below to visit the official Resource Person profile";

    const linkUrl = "https://scholar-sparkle-web.lovable.app/";

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
            >
                <div className="bg-gradient-to-br from-primary via-blue-600 to-fun-purple p-10 text-white text-center relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-3xl" />
                    
                    <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="inline-flex p-4 rounded-3xl bg-white/20 backdrop-blur-md mb-6 border border-white/30"
                    >
                        <UserCircle className="w-16 h-16" />
                    </motion.div>
                    
                    <h2 className="font-poppins font-bold text-4xl md:text-5xl mb-4 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-white/80 text-lg max-w-lg mx-auto font-nunito leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="p-10 flex flex-col items-center">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full max-w-md"
                    >
                        <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between bg-primary text-white p-6 rounded-2xl font-bold text-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                        >
                            <span className="flex items-center gap-3">
                                <Sparkles className="w-6 h-6 animate-pulse" />
                                Visit Official Profile
                            </span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    <p className="mt-8 text-gray-400 text-sm flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Link: {linkUrl}
                    </p>
                    
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {[
                            { label: "Academic Profile", icon: "🎓" },
                            { label: "Research Work", icon: "🔬" },
                            { label: "Expert Insights", icon: "💡" }
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
                                <span className="text-2xl mb-2 block">{item.icon}</span>
                                <span className="text-bold text-sm text-gray-600">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
