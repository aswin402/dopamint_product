import React from 'react';
import { CodeBlock } from './CodeBlock';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeLang = '';
  let codeBuffer: string[] = [];

  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (inTable && tableHeader.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="my-4 overflow-x-auto rounded-2xl border border-[var(--border-color)]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--bg-app)] border-b border-[var(--border-color)]">
                {tableHeader.map((th, idx) => (
                  <th key={idx} className="px-3.5 py-2.5 font-bold text-[var(--text-primary)]">
                    {th.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="border-b border-[var(--border-color)] last:border-b-0 hover:bg-[var(--bg-hover)] transition-colors"
                >
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3.5 py-2 text-[var(--text-secondary)]">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableHeader = [];
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block fences
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <CodeBlock
            key={`code-${elements.length}`}
            language={codeLang || 'bash'}
            code={codeBuffer.join('\n')}
          />
        );
        inCodeBlock = false;
        codeBuffer = [];
        codeLang = '';
      } else {
        flushTable();
        inCodeBlock = true;
        codeLang = line.replace('```', '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Markdown Table lines
    if (line.includes('|') && line.trim().startsWith('|')) {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      if (cells.every((c) => c.match(/^-+$/))) {
        // Table divider row
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-base font-bold text-[var(--text-primary)] mt-4 mb-1.5 tracking-tight"
        >
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-lg font-bold text-[var(--text-primary)] mt-5 mb-2 tracking-tight"
        >
          {line.replace('## ', '')}
        </h2>
      );
      continue;
    }

    // LaTeX Math Blocks ($$...$$)
    if (line.startsWith('$$') && line.endsWith('$$')) {
      const formula = line.replace(/\$\$/g, '').trim();
      elements.push(
        <div
          key={`math-${i}`}
          className="my-3 p-3 bg-[var(--bg-app)] rounded-xl border border-[var(--border-color)] text-center font-mono text-xs text-[var(--primary)] font-semibold"
        >
          {formula}
        </div>
      );
      continue;
    }

    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const text = line.trim().slice(2);
      elements.push(
        <li key={`li-${i}`} className="ml-4 list-disc text-sm text-[var(--text-primary)] leading-relaxed my-0.5">
          <FormatInlineText text={text} />
        </li>
      );
      continue;
    }

    // Numbered list
    if (line.trim().match(/^\d+\.\s/)) {
      const text = line.trim().replace(/^\d+\.\s/, '');
      elements.push(
        <li key={`ol-${i}`} className="ml-4 list-decimal text-sm text-[var(--text-primary)] leading-relaxed my-0.5">
          <FormatInlineText text={text} />
        </li>
      );
      continue;
    }

    // Empty line / paragraph
    if (!line.trim()) {
      elements.push(<div key={`sp-${i}`} className="h-2" />);
      continue;
    }

    // Regular text paragraph
    elements.push(
      <p key={`p-${i}`} className="text-[14.5px] text-[var(--text-primary)] leading-relaxed my-1.5">
        <FormatInlineText text={line} />
      </p>
    );
  }

  flushTable();

  return <div className="space-y-1">{elements}</div>;
};

const FormatInlineText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-bold text-[var(--text-primary)]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={index}
              className="px-1.5 py-0.5 bg-[var(--bg-app)] text-[var(--primary)] border border-[var(--border-color)] rounded-md font-mono text-[12.5px] mx-0.5"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};
