import React from 'react';
import data from '../data/jawaban_latihan.json';
import type { KalkulatorData } from '../types/finance';

const DataDisplay: React.FC = () => {
  const problems = data.kalkulator_anuitas_data as unknown as KalkulatorData[];

  const renderFormula = (formula: string) => {
    if (!formula) return null;
    
    // Convert to standard math symbols
    const formatted = formula
      .replace(/\s\*\s/g, ' × ')
      .replace(/\s\/\s/g, ' ÷ ')
      .replace(/\*/g, ' × ')
      .replace(/\//g, ' ÷ ');

    // Match superscripts like ^n, ^-n, ^12
    const parts = formatted.split(/(\^[-?\d\w]+)/g);
    
    return (
      <span className="font-serif italic text-base tracking-wide flex flex-wrap items-center gap-0.5">
        {parts.map((part, i) => {
          if (part.startsWith('^')) {
            return (
              <sup key={i} className="text-[0.65em] font-bold not-italic translate-y-[-0.1em] inline-block">
                {part.slice(1)}
              </sup>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {problems.map((problem) => (
        <div key={problem.id} className="glass-card p-6 flex flex-col h-full transform transition hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-2 uppercase">
              {problem.id.replace(/_/g, ' ')}
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
                    <span className="text-textSecondary/70 truncate uppercase text-[10px]" title={key}>
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="font-medium">
                      {typeof value === 'number' 
                        ? (key.toLowerCase().includes('bunga') || key.toLowerCase().includes('rate') || key.toLowerCase().includes('interest')
                           ? `${(value * 100).toLocaleString('en-US', { maximumFractionDigits: 4 })}%`
                           : value.toLocaleString('en-US'))
                        : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
              <span className="text-xs text-primary uppercase tracking-wider font-semibold block mb-2 font-accent">Result</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold gradient-text">
                  {problem.hasil.nilai.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm font-medium text-textPrimary/80">{problem.hasil.satuan}</span>
              </div>
              <div className="mt-3 overflow-x-auto">
                 <span className="text-xs text-textSecondary/60 block mb-1">Formula:</span>
                 <div className="text-textPrimary/90 bg-white/5 p-3 rounded border border-white/5 min-h-[3rem] flex items-center">
                    {renderFormula(problem.rumus_digunakan)}
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
