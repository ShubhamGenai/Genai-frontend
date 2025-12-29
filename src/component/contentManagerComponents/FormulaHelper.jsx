import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import FormulaRenderer from './FormulaRenderer';
import ErrorBoundary from './ErrorBoundary';

/**
 * Safe Formula Renderer Wrapper
 * Wraps FormulaRenderer to prevent crashes and show fallback
 */
const SafeFormulaRenderer = ({ text }) => {
  if (!text) {
    return <span className="text-slate-400 text-xs">No formula</span>;
  }
  
  return (
    <ErrorBoundary
      fallback={
        <code className="text-slate-300 text-sm font-mono break-all">
          {text}
        </code>
      }
    >
      <div className="w-full">
        <FormulaRenderer text={text} />
      </div>
    </ErrorBoundary>
  );
};

/**
 * FormulaHelper Component
 * Provides a helper modal with common math and chemistry formulas
 * Users can click to copy formulas to clipboard
 */
const FormulaHelper = ({ onClose, onInsert }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const commonFormulas = [
    // Math formulas
    { name: 'Quadratic Formula', formula: '$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$' }, // Fixed: 2a needs to be in formula
    { name: 'Pythagorean Theorem', formula: '$a^2 + b^2 = c^2$' },
    { name: 'Area of Circle', formula: '$A = \\pi r^2$' },
    { name: 'Volume of Sphere', formula: '$V = \\frac{4}{3}\\pi r^3$' },
    { name: 'Derivative', formula: '$\\frac{d}{dx}f(x)$' },
    { name: 'Integral', formula: '$\\int f(x) dx$' },
    { name: 'Summation', formula: '$\\sum_{i=1}^{n} x_i$' },
    { name: 'Limit', formula: '$\\lim_{x \\to \\infty} f(x)$' },
    { name: 'Logarithm', formula: '$\\log_a(x)$' },
    { name: 'Exponential', formula: '$e^x$' },
    { name: 'Square Root', formula: '$\\sqrt{x}$' },
    { name: 'Fraction', formula: '$\\frac{a}{b}$' },
    
    // Chemistry formulas
    { name: 'Water', formula: '$H_2O$' },
    { name: 'Carbon Dioxide', formula: '$CO_2$' },
    { name: 'Sulfuric Acid', formula: '$H_2SO_4$' },
    { name: 'Ammonia', formula: '$NH_3$' },
    { name: 'Methane', formula: '$CH_4$' },
    { name: 'Ideal Gas Law', formula: '$PV = nRT$' },
    { name: 'pH Formula', formula: '$pH = -\\log[H^+]$' },
    { name: 'Molarity', formula: '$M = \\frac{n}{V}$' },
    { name: 'Avogadro Number', formula: '$N_A = 6.022 \\times 10^{23}$' },
    { name: 'Energy', formula: '$E = mc^2$' },
    { name: 'Reaction', formula: '$2H_2 + O_2 \\rightarrow 2H_2O$' },
    { name: 'Equilibrium', formula: '$K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}$' },
  ];

  const handleCopy = (formula, index) => {
    navigator.clipboard.writeText(formula);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleInsert = (formula) => {
    if (onInsert) {
      onInsert(formula);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl mx-4 border border-slate-600/30 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
          <div>
            <h2 className="text-xl font-bold text-white">Formula Helper</h2>
            <p className="text-sm text-slate-400 mt-1">Click on a formula to insert it, or copy to clipboard</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Math Formulas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonFormulas.slice(0, 12).map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-700/40 border border-slate-600/30 rounded-lg p-3 hover:bg-slate-700/60 transition-colors cursor-pointer group"
                  onClick={() => handleInsert(item.formula)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-300">{item.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.formula, index);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-600/50 rounded"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2 text-center min-h-[40px] flex items-center justify-center">
                    <div className="w-full">
                      <SafeFormulaRenderer text={item.formula} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Chemistry Formulas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonFormulas.slice(12).map((item, index) => (
                <div
                  key={index + 12}
                  className="bg-slate-700/40 border border-slate-600/30 rounded-lg p-3 hover:bg-slate-700/60 transition-colors cursor-pointer group"
                  onClick={() => handleInsert(item.formula)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-300">{item.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.formula, index + 12);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-600/50 rounded"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === index + 12 ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-800/50 rounded p-2 text-center min-h-[40px] flex items-center justify-center">
                    <div className="w-full">
                      <SafeFormulaRenderer text={item.formula} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-300 mb-2">How to use:</h4>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Inline formulas: Use $formula$ (e.g., $x^2$)</li>
              <li>• Block formulas: Use $$formula$$ (e.g., $$\\int_0^1 x dx$$)</li>
              <li>• Subscripts: Use _ (e.g., H_2O)</li>
              <li>• Superscripts: Use ^ (e.g., x^2)</li>
              <li>• Fractions: Use \\frac{a}{b}</li>
              <li>• Click any formula above to insert it</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-600/30">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700/40 border border-slate-600/30 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-700/70 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormulaHelper;

