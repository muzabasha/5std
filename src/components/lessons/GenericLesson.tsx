"use client";
import { useAppStore } from "@/lib/store";
import { motion } from "framer-motion";
import { BookOpen, Gamepad2, FlaskConical } from "lucide-react";

export default function GenericLesson() {
    const { language } = useAppStore();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-lg mx-auto">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="font-poppins font-bold text-xl mb-2">
                {language === "hi" ? "जल्द आ रहा है!" : language === "kn" ? "ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ!" : "Coming Soon!"}
            </h3>
            <p className="text-gray-500 mb-6">
                {language === "hi"
                    ? "यह पाठ अभी तैयार हो रहा है। कृपया अन्य विषय आज़माएँ!"
                    : language === "kn"
                        ? "ಈ ಪಾಠ ಸಿದ್ಧವಾಗುತ್ತಿದೆ. ದಯವಿಟ್ಟು ಇತರ ವಿಷಯಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ!"
                        : "This lesson is being prepared. Try other topics in the meantime!"}
            </p>
            <div className="flex justify-center gap-4">
                {[
                    { icon: <BookOpen className="w-6 h-6" />, label: "Stories", color: "text-primary" },
                    { icon: <Gamepad2 className="w-6 h-6" />, label: "Games", color: "text-success" },
                    { icon: <FlaskConical className="w-6 h-6" />, label: "Experiments", color: "text-fun-purple" },
                ].map((f, i) => (
                    <div key={i} className={`${f.color} flex flex-col items-center gap-1`}>
                        {f.icon}
                        <span className="text-xs font-bold">{f.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
