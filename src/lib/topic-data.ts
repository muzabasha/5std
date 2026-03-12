import { Subject, Language } from "./types";

export interface TopicInfo {
    id: string;
    name: Record<Language, string>;
    description: Record<Language, string>;
    lessonCount: number;
}

const mathTopics: TopicInfo[] = [
    { id: "large-numbers", name: { en: "Large Numbers", hi: "बड़ी संख्याएँ", kn: "ದೊಡ್ಡ ಸಂಖ್ಯೆಗಳು" }, description: { en: "Explore numbers up to lakhs and crores", hi: "लाखों और करोड़ों तक की संख्याएँ", kn: "ಲಕ್ಷ ಮತ್ತು ಕೋಟಿಗಳವರೆಗೆ ಸಂಖ್ಯೆಗಳು" }, lessonCount: 3 },
    { id: "factors-multiples", name: { en: "Factors & Multiples", hi: "गुणनखंड और गुणज", kn: "ಅಪವರ್ತನಗಳು ಮತ್ತು ಅಪವರ್ತ್ಯಗಳು" }, description: { en: "Find factors and multiples of numbers", hi: "संख्याओं के गुणनखंड और गुणज खोजें", kn: "ಸಂಖ್ಯೆಗಳ ಅಪವರ್ತನಗಳು ಮತ್ತು ಅಪವರ್ತ್ಯಗಳನ್ನು ಹುಡುಕಿ" }, lessonCount: 3 },
    { id: "fractions", name: { en: "Fractions", hi: "भिन्न", kn: "ಭಿನ್ನರಾಶಿಗಳು" }, description: { en: "Learn fractions with pizza and shapes", hi: "पिज़्ज़ा और आकृतियों से भिन्न सीखें", kn: "ಪಿಜ್ಜಾ ಮತ್ತು ಆಕಾರಗಳೊಂದಿಗೆ ಭಿನ್ನರಾಶಿ ಕಲಿಯಿರಿ" }, lessonCount: 4 },
    { id: "decimals", name: { en: "Decimals", hi: "दशमलव", kn: "ದಶಮಾಂಶಗಳು" }, description: { en: "Understand decimals on a number line", hi: "संख्या रेखा पर दशमलव समझें", kn: "ಸಂಖ್ಯಾ ರೇಖೆಯಲ್ಲಿ ದಶಮಾಂಶಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ" }, lessonCount: 3 },
    { id: "geometry", name: { en: "Geometry", hi: "ज्यामिति", kn: "ರೇಖಾಗಣಿತ" }, description: { en: "Explore shapes, angles, and patterns", hi: "आकृतियाँ, कोण और पैटर्न", kn: "ಆಕಾರಗಳು, ಕೋನಗಳು ಮತ್ತು ಮಾದರಿಗಳು" }, lessonCount: 4 },
    { id: "perimeter-area", name: { en: "Perimeter & Area", hi: "परिमाप और क्षेत्रफल", kn: "ಪರಿಧಿ ಮತ್ತು ವಿಸ್ತೀರ್ಣ" }, description: { en: "Measure perimeter and area of shapes", hi: "आकृतियों का परिमाप और क्षेत्रफल मापें", kn: "ಆಕಾರಗಳ ಪರಿಧಿ ಮತ್ತು ವಿಸ್ತೀರ್ಣ ಅಳೆಯಿರಿ" }, lessonCount: 3 },
    { id: "volume", name: { en: "Volume Basics", hi: "आयतन", kn: "ಘನಫಲ" }, description: { en: "Learn about volume of 3D shapes", hi: "3D आकृतियों का आयतन सीखें", kn: "3D ಆಕಾರಗಳ ಘನಫಲ ಕಲಿಯಿರಿ" }, lessonCount: 2 },
    { id: "measurement", name: { en: "Measurement", hi: "मापन", kn: "ಅಳತೆ" }, description: { en: "Measure length, weight, and capacity", hi: "लंबाई, वजन और क्षमता मापें", kn: "ಉದ್ದ, ತೂಕ ಮತ್ತು ಸಾಮರ್ಥ್ಯ ಅಳೆಯಿರಿ" }, lessonCount: 3 },
    { id: "time-money", name: { en: "Time & Money", hi: "समय और पैसा", kn: "ಸಮಯ ಮತ್ತು ಹಣ" }, description: { en: "Tell time and handle money", hi: "समय बताएँ और पैसे का हिसाब करें", kn: "ಸಮಯ ಹೇಳಿ ಮತ್ತು ಹಣ ನಿರ್ವಹಿಸಿ" }, lessonCount: 3 },
    { id: "data-handling", name: { en: "Data Handling", hi: "डेटा प्रबंधन", kn: "ದತ್ತಾಂಶ ನಿರ್ವಹಣೆ" }, description: { en: "Create and read charts and graphs", hi: "चार्ट और ग्राफ बनाएँ और पढ़ें", kn: "ಚಾರ್ಟ್ ಮತ್ತು ಗ್ರಾಫ್ ರಚಿಸಿ ಮತ್ತು ಓದಿ" }, lessonCount: 2 },
];

const englishTopics: TopicInfo[] = [
    { id: "vocabulary", name: { en: "Vocabulary Development", hi: "शब्दावली विकास", kn: "ಶಬ್ದಕೋಶ ಅಭಿವೃದ್ಧಿ" }, description: { en: "Build your word power with fun activities", hi: "मज़ेदार गतिविधियों से शब्द शक्ति बढ़ाएँ", kn: "ಮಜಾ ಚಟುವಟಿಕೆಗಳೊಂದಿಗೆ ಪದ ಶಕ್ತಿ ಬೆಳೆಸಿ" }, lessonCount: 3 },
    { id: "grammar", name: { en: "Grammar Rules", hi: "व्याकरण नियम", kn: "ವ್ಯಾಕರಣ ನಿಯಮಗಳು" }, description: { en: "Master grammar through interactive exercises", hi: "इंटरैक्टिव अभ्यास से व्याकरण सीखें", kn: "ಸಂವಾದಾತ್ಮಕ ಅಭ್ಯಾಸಗಳ ಮೂಲಕ ವ್ಯಾಕರಣ ಕಲಿಯಿರಿ" }, lessonCount: 4 },
    { id: "sentences", name: { en: "Sentence Formation", hi: "वाक्य रचना", kn: "ವಾಕ್ಯ ರಚನೆ" }, description: { en: "Build sentences by dragging words", hi: "शब्दों को खींचकर वाक्य बनाएँ", kn: "ಪದಗಳನ್ನು ಎಳೆದು ವಾಕ್ಯ ರಚಿಸಿ" }, lessonCount: 3 },
    { id: "paragraphs", name: { en: "Paragraph Writing", hi: "अनुच्छेद लेखन", kn: "ಅನುಚ್ಛೇದ ಬರವಣಿಗೆ" }, description: { en: "Learn to write clear paragraphs", hi: "स्पष्ट अनुच्छेद लिखना सीखें", kn: "ಸ್ಪಷ್ಟ ಅನುಚ್ಛೇದಗಳನ್ನು ಬರೆಯಲು ಕಲಿಯಿರಿ" }, lessonCount: 2 },
    { id: "reading", name: { en: "Reading Comprehension", hi: "पठन और समझ", kn: "ಓದು ಅರ್ಥ ಗ್ರಹಿಕೆ" }, description: { en: "Read stories and answer questions", hi: "कहानियाँ पढ़ें और प्रश्नों के उत्तर दें", kn: "ಕಥೆಗಳನ್ನು ಓದಿ ಮತ್ತು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ" }, lessonCount: 3 },
    { id: "story-sequencing", name: { en: "Story Sequencing", hi: "कहानी क्रम", kn: "ಕಥೆ ಅನುಕ್ರಮ" }, description: { en: "Arrange story events in order", hi: "कहानी की घटनाओं को क्रम में लगाएँ", kn: "ಕಥೆಯ ಘಟನೆಗಳನ್ನು ಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಿ" }, lessonCount: 2 },
];

const hindiTopics: TopicInfo[] = [
    { id: "swar-vyanjan", name: { en: "Vowels & Consonants", hi: "स्वर और व्यंजन", kn: "ಸ್ವರ ಮತ್ತು ವ್ಯಂಜನ" }, description: { en: "Revise Hindi vowels and consonants", hi: "हिंदी स्वर और व्यंजन की पुनरावृत्ति", kn: "ಹಿಂದಿ ಸ್ವರ ಮತ್ತು ವ್ಯಂಜನಗಳ ಪುನರಾವರ್ತನೆ" }, lessonCount: 3 },
    { id: "shabd-nirman", name: { en: "Word Formation", hi: "शब्द निर्माण", kn: "ಪದ ರಚನೆ" }, description: { en: "Build Hindi words from letters", hi: "अक्षरों से हिंदी शब्द बनाएँ", kn: "ಅಕ್ಷರಗಳಿಂದ ಹಿಂದಿ ಪದಗಳನ್ನು ರಚಿಸಿ" }, lessonCount: 3 },
    { id: "vakya-rachna", name: { en: "Sentence Formation", hi: "वाक्य रचना", kn: "ವಾಕ್ಯ ರಚನೆ" }, description: { en: "Form Hindi sentences", hi: "हिंदी वाक्य बनाएँ", kn: "ಹಿಂದಿ ವಾಕ್ಯಗಳನ್ನು ರಚಿಸಿ" }, lessonCount: 3 },
    { id: "anuchhed-lekhan", name: { en: "Paragraph Writing", hi: "अनुच्छेद लेखन", kn: "ಅನುಚ್ಛೇದ ಬರವಣಿಗೆ" }, description: { en: "Write Hindi paragraphs", hi: "हिंदी अनुच्छेद लिखें", kn: "ಹಿಂದಿ ಅನುಚ್ಛೇದ ಬರೆಯಿರಿ" }, lessonCount: 2 },
    { id: "pathan-samajh", name: { en: "Reading & Comprehension", hi: "पठन और समझ", kn: "ಓದು ಮತ್ತು ಅರ್ಥ ಗ್ರಹಿಕೆ" }, description: { en: "Read Hindi passages and understand", hi: "हिंदी गद्यांश पढ़ें और समझें", kn: "ಹಿಂದಿ ಗದ್ಯಭಾಗ ಓದಿ ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ" }, lessonCount: 3 },
];

const kannadaTopics: TopicInfo[] = [
    { id: "swaragalu-vyanjanagalu", name: { en: "Vowels & Consonants", hi: "स्वर और व्यंजन", kn: "ಸ್ವರಗಳು ಮತ್ತು ವ್ಯಂಜನಗಳು" }, description: { en: "Learn Kannada vowels and consonants", hi: "कन्नड़ स्वर और व्यंजन सीखें", kn: "ಕನ್ನಡ ಸ್ವರಗಳು ಮತ್ತು ವ್ಯಂಜನಗಳನ್ನು ಕಲಿಯಿರಿ" }, lessonCount: 3 },
    { id: "pada-rachane", name: { en: "Word Formation", hi: "शब्द रचना", kn: "ಪದ ರಚನೆ" }, description: { en: "Build Kannada words", hi: "कन्नड़ शब्द बनाएँ", kn: "ಕನ್ನಡ ಪದಗಳನ್ನು ರಚಿಸಿ" }, lessonCount: 3 },
    { id: "vakya-rachane", name: { en: "Sentence Formation", hi: "वाक्य रचना", kn: "ವಾಕ್ಯ ರಚನೆ" }, description: { en: "Form Kannada sentences", hi: "कन्नड़ वाक्य बनाएँ", kn: "ಕನ್ನಡ ವಾಕ್ಯಗಳನ್ನು ರಚಿಸಿ" }, lessonCount: 3 },
    { id: "anuccheda-odu", name: { en: "Paragraph Reading", hi: "अनुच्छेद पठन", kn: "ಅನುಚ್ಛೇದ ಓದು" }, description: { en: "Read Kannada paragraphs", hi: "कन्नड़ अनुच्छेद पढ़ें", kn: "ಕನ್ನಡ ಅನುಚ್ಛೇದ ಓದಿ" }, lessonCount: 2 },
    { id: "artha-grahike", name: { en: "Comprehension", hi: "समझ", kn: "ಅರ್ಥ ಗ್ರಹಿಕೆ" }, description: { en: "Understand Kannada stories", hi: "कन्नड़ कहानियाँ समझें", kn: "ಕನ್ನಡ ಕಥೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ" }, lessonCount: 3 },
];

const scienceTopics: TopicInfo[] = [
    { id: "human-body", name: { en: "Human Body Systems", hi: "मानव शरीर प्रणालियाँ", kn: "ಮಾನವ ದೇಹ ವ್ಯವಸ್ಥೆಗಳು" }, description: { en: "Explore the amazing human body", hi: "अद्भुत मानव शरीर का अन्वेषण करें", kn: "ಅದ್ಭುತ ಮಾನವ ದೇಹವನ್ನು ಅನ್ವೇಷಿಸಿ" }, lessonCount: 4 },
    { id: "plants", name: { en: "Plants & Photosynthesis", hi: "पौधे और प्रकाश संश्लेषण", kn: "ಸಸ್ಯಗಳು ಮತ್ತು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ" }, description: { en: "Watch plants grow and make food", hi: "पौधों को बढ़ते और भोजन बनाते देखें", kn: "ಸಸ್ಯಗಳು ಬೆಳೆಯುವುದನ್ನು ಮತ್ತು ಆಹಾರ ತಯಾರಿಸುವುದನ್ನು ನೋಡಿ" }, lessonCount: 3 },
    { id: "animals-habitats", name: { en: "Animals & Habitats", hi: "जानवर और आवास", kn: "ಪ್ರಾಣಿಗಳು ಮತ್ತು ಆವಾಸಸ್ಥಾನಗಳು" }, description: { en: "Discover where animals live", hi: "जानें जानवर कहाँ रहते हैं", kn: "ಪ್ರಾಣಿಗಳು ಎಲ್ಲಿ ವಾಸಿಸುತ್ತವೆ ಎಂದು ಕಂಡುಹಿಡಿಯಿರಿ" }, lessonCount: 3 },
    { id: "food-nutrition", name: { en: "Food & Nutrition", hi: "भोजन और पोषण", kn: "ಆಹಾರ ಮತ್ತು ಪೋಷಣೆ" }, description: { en: "Learn about healthy eating", hi: "स्वस्थ भोजन के बारे में जानें", kn: "ಆರೋಗ್ಯಕರ ಆಹಾರದ ಬಗ್ಗೆ ಕಲಿಯಿರಿ" }, lessonCount: 2 },
    { id: "matter-materials", name: { en: "Matter & Materials", hi: "पदार्थ और सामग्री", kn: "ವಸ್ತು ಮತ್ತು ಸಾಮಗ್ರಿಗಳು" }, description: { en: "Explore solids, liquids, and gases", hi: "ठोस, तरल और गैस का अन्वेषण करें", kn: "ಘನ, ದ್ರವ ಮತ್ತು ಅನಿಲಗಳನ್ನು ಅನ್ವೇಷಿಸಿ" }, lessonCount: 3 },
    { id: "force-energy", name: { en: "Force & Energy", hi: "बल और ऊर्जा", kn: "ಬಲ ಮತ್ತು ಶಕ್ತಿ" }, description: { en: "Understand push, pull, and energy", hi: "धक्का, खिंचाव और ऊर्जा समझें", kn: "ತಳ್ಳುವಿಕೆ, ಎಳೆಯುವಿಕೆ ಮತ್ತು ಶಕ್ತಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ" }, lessonCount: 3 },
    { id: "simple-machines", name: { en: "Simple Machines", hi: "सरल मशीनें", kn: "ಸರಳ ಯಂತ್ರಗಳು" }, description: { en: "Discover levers, pulleys, and more", hi: "लीवर, पुली और अन्य मशीनें", kn: "ಲಿವರ್, ಪುಲ್ಲಿ ಮತ್ತು ಇನ್ನಷ್ಟು ಕಂಡುಹಿಡಿಯಿರಿ" }, lessonCount: 2 },
];

const socialTopics: TopicInfo[] = [
    { id: "maps-directions", name: { en: "Maps & Directions", hi: "नक्शे और दिशाएँ", kn: "ನಕ್ಷೆಗಳು ಮತ್ತು ದಿಕ್ಕುಗಳು" }, description: { en: "Read maps and find directions", hi: "नक्शे पढ़ें और दिशाएँ खोजें", kn: "ನಕ್ಷೆಗಳನ್ನು ಓದಿ ಮತ್ತು ದಿಕ್ಕುಗಳನ್ನು ಹುಡುಕಿ" }, lessonCount: 3 },
    { id: "indian-geography", name: { en: "Indian Geography", hi: "भारत का भूगोल", kn: "ಭಾರತದ ಭೂಗೋಳ" }, description: { en: "Explore India's rivers, mountains, and states", hi: "भारत की नदियाँ, पहाड़ और राज्य", kn: "ಭಾರತದ ನದಿಗಳು, ಪರ್ವತಗಳು ಮತ್ತು ರಾಜ್ಯಗಳು" }, lessonCount: 4 },
    { id: "natural-resources", name: { en: "Natural Resources", hi: "प्राकृतिक संसाधन", kn: "ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳು" }, description: { en: "Learn about water, soil, and forests", hi: "पानी, मिट्टी और जंगलों के बारे में जानें", kn: "ನೀರು, ಮಣ್ಣು ಮತ್ತು ಕಾಡುಗಳ ಬಗ್ಗೆ ಕಲಿಯಿರಿ" }, lessonCount: 2 },
    { id: "indian-history", name: { en: "Indian History Basics", hi: "भारतीय इतिहास", kn: "ಭಾರತೀಯ ಇತಿಹಾಸ" }, description: { en: "Journey through India's past", hi: "भारत के अतीत की यात्रा", kn: "ಭಾರತದ ಹಿಂದಿನ ಪ್ರಯಾಣ" }, lessonCount: 3 },
    { id: "civics-community", name: { en: "Civics & Community", hi: "नागरिक शास्त्र और समुदाय", kn: "ನಾಗರಿಕ ಶಾಸ್ತ್ರ ಮತ್ತು ಸಮುದಾಯ" }, description: { en: "Understand community and governance", hi: "समुदाय और शासन को समझें", kn: "ಸಮುದಾಯ ಮತ್ತು ಆಡಳಿತವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ" }, lessonCount: 2 },
];

const topicMap: Record<Subject, TopicInfo[]> = {
    math: mathTopics,
    english: englishTopics,
    hindi: hindiTopics,
    kannada: kannadaTopics,
    science: scienceTopics,
    social: socialTopics,
};

export function getTopicsForSubject(subject: Subject): TopicInfo[] {
    return topicMap[subject] || [];
}
