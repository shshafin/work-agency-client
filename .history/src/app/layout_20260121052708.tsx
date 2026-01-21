import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// ১. প্রজেক্টের জন্য মডার্ন Outfit ফন্ট কনফিগারেশন
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// ২. Job Board এবং Recruitment অনুযায়ী SEO Metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Work Supply - Recruitment & Jobs",
    default: "Work Supply | International Recruitment & Staffing Solutions",
  },
  description:
    "Find premium job opportunities across Europe or request skilled workers for your business. Specializing in Agriculture, Construction, Logistics, and more.",
  icons: {
    icon: "/favicon.ico", // তোমার ফোল্ডারে যেটা থাকবে
  },
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
        className={`${outfit.variable} font-outfit antialiased bg-[#F8FAFC] text-[#1E293B]`}>
       
        <main className="min-h-screen">{children}</main>

        <Toaster
          position="top-center"
          richColors
          theme="light"
          closeButton
          duration={3000}
        />
      </body>
    </html>
  );
}
