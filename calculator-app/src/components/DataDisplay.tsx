import React from 'react';
import data from '../data/jawaban_latihan.json';
import type { KalkulatorData } from '../types/finance';
import { InlineMath } from 'react-katex';

const DataDisplay: React.FC = () => {
  const problems = data.kalkulator_anuitas_data as unknown as KalkulatorData[];

  const formatFormula = (formula: string) => {
    if (!formula) return '';
    
    // Sort keys by length descending to match most specific terms first
    const replacements: Record<string, string> = {
      'PMT_due': '\\\\text{PMT}_{due}',
      'PMT_ordinary': '\\\\text{PMT}_{ord}',
      'PMT': '\\\\text{PMT}',
      'PV': '\\\\text{PV}',
      'FV': '\\\\text{FV}',
      'log': '\\\\log',
      ' * ': ' \\\\times ',
      ' / ': ' \\\\div ',
      '*': ' \\\\times ',
      '/': ' \\\\div ',
      '^-n': '^{-n}',
      '^n': '^{n}'
    };

    let result = formula;
    
    // 1. First, temporarily replace symbols and specific terms with unique markers
    // to prevent double-replacement during subsequent passes.
    const markers: Record<string, string> = {};
    Object.keys(replacements).sort((a, b) => b.length - a.length).forEach((key, idx) => {
      const marker = `__MARKER_${idx}__`;
      markers[marker] = replacements[key];
      // Use regex with boundaries for words, literal search for symbols
      const regex = /^[a-zA-Z_]+$/.test(key) ? new RegExp(`\\b${key}\\b`, 'g') : new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = result.replace(regex, marker);
    });

    // 2. Finally, swap markers for their LaTeX equivalents
    Object.keys(markers).forEach(marker => {
      result = result.replace(new RegExp(marker, 'g'), markers[marker]);
    });

    return result;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {problems.map((problem) => (
        <div key={problem.id} className="glass-card p-6 flex flex-col h-full transform transition hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-2">
              {problem.id.toUpperCase()}
            </span>
            <h3 className="text-lg font-semibold text-textPrimary leading-tight">{problem.tipe_kalkulasi}</h3>
          </div>
          <p className="text-textSecondary text-sm flex-grow mb-6">
            {problem.deskripsi}
          </p>
          
          <div className="space-y-4">
            <div className="bg-black/30 rounded-lg p-3 border border-white/5">
              <span className="text-xs text-textSecondary uppercase tracking-wider font-semibold block mb-2">Input Parameters</span>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(problem.input).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-textSecondary/70 truncate" title={key}>{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium">{typeof value === 'number' ? value.toLocaleString('en-US') : value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
              <span className="text-xs text-primary uppercase tracking-wider font-semibold block mb-2">Result</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold gradient-text">
                  {problem.hasil.nilai.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm font-medium text-textPrimary/80">{problem.hasil.satuan}</span>
              </div>
              <div className="mt-3 overflow-x-auto">
                 <span className="text-xs text-textSecondary/60 block mb-1">Formula (Debug):</span>
                 <div className="text-sm text-textPrimary/90 bg-white/5 p-2 rounded border border-white/5 font-mono">
                    {formatFormula(problem.rumus_digunakan)}
                 </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;
