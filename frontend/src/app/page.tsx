import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotebookExtractor from "@/components/NotebookExtractor";
import StructuredData from "@/components/StructuredData";
import { FileSearch, GitBranch, Notebook } from "lucide-react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.jupyterm8.xyz" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-200">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <NotebookExtractor />

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
              More Jupyterm8 Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Notebook,
                  title: "Notebook Converter",
                  color: "blue",
                  description:
                    "Convert Jupyter Notebooks to various formats for easy sharing and collaboration.",
                },
                {
                  icon: FileSearch,
                  title: "Code Search",
                  color: "green",
                  description:
                    "Quickly search and navigate through your Jupyter Notebooks to find specific code snippets.",
                },
                {
                  icon: GitBranch,
                  title: "Version Control",
                  color: "purple",
                  description:
                    "Seamlessly integrate your Jupyter Notebooks with version control systems like Git.",
                },
              ].map((tool, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <tool.icon
                    className={`w-16 h-16 text-${tool.color}-500 mb-4 mx-auto`}
                  />
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
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
