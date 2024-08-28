// File: components/NotebookForm.tsx
"use client";

import { useState } from "react";

export default function NotebookForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/store-notebook?url=${encodeURIComponent(url)}`
      );
      const data = await response.json();
      setDownloadUrl(data.download_url);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
      <div className="flex space-x-4">
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
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-md hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        )}
      </div>
    </form>
  );
}
