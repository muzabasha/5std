import { Language } from "./types";

export interface LessonContent {
    story: { emoji: string; text: Record<Language, string> }[];
    concept: {
        title: Record<Language, string>;
        description: Record<Language, string>;
        points: Record<Language, string>[];
    };
    activity: {
        type: "quiz-mini" | "sort" | "facts" | "visual";
        data: (string | { label?: string; value?: string })[];
    };
    realWorld: { emoji: string; title: Record<Language, string>; desc: Record<Language, string> }[];
}

export const universalTopicContent: Record<string, LessonContent> = {
    "large-numbers": {
        story: [
            { emoji: "💰", text: { en: "The King has many gold coins in his vault.", hi: "राजा के पास उसकी तिजोरी में बहुत सारे सोने के सिक्के हैं।", kn: "ರಾಜನು ತನ್ನ ಖಜಾನೆಯಲ್ಲಿ ಅನೇಕ ಚಿನ್ನದ ನಾಣ್ಯಗಳನ್ನು ಹೊಂದಿದ್ದಾನೆ." } },
            { emoji: "📈", text: { en: "He wants to count them up to lakhs and crores!", hi: "वह उन्हें लाखों और करोड़ों तक गिनना चाहता है!", kn: "ಅವನು ಅವುಗಳನ್ನು ಲಕ್ಷ ಮತ್ತು ಕೋಟಿಗಳವರೆಗೆ ಎಣಿಸಲು ಬಯಸುತ್ತಾನೆ!" } },
        ],
        concept: {
            title: { en: "Understanding Large Numbers", hi: "बड़ी संख्याओं को समझना", kn: "ದೊಡ್ಡ ಸಂಖ್ಯೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು" },
            description: { en: "Large numbers help us measure distance, weight, and money in big amounts.", hi: "बड़ी संख्याएँ हमें बड़ी मात्रा में दूरी, वजन और धन मापने में मदद करती हैं।", kn: "ದೊಡ್ಡ ಸಂಖ್ಯೆಗಳು ದೂರ, ತೂಕ ಮತ್ತು ಹಣವನ್ನು ದೊಡ್ಡ ಮೊತ್ತದಲ್ಲಿ ಅಳೆಯಲು ನಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತವೆ." },
            points: [
                { en: "10 Lakhs = 1 Million", hi: "10 लाख = 1 मिलियन", kn: "10 ಲಕ್ಷ = 1 ಮಿಲಿಯನ್" },
                { en: "100 Lakhs = 1 Crore", hi: "100 लाख = 1 करोड़", kn: "100 ಲಕ್ಷ = 1 ಕೋಟಿ" },
            ]
        },
        activity: {
            type: "facts",
            data: [
                { label: "1,00,000", value: "One Lakh" },
                { label: "10,00,000", value: "Ten Lakhs" },
                { label: "1,00,00,000", value: "One Crore" },
            ]
        },
        realWorld: [
            { emoji: "🚀", title: { en: "Space Distance", hi: "अंतरिक्ष की दूरी", kn: "ಬಹ್ಯಾಕಾಶ ದೂರ" }, desc: { en: "Distance to Moon is about 3.8 Lakh km", hi: "चंद्रमा की दूरी लगभग 3.8 लाख किमी है", kn: "ಚಂದ್ರನಿಗೆ ಇರುವ ದೂರ ಸುಮಾರು 3.8 ಲಕ್ಷ ಕಿ.ಮೀ" } }
        ]
    },
    "factors-multiples": {
        story: [
            { emoji: "🧱", text: { en: "Builder Bob needs to arrange bricks in equal rows.", hi: "बिल्डर बॉब को ईंटों को समान पंक्तियों में व्यवस्थित करना है।", kn: "ಬಿಲ್ಡರ್ ಬಾಬ್ ಇಟ್ಟಿಗೆಗಳನ್ನು ಸಮಾನ ಸಾಲುಗಳಲ್ಲಿ ಜೋಡಿಸಬೇಕಾಗಿದೆ." } },
        ],
        concept: {
            title: { en: "Factors and Multiples", hi: "गुणनखंड और गुणज", kn: "ಅಪವರ್ತನಗಳು ಮತ್ತು ಅಪವರ್ತ್ಯಗಳು" },
            description: { en: "Factors are numbers that divide another number exactly. Multiples are what we get after multiplying.", hi: "गुणनखंड वे संख्याएँ हैं जो दूसरी संख्या को पूरी तरह से विभाजित करती हैं। गुणज वे हैं जो हमें गुणा करने के बाद मिलते हैं।", kn: "ಅಪವರ್ತನಗಳು ಎಂದರೆ ಮತ್ತೊಂದು ಸಂಖ್ಯೆಯನ್ನು ನಿಖರವಾಗಿ ಭಾಗಿಸುವ ಸಂಖ್ಯೆಗಳು. ಗುಣಾಕಾರದ ನಂತರ ನಮಗೆ ಸಿಗುವುದು ಅಪವರ್ತ್ಯಗಳು." },
            points: [
                { en: "Factors of 6: 1, 2, 3, 6", hi: "6 के गुणनखंड: 1, 2, 3, 6", kn: "6 ರ ಅಪವರ್ತನಗಳು: 1, 2, 3, 6" },
                { en: "Multiples of 5: 5, 10, 15...", hi: "5 के गुणज: 5, 10, 15...", kn: "5 ರ ಅಪವರ್ತ್ಯಗಳು: 5, 10, 15..." },
            ]
        },
        activity: { type: "facts", data: [{ label: "Multiples of 2", value: "2,4,6,8" }, { label: "Factors of 10", value: "1,2,5,10" }] },
        realWorld: [{ emoji: "📅", title: { en: "Scheduling", hi: "अनुसूची", kn: "ವೇಳಾಪಟ್ಟಿ" }, desc: { en: "Finding common times using multiples", hi: "गुणज का उपयोग करके सामान्य समय खोजना", kn: "ಅಪವರ್ತ್ಯಗಳನ್ನು ಬಳಸಿ ಸಾಮಾನ್ಯ ಸಮಯವನ್ನು ಕಂಡುಹಿಡಿಯುವುದು" } }]
    },
    "vocabulary": {
        story: [
            { emoji: "🕵️", text: { en: "Agent Sadiya is on a mission to find the 'Missing Words'!", hi: "एजेंट सादिया 'खोए हुए शब्दों' को खोजने के मिशन पर है!", kn: "ಏಜೆಂಟ್ ಸಾದಿಯಾ 'ಕಳೆದುಹೋದ ಪದಗಳನ್ನು' ಹುಡುಕುವ ಕಾರ್ಯಾಚರಣೆಯಲ್ಲಿದ್ದಾರೆ!" } },
        ],
        concept: {
            title: { en: "Building Word Power", hi: "शब्द शक्ति का निर्माण", kn: "ಪದ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸುವುದು" },
            description: { en: "Synonyms are words with similar meanings. Antonyms are opposites.", hi: "पर्यायवाची शब्द समान अर्थ वाले शब्द होते हैं। विलोम शब्द विपरीत होते हैं।", kn: "ಸಮಾನಾರ್ಥಕ ಪದಗಳು ಒಂದೇ ಅರ್ಥವನ್ನು ಹೊಂದಿರುವ ಪದಗಳಾಗಿವೆ. ವಿರುದ್ಧಾರ್ಥಕ ಪದಗಳು ವಿರುದ್ಧವಾಗಿವೆ." },
            points: [
                { en: "Happy = Joyful (Synonym)", hi: "खुश = हर्षित (पर्यायवाची)", kn: "ಸಂತೋಷ = ಹರ್ಷ (ಸಮಾನಾರ್ಥಕ)" },
                { en: "Big vs Small (Antonym)", hi: "बड़ा बनाम छोटा (विलोम)", kn: "ದೊಡ್ಡದು ವರ್ಸಸ್ ಸಣ್ಣದು (ವಿರುದ್ಧಾರ್ಥಕ)" },
            ]
        },
        activity: { type: "sort", data: ["Happy", "Joyful", "Sad", "Gloomy"] },
        realWorld: [{ emoji: "📚", title: { en: "Effective Writing", hi: "प्रभावी लेखन", kn: "ಪರಿಣಾಮಕಾರಿ ಬರವಣಿಗೆ" }, desc: { en: "Use better words to express feelings", hi: "भावनाओं को व्यक्त करने के लिए बेहतर शब्दों का प्रयोग करें", kn: "ಭಾವನೆಗಳನ್ನು ವ್ಯಕ್ತಪಡಿಸಲು ಉತ್ತಮ ಪದಗಳನ್ನು ಬಳಸಿ" } }]
    },
    "grammar": {
        story: [
            { emoji: "✍️", text: { en: "Grammar is the set of rules for our language.", hi: "व्याकरण हमारी भाषा के नियमों का समूह है।", kn: "ವ್ಯಾಕರಣವು ನಮ್ಮ ಭಾಷೆಯ ನಿಯಮಗಳ ಒಂದು ಗುಂಪಾಗಿದೆ." } },
        ],
        concept: {
            title: { en: "Mastering Grammar", hi: "व्याकरण में महारत", kn: "ವ್ಯಾಕರಣದಲ್ಲಿ ಪ್ರಾವೀಣ್ಯತೆ" },
            description: { en: "Nouns, Verbs, and Adjectives help us build strong sentences.", hi: "संज्ञा, क्रिया और विशेषण हमें मजबूत वाक्य बनाने में मदद करते हैं।", kn: "ನಾಮಪದಗಳು, ಕ್ರಿಯಾಪದಗಳು ಮತ್ತು ಗುಣವಿಶೇಷಣಗಳು ನಮಗೆ ಬಲವಾದ ವಾಕ್ಯಗಳನ್ನು ನಿರ್ಮಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ." },
            points: [
                { en: "Noun: Name of a person/place", hi: "संज्ञा: किसी व्यक्ति/स्थान का नाम", kn: "ನಾಮಪದ: ವ್ಯಕ್ತಿ/ಸ್ಥಳದ ಹೆಸರು" },
                { en: "Verb: Action words like run, play", hi: "क्रिया: दौड़ना, खेलना जैसे क्रिया शब्द", kn: "ಕ್ರಿಯಾಪದ: ಓಡು, ಆಡು ಮುಂತಾದ ಕ್ರಿಯಾ ಪದಗಳು" },
            ]
        },
        activity: { type: "sort", data: ["Apple", "Run", "Blue", "Delhi"] },
        realWorld: [{ emoji: "📩", title: { en: "Emails", hi: "ईमेल", kn: "ಇಮೇಲ್" }, desc: { en: "Writing clear messages to friends", hi: "दोस्तों को स्पष्ट संदेश लिखना", kn: "ಸ್ನೇಹಿತರಿಗೆ ಸ್ಪಷ್ಟ ಸಂದೇಶಗಳನ್ನು ಬರೆಯುವುದು" } }]
    },
    "human-body": {
        story: [
            { emoji: "🏃", text: { en: "Your body is a super machine that never stops!", hi: "आपका शरीर एक सुपर मशीन है जो कभी नहीं रुकती!", kn: "ನಿಮ್ಮ ದೇಹವು ಎಂದಿಗೂ ನಿಲ್ಲದ ಸೂಪರ್ ಯಂತ್ರವಾಗಿದೆ!" } },
        ],
        concept: {
            title: { en: "The Human Body", hi: "मानव शरीर", kn: "ಮಾನವ ದೇಹ" },
            description: { en: "Our body has many systems working together.", hi: "हमारे शरीर में कई प्रणालियाँ एक साथ काम कर रही हैं।", kn: "ನಮ್ಮ ದೇಹದಲ್ಲಿ ಅನೇಕ ವ್ಯವಸ್ಥೆಗಳು ಒಟ್ಟಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ." },
            points: [
                { en: "Heart pumps blood", hi: "दिल खून पंप करता है", kn: "ಹೃದಯವು ರಕ್ತವನ್ನು ಪಂಪ್ ಮಾಡುತ್ತದೆ" },
                { en: "Lungs help us breathe", hi: "फेफड़े हमें सांस लेने में मदद करते हैं", kn: "ಶ್ವಾಸಕೋಶಗಳು ನಮಗೆ ಉಸಿರಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ" },
            ]
        },
        activity: { type: "facts", data: [{ label: "Heart", value: "Pumps Blood" }, { label: "Brain", value: "Controls All" }] },
        realWorld: [{ emoji: "🍎", title: { en: "Staying Healthy", hi: "स्वस्थ रहना", kn: "ಆರೋಗ್ಯವಾಗಿರುವುದು" }, desc: { en: "Exercise and good food keep systems running", hi: "व्यायाम और अच्छा खाना प्रणालियों को चालू रखता है", kn: "ವ್ಯಾಯಾಮ ಮತ್ತು ಉತ್ತಮ ಆಹಾರ ವ್ಯವಸ್ಥೆಗಳನ್ನು ಕಾರ್ಯನಿರ್ವಹಿಸುವಂತೆ ಮಾಡುತ್ತದೆ" } }]
    },
    "maps-directions": {
        story: [
            { emoji: "🗺️", text: { en: "Let's find our way using a map!", hi: "आइए नक्शे का उपयोग करके अपना रास्ता खोजें!", kn: "ನಕ್ಷೆಯನ್ನು ಬಳಸಿ ನಮ್ಮ ದಾರಿಯನ್ನು ಕಂಡುಹಿಡಿಯೋಣ!" } },
        ],
        concept: {
            title: { en: "Maps and Directions", hi: "नक्शे और दिशाएँ", kn: "ನಕ್ಷೆಗಳು ಮತ್ತು ದಿಕ್ಕುಗಳು" },
            description: { en: "Maps are drawings of places from above. Directions help us travel.", hi: "नक्शे ऊपर से जगहों के चित्र हैं। दिशाएं हमें यात्रा करने में मदद करती हैं।", kn: "ನಕ್ಷೆಗಳು ಮೇಲಿನಿಂದ ಸ್ಥಳಗಳ ಚಿತ್ರಣಗಳಾಗಿವೆ. ದಿಕ್ಕುಗಳು ನಮಗೆ ಪ್ರಯಾಣಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ." },
            points: [
                { en: "North, South, East, West", hi: "उत्तर, दक्षिण, पूर्व, पश्चिम", kn: "ಉತ್ತರ, ದಕ್ಷಿಣ, ಪೂರ್ವ, ಪಶ್ಚಿಮ" },
                { en: "Symbols represent landmarks", hi: "प्रतीक स्थलों का प्रतिनिधित्व करते हैं", kn: "ಚಿಹ್ನೆಗಳು ಹೆಗ್ಗುರುತುಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ" },
            ]
        },
        activity: { type: "visual", data: ["Compass (Directions)", "Scale", "Legend"] },
        realWorld: [{ emoji: "🛰️", title: { en: "GPS", hi: "जीपीएस", kn: "ಜಿಪಿಎಸ್" }, desc: { en: "Google Maps uses these basics", hi: "गूगल मैप्स इन बुनियादी बातों का उपयोग करता है", kn: "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಈ ಮೂಲಭೂತ ಅಂಶಗಳನ್ನು ಬಳಸುತ್ತದೆ" } }]
    },
    "indian-history": {
        story: [
            { emoji: "🏰", text: { en: "Long ago, grand kings and queens ruled India.", hi: "बहुत समय पहले, भव्य राजाओं और रानियों ने भारत पर शासन किया था।", kn: "ಬಹಳ ಹಿಂದೆಯೇ, ಭವ್ಯ ರಾಜರು ಮತ್ತು ಮಹಾರಾಣಿಯರು ಭಾರತವನ್ನು ಆಳಿದರು." } },
        ],
        concept: {
            title: { en: "India's Rich Past", hi: "भारत का समृद्ध अतीत", kn: "ಭಾರತದ ಶ್ರೀಮಂತ ಇತಿಹಾಸ" },
            description: { en: "Ancient India was known for science, philosophy, and architecture.", hi: "प्राचीन भारत विज्ञान, दर्शन और वास्तुकला के लिए जाना जाता था।", kn: "ಪ್ರತಿಷ್ಠಾಪಿತ ಭಾರತವು ವಿಜ್ಞಾನ, ತತ್ವಶಾಸ್ತ್ರ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪಕ್ಕೆ ಹೆಸರುವಾಸಿಯಾಗಿತ್ತು." },
            points: [
                { en: "Emperor Ashoka spread peace", hi: "सम्राट अशोक ने शांति फैलाई", kn: "ಅಶೋಕ ಚಕ್ರವರ್ತಿಯು ಶಾಂತಿಯನ್ನು ಹರಡಿದನು" },
                { en: "The Vedas were written", hi: "वेदों की रचना की गई", kn: "ವೇದಗಳನ್ನು ಬರೆಯಲಾಯಿತು" },
            ]
        },
        activity: { type: "facts", data: [{ label: "Ashoka", value: "Great Emperor" }, { label: "Taj Mahal", value: "Wonder" }] },
        realWorld: [{ emoji: "🏛️", title: { en: "Monuments", hi: "स्मारक", kn: "ಸ್ಮಾರಕಗಳು" }, desc: { en: "Historical wonders", hi: "ऐतिहासिक चमत्कार", kn: "ಐತಿಹಾಸಿಕ ಅದ್ಭುತಗಳು" } }]
    },
    "matter-materials": {
        story: [
            { emoji: "🧊", text: { en: "Everything is made of matter.", hi: "सब कुछ पदार्थ से बना है।", kn: "ಪ್ರತಿಯೊಂದೂ ದ್ರವ್ಯದಿಂದ ಮಾಡಲ್ಪಟ್ಟಿದೆ." } },
        ],
        concept: {
            title: { en: "States of Matter", hi: "पदार्थ की अवस्थाएँ", kn: "ದ್ರವ್ಯದ ಸ್ಥಿತಿಗಳು" },
            description: { en: "Matter is anything that has mass and takes space.", hi: "पदार्थ वह सब कुछ है जिसमें द्रव्यमान होता है और जो स्थान लेता है।", kn: "ದ್ರವ್ಯವು ದ್ರವ್ಯರಾಶಿಯನ್ನು ಹೊಂದಿರುವ ಮತ್ತು ಜಾಗವನ್ನು ತೆಗೆದುಕೊಳ್ಳುವ ಯಾವುದೇ ವಸ್ತುವಾಗಿದೆ." },
            points: [
                { en: "Solid, Liquid, Gas", hi: "ठोस, तरल, गैस", kn: "ಘನ, ದ್ರವ, ಅನಿಲ" },
                { en: "Atoms are building blocks", hi: "परमाणु निर्माण खंड हैं", kn: "ಪರಮಾಣುಗಳು ಮೂಲ ಬಿಲ್ಡಿಂಗ್ ಬ್ಲಾಕ್ಸ್" },
            ]
        },
        activity: { type: "visual", data: ["Ice", "Water", "Steam"] },
        realWorld: [{ emoji: "🎈", title: { en: "Air", hi: "हवा", kn: "ಗಾಳಿ" }, desc: { en: "Air is a gas inside a balloon", hi: "गुब्बारे के अंदर हवा एक गैस है", kn: "ಬಲೂನ್ ಒಳಗೆ ಗಾಳಿಯು ಒಂದು ಅನಿಲವಾಗಿದೆ" } }]
    }
};
