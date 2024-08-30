import { FileSearch, GitBranch, Notebook } from "lucide-react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NotebookForm from "../components/NotebookForm";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.jupyterm8.xyz" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              Jupyter Notebook Extractor
            </h1>
            <p className="text-gray-600 mb-6">
              Extract markdown and code blocks from .ipynb files into a{" "}
              <b>single markdown file.</b>
            </p>
            <p className="text-gray-600 mb-6">Perfect for:</p>
            <ul className="list-disc list-inside mb-6 text-gray-600">
              <li>Pasting into LLMs to provide context</li>
              <li>Quick review of notebook structure and content</li>
              <li>Sharing work in a readable format</li>
              <li>Creating documentation from Jupyter Notebooks</li>
            </ul>
            <NotebookForm />
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              More Jupyterm8 Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Notebook className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Notebook Converter
                </h3>
                <p className="text-gray-600">
                  Convert Jupyter Notebooks to various formats for easy sharing
                  and collaboration.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FileSearch className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Code Search</h3>
                <p className="text-gray-600">
                  Quickly search and navigate through your Jupyter Notebooks to
                  find specific code snippets.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <GitBranch className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Version Control</h3>
                <p className="text-gray-600">
                  Seamlessly integrate your Jupyter Notebooks with version
                  control systems like Git.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Jupyterm8",
            url: "https://www.jupyterm8.xyz",
            description:
              "Suite of tools for data scientists, developers, and researchers working with Jupyter Notebooks.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://www.jupyterm8.xyz/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </>
  );
}
