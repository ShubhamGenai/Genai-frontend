import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * FormulaRenderer Component
 * Renders LaTeX formulas using KaTeX
 * Supports both inline and block formulas
 * 
 * Usage:
 * <FormulaRenderer text="The formula is $x^2 + y^2 = z^2$" />
 * <FormulaRenderer text="Block formula: $$\\int_0^1 x dx$$" />
 */
const FormulaRenderer = ({ text, className = '' }) => {
  if (!text) return null;

  // Pattern to match LaTeX formulas
  // Inline: $formula$ or \(formula\)
  // Block: $$formula$$ or \[formula\]
  const inlinePattern = /\$([^$]+)\$|\\\(([^)]+)\\\)/g;
  const blockPattern = /\$\$([^$]+)\$\$|\\\[([^\]]+)\\\]/g;

  const renderFormula = (formula, isBlock = false) => {
    if (!formula || typeof formula !== 'string') {
      return <span className="text-red-400 text-xs">[Invalid]</span>;
    }
    
    try {
      const html = katex.renderToString(formula.trim(), {
        throwOnError: false,
        displayMode: isBlock,
        output: 'html',
        strict: false
      });
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (error) {
      console.error('KaTeX rendering error:', error, 'Formula:', formula);
      // Show LaTeX code as fallback
      return <code className="text-slate-300 text-sm font-mono">{formula}</code>;
    }
  };

  // Split text by block formulas first
  const parts = [];
  let match;

  // Process block formulas
  const blockMatches = [];
  const blockRegex = new RegExp(blockPattern.source, 'g');
  while ((match = blockRegex.exec(text)) !== null) {
    blockMatches.push({
      index: match.index,
      length: match[0].length,
      formula: match[1] || match[2],
      isBlock: true
    });
  }

  // Process inline formulas
  const inlineMatches = [];
  const inlineRegex = new RegExp(inlinePattern.source, 'g');
  while ((match = inlineRegex.exec(text)) !== null) {
    inlineMatches.push({
      index: match.index,
      length: match[0].length,
      formula: match[1] || match[2],
      isBlock: false
    });
  }

  // Combine and sort all matches
  const allMatches = [...blockMatches, ...inlineMatches].sort((a, b) => a.index - b.index);

  // Build parts array
  let currentIndex = 0;
  allMatches.forEach((match) => {
    // Add text before formula
    if (match.index > currentIndex) {
      const textPart = text.substring(currentIndex, match.index);
      if (textPart) {
        parts.push({ type: 'text', content: textPart });
      }
    }

    // Add formula
    parts.push({ type: 'formula', content: match.formula, isBlock: match.isBlock });

    currentIndex = match.index + match.length;
  });

  // Add remaining text
  if (currentIndex < text.length) {
    const textPart = text.substring(currentIndex);
    if (textPart) {
      parts.push({ type: 'text', content: textPart });
    }
  }

  // If no formulas found, return plain text
  if (parts.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === 'formula') {
          return (
            <span key={index} className={part.isBlock ? 'block my-2' : 'inline'}>
              {renderFormula(part.content, part.isBlock)}
            </span>
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </span>
  );
};

export default FormulaRenderer;
