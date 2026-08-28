import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

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
    <div className="my-3 rounded-2xl overflow-hidden border border-[#ECECEC] bg-[#1E1E2E] text-[#F8F8F2] shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-[#313244] text-xs font-medium text-[#A6ADC8]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F38BA8]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F9E2AF]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#A6E3A1]/80" />
          </div>
          <span className="font-mono uppercase text-[11px] font-bold text-[#CDD6F4] ml-2">
            {language || 'text'}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#313244]/60 hover:bg-[#313244] text-[#CDD6F4] hover:text-white transition-colors text-[11.5px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed selection:bg-[#5B5CEB]/40 selection:text-white">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
