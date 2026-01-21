import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/Navbar"; // 👈 নেভবার ইমপোর্ট
import Footer from "@/components/shared/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Equações Razoáveis",
    default: "Equações Razoáveis | Recruitment & Staffing Solutions",
  },
  description:
    "Find your dream job in Europe or hire skilled workers for your company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth">
      <body
        className={`${outfit.variable} font-sans antialiased bg-brand-light text-brand-dark`}>
        <Navbar />
        <GoogleTranslateCleanup />
        <GoogleTranslateProvider>
          <main className="min-h-screen pt-20 md:pt-24">{children}</main>
        </GoogleTranslateProvider>

        <Footer />

        <Toaster
          position="top-center"
          richColors
          theme="light"
          closeButton
        />
      </body>
    </html>
  );
}
