import Footer from "../components/Footer";
import Header from "../components/Header";
import NotebookForm from "../components/NotebookForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Jupyter Notebook Parser
          </h1>
          <NotebookForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
