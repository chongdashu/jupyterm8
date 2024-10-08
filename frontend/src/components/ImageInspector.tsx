"use client";
import { Copy } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ImageInspectorDescription from "./ImageInspectorDescription";

interface Point {
  x: number;
  y: number;
}

const ImageInspector = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [points, setPoints] = useState<Point[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const posthog = usePostHog();
  useEffect(() => {
    if (imageUrl) {
      const image = new Image();
      image.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        points.forEach((point) => {
          drawPoint(ctx, point.x, point.y);
        });
      };
      image.src = imageUrl;
    }
  }, [imageUrl, points]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setImageUrl(result);
          posthog.capture("image_uploaded", {
            fileType: file.type,
            fileSize: file.size,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);

    setPoints((prevPoints) => {
      const newPoints = [...prevPoints, { x, y }];
      posthog.capture("point_added", { x, y, totalPoints: newPoints.length });
      return newPoints;
    });

    const ctx = canvas.getContext("2d");
    if (ctx) {
      drawPoint(ctx, x, y);
    }
  };

  const generatePythonCode = () => {
    const pointsList = points
      .map((point) => `(${point.x}, ${point.y})`)
      .join(", ");
    return `points = [${pointsList}]`;
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatePythonCode())
      .then(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
        posthog.capture("code_copied", { numPoints: points.length });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        posthog.capture("code_copy_failed", { error: String(err) });
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 mb-12 transform hover:scale-105 transition-transform duration-300">
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Image Inspector
      </h1>
      <ImageInspectorDescription />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="mb-4 p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="max-w-full h-auto"
            />
          </div>
        </div>
        <div className="lg:w-1/4 bg-gray-50 p-4 rounded-lg">
          <div
            className="h-60 overflow-y-auto pr-2"
            style={{ scrollbarWidth: "thin" }}
          >
            <ul>
              {points.map((point, index) => (
                <li key={index} className="mb-2 text-gray-700">
                  {index + 1}: ({point.x}, {point.y})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-blue-600">
            Python Code Snippet
          </h2>
          <div className="relative">
            <button
              onClick={copyToClipboard}
              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
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
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: 0,
              background: "transparent",
            }}
          >
            {generatePythonCode()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default ImageInspector;
