import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3.5 rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[#1e221c] text-[#f3f2e6] shadow-card text-xs font-mono select-text">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#171a15] border-b border-[#292f25]">
        <div className="flex items-center gap-2 text-[#9bb28f]">
          <Terminal className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase text-[11px] tracking-wider">{language}</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#242a20] hover:bg-[#2e362a] text-[#f3f2e6] transition-colors text-[11px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="leading-relaxed whitespace-pre font-mono text-[12.5px] text-[#f3f2e6]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
