import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RecruitmentProvider } from "@/lib/RecruitmentContext";
import { AuthRoleProvider } from "@/lib/AuthRoleContext";

export const metadata: Metadata = {
  title: "nayamarg. — Connecting the Finest Talent to Real Work",
  description:
    "Autonomous voice-first recruitment platform. Seamless hiring for employers, accessible multilingual opportunities for job seekers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050608] text-gray-100 antialiased min-h-screen selection:bg-blue-600 selection:text-white">
        <AuthRoleProvider>
          <RecruitmentProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </RecruitmentProvider>
        </AuthRoleProvider>
      </body>
    </html>
  );
}
