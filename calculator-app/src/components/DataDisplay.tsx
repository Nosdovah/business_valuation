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

  const formatStep = (step: string) => {
    // Convert to standard math symbols
    const formatted = step
      .replace(/\s\*\s/g, ' × ')
      .replace(/\s\/\s/g, ' ÷ ')
      .replace(/\*/g, ' × ')
      .replace(/\//g, ' ÷ ');

    // Match superscripts like ^n, ^-n, ^12, ^-12
    const parts = formatted.split(/(\^[-?\d\w]+)/g);
    
    return (
      <span className="font-serif italic tracking-wide flex flex-wrap items-center gap-0.5">
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

  const renderSteps = (problem: KalkulatorData) => {
    const { id, input, hasil } = problem;
    const steps: string[] = [];
    
    const fNum = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 5 });
    const fCur = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

    const getIn = (key: string) => (input[key] || 0) as number;

    switch (id) {
      case 'soal_1a': {
        const fv = getIn('future_value_fv');
        const i = getIn('suku_bunga_i');
        const n = getIn('periode_n');
        const powVal = Math.pow(1 + i, n);
        const numerator = powVal - 1;
        const factor = numerator / i;
        
        steps.push(`PMT = ${fNum(fv)} / (((1 + ${i})^${n} - 1) / ${i})`);
        steps.push(`PMT = ${fNum(fv)} / ((${fNum(1+i)}^${n} - 1) / ${i})`);
        steps.push(`PMT = ${fNum(fv)} / ((${fNum(powVal)} - 1) / ${i})`);
        steps.push(`PMT = ${fNum(fv)} / (${fNum(numerator)} / ${i})`);
        steps.push(`PMT = ${fNum(fv)} / ${fNum(factor)}`);
        break;
      }
      case 'soal_1b': {
        const fv = getIn('future_value_fv');
        const i = getIn('suku_bunga_i');
        const n = getIn('periode_n');
        const powVal = Math.pow(1 + i, n);
        
        steps.push(`PV = ${fNum(fv)} / (1 + ${i})^${n}`);
        steps.push(`PV = ${fNum(fv)} / ${fNum(1+i)}^${n}`);
        steps.push(`PV = ${fNum(fv)} / ${fNum(powVal)}`);
        break;
      }
      case 'soal_2a':
      case 'soal_3': {
        const pv = getIn('present_value_pv');
        const i = (input.suku_bunga_i_bulanan || input.suku_bunga_i || 0) as number;
        const n = (input.periode_n_bulan || input.periode_n || 0) as number;
        const powVal = Math.pow(1 + i, -n);
        const numerator = 1 - powVal;
        const factor = numerator / i;

        steps.push(`PMT = ${fNum(pv)} / ((1 - (1 + ${i})^-${n}) / ${i})`);
        steps.push(`PMT = ${fNum(pv)} / ((1 - ${fNum(1+i)}^-${n}) / ${i})`);
        steps.push(`PMT = ${fNum(pv)} / ((1 - ${fNum(powVal)}) / ${i})`);
        steps.push(`PMT = ${fNum(pv)} / (${fNum(numerator)} / ${i})`);
        steps.push(`PMT = ${fNum(pv)} / ${fNum(factor)}`);
        break;
      }
      case 'soal_2b': {
        const pmt = getIn('pmt_ordinary');
        const i = getIn('suku_bunga_i_bulanan');
        steps.push(`PMT_due = ${fNum(pmt)} / (1 + ${i})`);
        steps.push(`PMT_due = ${fNum(pmt)} / ${fNum(1+i)}`);
        break;
      }
      case 'soal_4': {
        const pv = getIn('present_value_pv');
        const pmt = getIn('payment_pmt');
        const i = getIn('suku_bunga_i');
        const inner = 1 - (pv * i) / pmt;
        const logDenominator = Math.log(1 + i);
        const logNumerator = Math.log(inner);

        steps.push(`n = -(ln(1 - (${fNum(pv)} * ${i}) / ${fNum(pmt)})) / ln(1 + ${i})`);
        steps.push(`n = -(ln(1 - ${fNum(pv * i)} / ${fNum(pmt)})) / ln(${fNum(1+i)})`);
        steps.push(`n = -(ln(1 - ${fNum((pv * i) / pmt)})) / ${fNum(logDenominator)}`);
        steps.push(`n = -(ln(${fNum(inner)})) / ${fNum(logDenominator)}`);
        steps.push(`n = -(${fNum(logNumerator)}) / ${fNum(logDenominator)}`);
        break;
      }
      case 'soal_5': {
        steps.push(`Objective: PV = PMT * ((1 - (1+i)^-n) / i)`);
        steps.push(`Target PV: ${fNum(getIn('present_value_pv'))}`);
        steps.push(`Iterative Search: Using Bisection Method`);
        steps.push(`Convergence achieved at i ≈ ${fNum(hasil.nilai)}`);
        break;
      }
      default:
        return null;
    }

    steps.push(`Final: ${fCur(hasil.nilai)} ${hasil.satuan}`);

    return (
      <div className="space-y-4 mt-2">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 text-sm md:text-base text-textPrimary/90 animate-fade-in opacity-0"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <span className="mt-1 flex-none w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/30">
              {index + 1}
            </span>
            <div className="flex-grow overflow-hidden">
               {formatStep(step)}
            </div>
          </div>
        ))}
      </div>
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
          <p className="text-textSecondary text-sm mb-6">
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

              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-xs text-textSecondary/60 block mb-3 uppercase tracking-wider font-semibold">Mathematical Steps</span>
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 shadow-inner">
                  {renderSteps(problem)}
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
