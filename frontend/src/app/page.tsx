"use client";

import CreatorInfo from "@/components/CreatorInfo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotebookExtractor from "@/components/NotebookExtractor";
import PostHog from "@/components/PostHog";
import StructuredData from "@/components/StructuredData";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.jupyterm8.xyz" />
      </Head>
      <PostHog />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-200">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <NotebookExtractor />
          {/* <OtherTools /> */}
        </main>
        <CreatorInfo />
        <Footer />
      </div>
      <StructuredData
        name="Jupyterm8"
        url="https://www.jupyterm8.xyz"
        description="Suite of tools for data scientists, developers, and researchers working with Jupyter Notebooks."
        searchActionUrlTemplate="https://www.jupyterm8.xyz/search?q={search_term_string}"
      />
    </>
  );
}
