import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jupyterm8 - Jupyter Notebook Tools",
  description:
    "Suite of tools for data scientists, developers, and researchers working with Jupyter Notebooks. Extract, convert, and manage your notebooks efficiently.",
  keywords:
    "Jupyter Notebook, extractor, data science, notebook converter, code search, version control",
  // openGraph: {
  //   title: "Jupyterm8 - Jupyter Notebook Tools",
  //   description:
  //     "Streamline your Jupyter Notebook workflow with our suite of tools, including our Notebook Extractor.",
  //   url: "https://www.jupyterm8.xyz",
  //   siteName: "Jupyterm8",
  //   images: [
  //     {
  //       url: "https://www.jupyterm8.xyz/og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Jupyterm8 - Jupyter Notebook Tools",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Jupyterm8 - Jupyter Notebook Tools",
  //   description:
  //     "Streamline your Jupyter Notebook workflow with our suite of tools, including our Notebook Extractor.",
  //   images: ["https://www.jupyterm8.xyz/og-image.jpg"],
  // },
  robots: "index, follow",
  // themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
