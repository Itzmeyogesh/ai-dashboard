import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Notes() {
  const [markdown, setMarkdown] = useState("# Start taking notes...");

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Markdown Input */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Write Note</h2>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full h-[400px] p-4 rounded-md shadow resize-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      {/* Markdown Preview */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Preview</h2>
        <div className="prose dark:prose-invert bg-white dark:bg-gray-700 p-4 rounded-md shadow h-[400px] overflow-auto">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
