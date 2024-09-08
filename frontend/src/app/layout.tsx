"use client";

import CreatorInfo from "@/components/CreatorInfo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { initPostHog } from "@/posthog";
import { useEffect } from "react";

// Move metadata to a separate file, e.g., metadata.ts

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-12">
            {children}
          </main>
          <CreatorInfo />
          <Footer />
        </div>
      </body>
    </html>
  );
}
