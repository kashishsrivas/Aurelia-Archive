import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TransitionProvider from "@/components/TransitionProvider";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Aurelia Archive",
  description:
    "A quiet world of stories, sound, and focused thought. Study inside enchanted rooms made for calm focus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
      <body className="relative flex min-h-screen flex-col">
        <TransitionProvider>
          <Header />
            <main className="flex-1">{children}</main>
          <Footer />
        </TransitionProvider>
</body>
      
    </html>
  );
}