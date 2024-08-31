import React from "react";

const NotebookExtractorDescription: React.FC = () => {
  return (
    <>
      <p className="text-gray-600 mb-6 text-lg">
        Extract markdown and code blocks from .ipynb files into a{" "}
        <span className="font-bold text-purple-600">single markdown file.</span>
      </p>
      <p className="text-gray-600 mb-4 text-lg">Perfect for:</p>
      <ul className="list-none mb-8 text-gray-600 space-y-2">
        {[
          "Pasting into LLMs to provide context",
          "Quick review of notebook structure and content",
          "Sharing work in a readable format",
          "Creating documentation from Jupyter Notebooks",
        ].map((item, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotebookExtractorDescription;
