import { FileText, Image } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    name: "Notebook Extractor",
    description: "Extract markdown and code from Jupyter Notebooks",
    icon: FileText,
    link: "/notebook-extractor",
  },
  {
    name: "Image Inspector",
    description: "Edit images and select points",
    icon: Image,
    link: "/image-pointer",
  },
];

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">Jupyterm8 Tools</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <Link key={tool.name} href={tool.link} className="block">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <tool.icon className="w-12 h-12 mb-4 text-blue-600" />
              <h2 className="text-2xl font-semibold mb-2">{tool.name}</h2>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
