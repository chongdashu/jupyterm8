"use client";

import posthog from "@/posthog";
import { Copy, Download } from "lucide-react";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import config from "../config";

export default function NotebookForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [notebookContent, setNotebookContent] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${config.apiUrl}/notebook/store-notebook?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await response.json();
      setDownloadUrl(data.download_url);
      setNotebookContent(data.content);

      // Track successful notebook extraction
      posthog.capture("notebook_extracted", { url: url });
    } catch (error) {
      console.error("Error:", error);

      // Track failed notebook extraction
      posthog.capture("notebook_extraction_failed", {
        url: url,
        error: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(notebookContent)
      .then(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);

        // Track successful copy to clipboard
        posthog.capture("notebook_content_copied");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);

        // Track failed copy to clipboard
        posthog.capture("notebook_content_copy_failed", { error: String(err) });
      });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="notebook-url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Jupyter Notebook URL
          </label>
          <input
            type="url"
            id="notebook-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out text-gray-900 placeholder-gray-500"
            placeholder="https://github.com/username/repo/blob/main/notebook.ipynb"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
      {notebookContent && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Processed Notebook Content
            </h2>
            <div className="flex space-x-2">
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download notebook"
                >
                  <Download size={20} />
                </a>
              )}
              <div className="relative">
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  title="Copy to clipboard"
                >
                  <Copy size={20} />
                </button>
                {showTooltip && (
                  <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                    Copied!
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 overflow-auto max-h-[60vh]">
            <SyntaxHighlighter language="markdown" style={vscDarkPlus}>
              {notebookContent}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}
