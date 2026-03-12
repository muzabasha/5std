import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FunLearn Lab – CBSE Grade 5 Experiential Learning",
  description:
    "Interactive experiential learning platform for CBSE Grade 5 students. Explore Math, Science, English, Hindi, Kannada, and Social Studies through games, simulations, and stories.",
  keywords: "CBSE, Grade 5, learning, education, NEP 2020, interactive, games",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-nunito bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
