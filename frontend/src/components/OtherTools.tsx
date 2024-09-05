import { FileSearch, GitBranch, Notebook } from "lucide-react";
import React from "react";

const tools = [
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
];

const OtherTools: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
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
            <p className="text-gray-600 text-center">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherTools;
