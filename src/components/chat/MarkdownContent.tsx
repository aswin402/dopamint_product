import React from 'react';
import { CodeBlock } from './CodeBlock';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  if (!content) return null;

  // Split by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 text-[14.5px] leading-[1.68] text-[#111111]">
      {parts.map((part, index) => {
        // Code Block match
        if (part.startsWith('```') && part.endsWith('```')) {
          const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
          const lang = match ? match[1] || 'bash' : 'text';
          const code = match ? match[2] : part.slice(3, -3);
          return <CodeBlock key={index} language={lang} code={code} />;
        }

        // Render standard markdown lines
        return <MarkdownSection key={index} text={part} />;
      })}
    </div>
  );
};

const MarkdownSection: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let inTable = false;

  const flushTable = (key: string) => {
    if (tableBuffer.length > 0) {
      elements.push(<MarkdownTable key={key} tableLines={tableBuffer} />);
      tableBuffer = [];
      inTable = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // LaTeX Math Formula block ($$...$$)
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
      flushTable(`tbl-${idx}`);
      const formula = trimmed.slice(2, -2).trim();
      elements.push(
        <div
          key={`math-${idx}`}
          className="my-3 p-3.5 bg-[#F7F8FA] border border-[#ECECEC] rounded-2xl text-center font-mono text-[13.5px] text-[#5B5CEB] overflow-x-auto shadow-2xs"
        >
          {formula}
        </div>
      );
      return;
    }

    // Markdown Table Row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      tableBuffer.push(trimmed);
      return;
    } else if (inTable) {
      flushTable(`tbl-${idx}`);
    }

    // Heading 3
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={idx} className="text-base font-bold text-[#111111] mt-4 mb-2 tracking-tight">
          {formatInlineMarkdown(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    // Heading 2
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={idx} className="text-lg font-bold text-[#111111] mt-5 mb-2.5 tracking-tight">
          {formatInlineMarkdown(trimmed.slice(3))}
        </h2>
      );
      return;
    }

    // Unordered List item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <li key={idx} className="ml-4 list-disc text-[14px] text-[#333333] my-1">
          {formatInlineMarkdown(trimmed.slice(2))}
        </li>
      );
      return;
    }

    // Ordered List item
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^\d+\.\s(.*)/);
      elements.push(
        <li key={idx} className="ml-4 list-decimal text-[14px] text-[#333333] my-1">
          {formatInlineMarkdown(match ? match[1] : trimmed)}
        </li>
      );
      return;
    }

    // Empty line / paragraph break
    if (!trimmed) {
      elements.push(<div key={idx} className="h-1.5" />);
      return;
    }

    // Regular paragraph
    elements.push(
      <p key={idx} className="my-1 text-[14.5px] text-[#111111]">
        {formatInlineMarkdown(line)}
      </p>
    );
  });

  flushTable('tbl-last');

  return <>{elements}</>;
};

function formatInlineMarkdown(text: string): React.ReactNode {
  // Split bold **text**
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-[#111111]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-[#333333]">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 bg-[#F0F2F6] text-[#5B5CEB] rounded-md font-mono text-[12.5px]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

const MarkdownTable: React.FC<{ tableLines: string[] }> = ({ tableLines }) => {
  if (tableLines.length < 2) return null;

  const headerCells = tableLines[0]
    .split('|')
    .slice(1, -1)
    .map((c) => c.trim());

  // Skip delimiter line (e.g. |---|---|)
  const bodyRows = tableLines.slice(2).map((row) =>
    row
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim())
  );

  return (
    <div className="my-4 overflow-x-auto rounded-2xl border border-[#ECECEC] bg-white shadow-soft">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#F7F8FA] border-b border-[#ECECEC]">
          <tr>
            {headerCells.map((head, i) => (
              <th
                key={i}
                className="px-4 py-2.5 font-bold text-[#111111] uppercase tracking-wider text-[11px]"
              >
                {formatInlineMarkdown(head)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ECECEC]">
          {bodyRows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="hover:bg-[#F9FAFC] transition-colors odd:bg-white even:bg-[#FAFAFC]"
            >
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-2.5 text-[#333333] leading-relaxed">
                  {formatInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
