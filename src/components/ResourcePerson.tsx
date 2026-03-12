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
        <div className="max-w-5xl mx-auto py-12 px-2">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 premium-shadow"
            >
                <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-primary p-12 text-white text-center relative overflow-hidden">
                    {/* Background Light Orbs */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 blur-3xl animate-pulse-slow" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full -ml-32 -mb-32 blur-3xl" />
                    
                    <motion.div 
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="inline-flex p-6 rounded-[2.5rem] bg-white/5 backdrop-blur-xl mb-8 border border-white/10 shadow-2xl"
                    >
                        <UserCircle className="w-20 h-20 text-white/90" />
                    </motion.div>
                    
                    <h2 className="font-poppins font-black text-5xl md:text-6xl mb-6 tracking-tighter">
                        {title}
                    </h2>
                    <p className="text-white/60 text-xl max-w-xl mx-auto font-medium leading-relaxed italic">
                        &quot;{subtitle}&quot;
                    </p>
                </div>

                <div className="p-12 flex flex-col items-center bg-[#fcfdfe]">
                    <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full max-w-xl"
                    >
                        <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between bg-white text-gray-900 p-8 rounded-[2rem] font-black text-2xl shadow-2xl border border-gray-100 hover:border-primary/20 transition-all duration-500"
                        >
                            <span className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                                </div>
                                Explore Profile
                            </span>
                            <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </a>
                    </motion.div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {[
                            { label: "Academic Profile", icon: "🎓", color: "bg-blue-50 text-blue-600" },
                            { label: "Research Work", icon: "🔬", color: "bg-emerald-50 text-emerald-600" },
                            { label: "Expert Insights", icon: "💡", color: "bg-amber-50 text-amber-600" }
                        ].map((item, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-[2rem] text-center border border-gray-100 shadow-sm"
                            >
                                <span className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-inner`}>
                                    {item.icon}
                                </span>
                                <span className="font-black text-sm text-gray-800 uppercase tracking-widest">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 w-full text-center">
                        <p className="text-gray-400 text-xs flex items-center justify-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Secure Link: <span className="font-medium text-gray-500">{linkUrl}</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

