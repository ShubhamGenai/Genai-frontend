import React, { useState, useEffect } from 'react';

// KaTeX will be imported dynamically to handle missing dependency gracefully
let katex = null;
let katexPromise = null;

const loadKaTeX = () => {
  if (katexPromise) return katexPromise;
  
  katexPromise = import('katex')
    .then((module) => {
      katex = module.default || module;
      import('katex/dist/katex.min.css').catch(() => {
        console.warn('KaTeX CSS could not be loaded');
      });
      return katex;
    })
    .catch((error) => {
      console.warn('KaTeX is not installed. Please run: npm install katex', error);
      return null;
    });
  
  return katexPromise;
};

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
  const [katexReady, setKatexReady] = useState(!!katex);
  const [loading, setLoading] = useState(!katex);

  useEffect(() => {
    if (!katex && !katexPromise) {
      loadKaTeX().then((loaded) => {
        setKatexReady(!!loaded);
        setLoading(false);
      });
    } else if (katex) {
      setKatexReady(true);
      setLoading(false);
    }
  }, []);

  if (!text) return null;

  // Pattern to match LaTeX formulas
  // Inline: $formula$ or \(formula\)
  // Block: $$formula$$ or \[formula\]
  const inlinePattern = /\$([^$]+)\$|\\\(([^)]+)\\\)/g;
  const blockPattern = /\$\$([^$]+)\$\$|\\\[([^\]]+)\\\]/g;

  const renderFormula = (formula, isBlock = false) => {
    if (loading) {
      return <span className="text-slate-400 text-xs">Loading formula...</span>;
    }
    
    if (!katex || !katexReady) {
      // Show the LaTeX code as fallback instead of error message
      return <code className="text-slate-300 text-sm font-mono">{formula}</code>;
    }
    
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
