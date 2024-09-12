import CreatorInfo from "@/components/CreatorInfo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PHProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jupyterm8 - AI Research Tools",
  description:
    "Practical mini tools for AI research scientists and engineers. Streamline your workflow with our suite of specialized tools for Jupyter Notebooks, image analysis, and more.",
  keywords:
    "AI research, machine learning, data science, Jupyter Notebook, image analysis, model visualization",
  openGraph: {
    title: "Jupyterm8 - AI Research Tools",
    description:
      "Practical mini tools for AI research scientists and engineers. Streamline your workflow and boost productivity.",
    url: "https://www.jupyterm8.xyz",
    siteName: "Jupyterm8",
    images: [
      {
        url: "https://www.jupyterm8.xyz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jupyterm8 - AI Research Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jupyterm8 - AI Research Tools",
    description:
      "Practical mini tools for AI research scientists and engineers. Streamline your workflow and boost productivity.",
    images: ["https://www.jupyterm8.xyz/og-image.jpg"],
  },
  robots: "index, follow",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12">
              {children}
            </main>
            <CreatorInfo />
            <Footer />
          </div>
        </body>
      </PHProvider>
    </html>
  );
}
