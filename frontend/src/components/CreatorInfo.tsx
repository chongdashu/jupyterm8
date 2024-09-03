import Link from "next/link";
import React from "react";

const CreatorInfo: React.FC = () => {
  return (
    <div className="text-center mt-8 space-y-4">
      <p className="text-gray-600">
        Created with ❤️ by{" "}
        <Link
          href="https://twitter.com/chongdashu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          @chongdashu
        </Link>
      </p>
      <div className="text-gray-700">
        <p className="font-semibold">
          Need help? Have a feature request? Saying hello?
        </p>
        <p>
          Reach out on{" "}
          <Link
            href="https://twitter.com/chongdashu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            Twitter
          </Link>{" "}
          {/* or{" "}
          <Link
            href="https://github.com/chongdashu/jupyterm8/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            open an issue on GitHub
          </Link> */}
          .
        </p>
      </div>
    </div>
  );
};

export default CreatorInfo;
