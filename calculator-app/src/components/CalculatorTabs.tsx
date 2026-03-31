import React, { useState } from 'react';
import { calculatePMTfromFV, calculatePVfromFV, calculatePMTOrdinary, calculatePeriod, calculateInterestRate } from '../utils/finance';
import { Calculator, ArrowRight, DollarSign, Percent, Clock } from 'lucide-react';

type Tab = 'PMT (FV)' | 'PV (FV)' | 'PMT (Ordinary)' | 'PMT (Due)' | 'Period (n)' | 'Rate (i)';

const CalculatorTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('PMT (FV)');
  
  const tabs: Tab[] = ['PMT (FV)', 'PV (FV)', 'PMT (Ordinary)', 'PMT (Due)', 'Period (n)', 'Rate (i)'];

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear result when input changes
    if (result !== null) setResult(null);
  };

  const parseNumber = (val: string) => parseFloat(val) || 0;

  const handleCalculate = () => {
    let r = 0;
    const fv = parseNumber(inputs.fv);
    const pv = parseNumber(inputs.pv);
    const pmt = parseNumber(inputs.pmt);
    const i = parseNumber(inputs.i) / 100; // Assuming input as % 
    const n = parseNumber(inputs.n);
    
    switch (activeTab) {
      case 'PMT (FV)':
        r = calculatePMTfromFV(fv, i, n);
        break;
      case 'PV (FV)':
        r = calculatePVfromFV(fv, i, n);
        break;
      case 'PMT (Ordinary)':
        r = calculatePMTOrdinary(pv, i, n);
        break;
      case 'PMT (Due)':
        // Typically PMT due takes present value, rate, and period to find PMT
        // Our formula calculatePMTDue(pmtOrdinary, i) needs ordinary PMT first
        r = calculatePMTOrdinary(pv, i, n) / (1 + i);
        break;
      case 'Period (n)':
        r = calculatePeriod(pv, pmt, i);
        break;
      case 'Rate (i)':
        r = calculateInterestRate(pv, pmt, n) * 100;
        break;
    }
    setResult(r);
  };

  const renderInput = (name: string, label: string, icon: React.ReactNode, placeholder: string, unit?: string) => (
    <div key={name} className="flex flex-col gap-1 mb-4">
      <label className="text-sm text-textSecondary font-medium pl-1">{label}</label>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-textSecondary pointer-events-none">
          {icon}
        </div>
        <input
          type="number"
          name={name}
          value={inputs[name] || ''}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`glass-input pl-10 w-full ${unit ? 'pr-12' : ''}`}
        />
        {unit && (
          <div className="absolute right-3 text-xs font-semibold text-textSecondary/50 pointer-events-none uppercase">
            {unit}
          </div>
        )}
      </div>
    </div>
  );

  const getActiveFields = () => {
    switch (activeTab) {
      case 'PMT (FV)':
      case 'PV (FV)':
        return ['fv', 'i', 'n'];
      case 'PMT (Ordinary)':
      case 'PMT (Due)':
        return ['pv', 'i', 'n'];
      case 'Period (n)':
        return ['pv', 'pmt', 'i'];
      case 'Rate (i)':
        return ['pv', 'pmt', 'n'];
      default:
        return [];
    }
  };

  const fields = getActiveFields();

  return (
    <div className="glass-card flex flex-col h-full sticky top-6 overflow-hidden">
      <div className="p-6 border-b border-white/10 bg-black/20">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Interactive Calculator
        </h2>
      </div>
      
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2 border-b border-white/5 bg-black/10">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setResult(null); setInputs({}); }}
            className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-textSecondary hover:bg-white/5 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex-grow space-y-2">
           {fields.includes('fv') && renderInput('fv', 'Future Value (FV)', <DollarSign className="w-4 h-4" />, '135500', 'USD')}
           {fields.includes('pv') && renderInput('pv', 'Present Value (PV)', <DollarSign className="w-4 h-4" />, '100000', 'USD')}
           {fields.includes('pmt') && renderInput('pmt', 'Payment (PMT)', <DollarSign className="w-4 h-4" />, '10000', 'USD')}
           {fields.includes('i') && renderInput('i', 'Interest Rate (i % per period)', <Percent className="w-4 h-4" />, '6', '%')}
           {fields.includes('n') && renderInput('n', 'Number of Periods (n)', <Clock className="w-4 h-4" />, '14', 'N')}
        </div>

        <button onClick={handleCalculate} className="btn-primary w-full mt-6 flex items-center justify-center gap-2 py-3 text-lg">
          Calculate <ArrowRight className="w-5 h-5" />
        </button>

        {result !== null && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-semibold text-textSecondary uppercase tracking-widest mb-1">Result</span>
            <span className="text-3xl font-bold gradient-text">
              {result === Infinity ? 'Infinite' : (isNaN(result) ? 'Error' : result.toLocaleString('en-US', { maximumFractionDigits: 4 }))}
            </span>
            <span className="text-xs text-textSecondary mt-2 opacity-70">
              {activeTab === 'Rate (i)' ? '% per period' : 'Value'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorTabs;
