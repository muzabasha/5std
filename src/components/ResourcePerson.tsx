"use client";
import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";
import {
    GraduationCap, BookOpen, Award, Globe, MapPin,
    Briefcase, FileText, Users, Lightbulb, ExternalLink
} from "lucide-react";

const publications = [
    "Text Analytics and Machine Learning algorithms in SCI/Scopus journals",
    "Blockchain Technology applications in education and healthcare",
    "Artificial Intelligence for smart learning systems",
    "Data Science and Deep Learning research papers",
    "Editor of 4+ academic textbooks (IGI Global, Springer)",
];

const expertise = [
    { icon: "🤖", label: "Artificial Intelligence & Machine Learning" },
    { icon: "📊", label: "Data Science & Text Analytics" },
    { icon: "⛓️", label: "Blockchain Technology" },
    { icon: "🧠", label: "Deep Learning & NLP" },
    { icon: "💻", label: "Full-Stack Development" },
    { icon: "📱", label: "Educational Technology" },
];

const achievements = [
    { icon: "📝", text: "40+ research articles in SCI & Scopus indexed journals" },
    { icon: "📚", text: "Editor of 4+ academic textbooks" },
    { icon: "🎓", text: "Ph.D. in Computer Science" },
    { icon: "🏫", text: "Distinguished Professor at REVA University, Bangalore" },
    { icon: "🌐", text: "International conference speaker & session chair" },
    { icon: "🏆", text: "Resource Person for CBSE curriculum development" },
];

export default function ResourcePerson() {
    const { language } = useAppStore();

    const title = language === "hi" ? "संसाधन व्यक्ति" : language === "kn" ? "ಸಂಪನ್ಮೂಲ ವ್ಯಕ್ತಿ" : "Resource Person";
    const subtitle = language === "hi"
        ? "इस शैक्षिक मंच के पीछे के विशेषज्ञ से मिलें"
        : language === "kn"
            ? "ಈ ಶೈಕ್ಷಣಿಕ ವೇದಿಕೆಯ ಹಿಂದಿನ ತಜ್ಞರನ್ನು ಭೇಟಿ ಮಾಡಿ"
            : "Meet the expert behind this educational platform";

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Hero Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-primary via-blue-600 to-fun-purple rounded-3xl p-8 text-white relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-16 -mb-16" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-6xl shadow-xl border-4 border-white/30">
                        👨‍🏫
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-white/70 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
                        <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-1">
                            Dr. Syed Muzamil Basha
                        </h2>
                        <p className="text-white/80 text-lg font-nunito">
                            Distinguished Professor & Researcher
                        </p>
                        <p className="text-white/60 text-sm mt-1">{subtitle}</p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                            <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full text-sm">
                                <MapPin className="w-3 h-3" /> REVA University, Bangalore
                            </span>
                            <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full text-sm">
                                <GraduationCap className="w-3 h-3" /> Ph.D. Computer Science
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-poppins font-bold text-lg mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    {language === "hi" ? "परिचय" : language === "kn" ? "ಪರಿಚಯ" : "About"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    {language === "hi"
                        ? "डॉ. सैयद मुज़मिल बाशा बेंगलुरु के रेवा विश्वविद्यालय में एक प्रतिष्ठित प्रोफेसर हैं। उन्होंने VIT वेल्लोर से कंप्यूटर साइंस में स्नातकोत्तर और पीएचडी की उपाधि प्राप्त की है। उनके पास शिक्षण और शोध का व्यापक अनुभव है, जिसमें 40+ शोध लेख प्रतिष्ठित SCI और Scopus अनुक्रमित पत्रिकाओं में प्रकाशित हैं। वे AI, मशीन लर्निंग, ब्लॉकचेन और शैक्षिक प्रौद्योगिकी के विशेषज्ञ हैं।"
                        : language === "kn"
                            ? "ಡಾ. ಸೈಯದ್ ಮುಜಮಿಲ್ ಬಾಷಾ ಬೆಂಗಳೂರಿನ ರೇವಾ ವಿಶ್ವವಿದ್ಯಾಲಯದಲ್ಲಿ ಪ್ರತಿಷ್ಠಿತ ಪ್ರಾಧ್ಯಾಪಕರಾಗಿದ್ದಾರೆ. ಅವರು VIT ವೆಲ್ಲೂರಿನಿಂದ ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್‌ನಲ್ಲಿ ಸ್ನಾತಕೋತ್ತರ ಮತ್ತು ಪಿಎಚ್‌ಡಿ ಪಡೆದಿದ್ದಾರೆ. ಅವರು 40+ ಸಂಶೋಧನಾ ಲೇಖನಗಳನ್ನು SCI ಮತ್ತು Scopus ಸೂಚ್ಯಂಕ ಪತ್ರಿಕೆಗಳಲ್ಲಿ ಪ್ರಕಟಿಸಿದ್ದಾರೆ."
                            : "Dr. Syed Muzamil Basha is a Distinguished Professor at REVA University, Bangalore, Karnataka, India. He completed his postgraduate degree in Computer Science from VIT Vellore in 2011 and earned his Ph.D. in Computer Science. With extensive teaching and full-time research experience, he has published 40+ research articles in reputed SCI and Scopus indexed journals. He is the editor of 4+ academic textbooks and specializes in AI, Machine Learning, Blockchain Technology, and Educational Technology."}
                </p>
            </motion.div>

            {/* Expertise Areas */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warning" />
                    {language === "hi" ? "विशेषज्ञता क्षेत्र" : language === "kn" ? "ಪರಿಣತಿ ಕ್ಷೇತ್ರಗಳು" : "Areas of Expertise"}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {expertise.map((e, i) => (
                        <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="bg-gradient-to-br from-primary/5 to-fun-purple/5 rounded-xl p-3 flex items-center gap-2">
                            <span className="text-2xl">{e.icon}</span>
                            <span className="font-bold text-sm text-gray-700">{e.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Achievements & Publications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-fun-purple" />
                        {language === "hi" ? "उपलब्धियाँ" : language === "kn" ? "ಸಾಧನೆಗಳು" : "Achievements"}
                    </h3>
                    <div className="space-y-3">
                        {achievements.map((a, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="text-lg mt-0.5">{a.icon}</span>
                                <p className="text-sm text-gray-600">{a.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-success" />
                        {language === "hi" ? "प्रकाशन और शोध" : language === "kn" ? "ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ಸಂಶೋಧನೆ" : "Publications & Research"}
                    </h3>
                    <div className="space-y-3">
                        {publications.map((p, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <p className="text-sm text-gray-600">{p}</p>
                            </div>
                        ))}
                    </div>
                    <a href="https://www.igi-global.com/affiliate/syed-muzamil-basha/463546"
                        target="_blank" rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-bold hover:underline">
                        View Full Publication List <ExternalLink className="w-3 h-3" />
                    </a>
                </motion.div>
            </div>

            {/* Role in FunLearn Lab */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-success/10 via-primary/10 to-fun-purple/10 rounded-2xl p-6">
                <h3 className="font-poppins font-bold text-lg mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-success" />
                    {language === "hi" ? "फनलर्न लैब में भूमिका" : language === "kn" ? "ಫನ್‌ಲರ್ನ್ ಲ್ಯಾಬ್‌ನಲ್ಲಿ ಪಾತ್ರ" : "Role in FunLearn Lab"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {language === "hi"
                        ? "डॉ. बाशा इस प्लेटफ़ॉर्म के संसाधन व्यक्ति और शैक्षिक सलाहकार हैं। उन्होंने NEP 2020 और CBSE पाठ्यक्रम के अनुसार अनुभवात्मक शिक्षा ढांचे को डिज़ाइन किया है।"
                        : language === "kn"
                            ? "ಡಾ. ಬಾಷಾ ಈ ವೇದಿಕೆಯ ಸಂಪನ್ಮೂಲ ವ್ಯಕ್ತಿ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಸಲಹೆಗಾರರಾಗಿದ್ದಾರೆ. ಅವರು NEP 2020 ಮತ್ತು CBSE ಪಠ್ಯಕ್ರಮಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಅನುಭವಾತ್ಮಕ ಕಲಿಕೆ ಚೌಕಟ್ಟನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಿದ್ದಾರೆ."
                            : "Dr. Basha serves as the Resource Person and Educational Advisor for this platform. He designed the experiential learning framework aligned with NEP 2020 and CBSE curriculum standards, ensuring every lesson follows the Explore → Understand → Experiment → Practice → Apply pedagogy."}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { icon: "📐", label: language === "hi" ? "पाठ्यक्रम डिज़ाइन" : "Curriculum Design" },
                        { icon: "🎮", label: language === "hi" ? "गतिविधि डिज़ाइन" : "Activity Design" },
                        { icon: "📊", label: language === "hi" ? "मूल्यांकन ढांचा" : "Assessment Framework" },
                        { icon: "🌐", label: language === "hi" ? "बहुभाषी सामग्री" : "Multilingual Content" },
                    ].map((r, i) => (
                        <div key={i} className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <span className="text-2xl">{r.icon}</span>
                            <p className="text-xs font-bold mt-1 text-gray-700">{r.label}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Education Timeline */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    {language === "hi" ? "शैक्षिक पृष्ठभूमि" : language === "kn" ? "ಶೈಕ್ಷಣಿಕ ಹಿನ್ನೆಲೆ" : "Academic Background"}
                </h3>
                <div className="space-y-4">
                    {[
                        { year: "Ph.D.", title: "Doctor of Philosophy in Computer Science", place: "Specialization in Text Analytics & Machine Learning" },
                        { year: "M.Tech", title: "Master of Technology in Computer Science", place: "VIT University, Vellore (2011)" },
                        { year: "B.Tech", title: "Bachelor of Technology", place: "Computer Science & Engineering" },
                    ].map((edu, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-primary" />
                                </div>
                                {i < 2 && <div className="w-0.5 h-full bg-primary/20 mt-1" />}
                            </div>
                            <div className="pb-4">
                                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{edu.year}</span>
                                <p className="font-bold text-sm mt-1">{edu.title}</p>
                                <p className="text-xs text-gray-500">{edu.place}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Contact & Links */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="font-poppins font-bold text-lg mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-accent" />
                    {language === "hi" ? "संपर्क और लिंक" : language === "kn" ? "ಸಂಪರ್ಕ ಮತ್ತು ಲಿಂಕ್‌ಗಳು" : "Connect & Links"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                        { icon: <MapPin className="w-4 h-4" />, label: "REVA University, Bangalore, India", href: "" },
                        { icon: <BookOpen className="w-4 h-4" />, label: "IGI Global Author Profile", href: "https://www.igi-global.com/affiliate/syed-muzamil-basha/463546" },
                        { icon: <Globe className="w-4 h-4" />, label: "GitHub: muzabasha", href: "https://github.com/muzabasha" },
                    ].map((link, i) => (
                        <div key={i}>
                            {link.href ? (
                                <a href={link.href} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors text-sm">
                                    <span className="text-primary">{link.icon}</span>
                                    <span className="text-gray-700 font-medium">{link.label}</span>
                                    <ExternalLink className="w-3 h-3 text-gray-400 ml-auto" />
                                </a>
                            ) : (
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl text-sm">
                                    <span className="text-primary">{link.icon}</span>
                                    <span className="text-gray-700 font-medium">{link.label}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
