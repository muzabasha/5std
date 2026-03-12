"use client";
import { Language } from "./types";
import { voiceLangMap } from "./translations";

export function speak(text: string, lang: Language, rate = 0.9) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLangMap[lang];
    utterance.rate = rate;
    utterance.pitch = 1.1;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.startsWith(voiceLangMap[lang].split("-")[0]));
    if (match) utterance.voice = match;
    window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
}
