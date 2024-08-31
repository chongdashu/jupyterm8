import React from "react";
import NotebookExtractorDescription from "./NotebookExtractorDescription";
import NotebookForm from "./NotebookExtractorForm";
import NotebookExtractorTitle from "./NotebookExtractorTitle";

const NotebookExtractor: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mb-12 transform hover:scale-105 transition-transform duration-300">
      <NotebookExtractorTitle />
      <NotebookExtractorDescription />
      <NotebookForm />
    </div>
  );
};

export default NotebookExtractor;
