import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import TypingAnimation from '@/components/ui/typing-animation';

interface StyledChatbotResponseProps {
  content: string;
}

const StyledChatbotResponse: React.FC<StyledChatbotResponseProps> = ({ content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const processContent = (text: string): JSX.Element[] => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let language = '';

    return lines.reduce((elements: JSX.Element[], line: string, index: number) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="mb-4 rounded-lg overflow-hidden">
              <code className={`language-${language}`}>
                {codeLines.join('\n')}
              </code>
            </pre>
          );
          inCodeBlock = false;
          codeLines = [];
          language = '';
        } else {
          inCodeBlock = true;
          language = line.slice(3).trim() || 'typescript'; // Default to TypeScript if no language is specified
        }
        return elements;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return elements;
      }

      if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-2xl font-bold mb-4 mt-6">{line.slice(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-xl font-semibold mb-3 mt-5">{line.slice(3)}</h2>);
      } else if (line.startsWith('* ')) {
        elements.push(<li key={index} className="ml-6 mb-2">{processBoldText(line.slice(2))}</li>);
      } else if (line.match(/^\d+\./)) {
        elements.push(<li key={index} className="ml-6 mb-2">{processBoldText(line)}</li>);
      } else if (line.trim() === '') {
        elements.push(<br key={index} />);
      } else {
        elements.push(<p key={index} className="mb-4">{processLinks(processBoldText(line))}</p>);
      }

      return elements;
    }, []);
  };

  const processBoldText = (text: string): (string | JSX.Element)[] => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const processLinks = (content: (string | JSX.Element)[]): (string | JSX.Element)[] => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;

    return content.map((part, index) => {
      if (typeof part === 'string') {
        const splitParts = part.split(linkRegex).map((segment, idx) => {
          if (linkRegex.test(segment)) {
            return (
              <a
                key={idx}
                href={segment}
                className="text-blue-600 hover:text-blue-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {segment}
              </a>
            );
          }
          return segment;
        });

        return <React.Fragment key={index}>{splitParts}</React.Fragment>;
      }
      return part;
    });
  };

  return (
    <div className="w-full text-white p-6">
      {processContent(content)}
    </div>
    
  );
};

export default StyledChatbotResponse;

