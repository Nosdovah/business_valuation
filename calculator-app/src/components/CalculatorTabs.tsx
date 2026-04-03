import React, { useState } from 'react';
import { calculatePMTfromFV, calculatePVfromFV, calculatePMTOrdinary, calculatePeriod, calculateInterestRate } from '../utils/finance';
import { Calculator, ArrowRight } from 'lucide-react';

type Tab = 'PMT (FV)' | 'PV (FV)' | 'PMT (Ordinary)' | 'PMT (Due)' | 'Period (n)' | 'Rate (i)';

const CalculatorTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('PMT (FV)');

  const tabs: Tab[] = ['PMT (FV)', 'PV (FV)', 'PMT (Ordinary)', 'PMT (Due)', 'Period (n)', 'Rate (i)'];

  const [error, setError] = useState<boolean>(false);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Safety check for negative values (though handleKeyDown should prevent them)
    if (value && parseFloat(value) < 0) {
      value = '0';
    }

    setInputs(prev => ({ ...prev, [e.target.name]: value }));
    // Clear states when input changes
    if (result !== null) setResult(null);
    if (error) setError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent negative sign and scientific notation
    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  };

  const parseNumber = (val: string) => parseFloat(val) || 0;

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

  const activeFields = getActiveFields();

  const handleCalculate = () => {
    // Check if any active field is empty
    const hasEmptyField = activeFields.some(field => !inputs[field] || inputs[field].trim() === '');

    if (hasEmptyField) {
      setError(true);
      setResult(null);
      return;
    }

    setError(false);
    let r = 0;
    const fv = parseNumber(inputs.fv);
    const pv = parseNumber(inputs.pv);
    const pmt = parseNumber(inputs.pmt);
    const i = parseNumber(inputs.i) / 100;
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

  const renderInput = (name: string, label: string, placeholder: string, unit?: string) => {
    const isEmpty = !inputs[name] || inputs[name].trim() === '';
    const isError = error && isEmpty;

    return (
      <div key={name} className="flex flex-col gap-1 mb-4">
        <label className={`text-sm font-medium pl-1 transition-colors ${isError ? 'text-red-400' : 'text-textSecondary'}`}>
          {label}
        </label>
        <div className="relative flex items-center">
          <input
            type="number"
            name={name}
            min="0"
            step="any"
            value={inputs[name] || ''}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`glass-input w-full ${unit ? 'pr-12' : ''} ${isError ? 'border-red-500/50 bg-red-500/5 ring-1 ring-red-500/20' : ''}`}
          />
          {unit && (
            <div className={`absolute right-3 text-xs font-semibold pointer-events-none uppercase transition-colors ${isError ? 'text-red-400/50' : 'text-textSecondary/50'}`}>
              {unit}
            </div>
          )}
        </div>
      </div>
    );
  };

  const tabDetails: Record<Tab, { badge: string, title: string, desc: string }> = {
    'PMT (FV)': {
      badge: 'PMT (Berdasarkan FV)',
      title: 'Cari Payment (Berdasarkan FV)',
      desc: 'Menghitung besarnya setoran rutin (anuitas) yang diperlukan untuk mencapai target Future Value tertentu di masa depan.'
    },
    'PV (FV)': {
      badge: 'PV (Berdasarkan FV)',
      title: 'Cari Present Value (Berdasarkan FV)',
      desc: 'Menghitung uang yang harus disetor sekaligus saat ini untuk mencapai target masa depan.'
    },
    'PMT (Ordinary)': {
      badge: 'PMT (Ordinary Annuity)',
      title: 'Cari Payment (Ordinary Annuity)',
      desc: 'Menghitung angsuran atau setoran rutin di akhir periode berdasarkan nilai sekarang (Present Value).'
    },
    'PMT (Due)': {
      badge: 'PMT (Annuity Due)',
      title: 'Cari Payment (Annuity Due)',
      desc: 'Menghitung angsuran atau setoran rutin di awal periode berdasarkan nilai sekarang (Present Value).'
    },
    'Period (n)': {
      badge: 'Period (n)',
      title: 'Cari Jumlah Periode (n)',
      desc: 'Menghitung berapa lama waktu (jumlah periode) yang dibutuhkan untuk melunasi pinjaman atau mencapai target.'
    },
    'Rate (i)': {
      badge: 'Rate (i)',
      title: 'Cari Suku Bunga (i)',
      desc: 'Menghitung besarnya suku bunga per periode dari suatu pinjaman atau investasi.'
    }
  };

  const currentTab = tabDetails[activeTab];

  return (
    <div className="glass-card flex flex-col h-full sticky top-6 overflow-hidden transition-all duration-300">
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
            onClick={() => { setActiveTab(tab); setResult(null); setError(false); setInputs({}); }}
            className={`py-2 px-1 text-xs font-semibold rounded-lg transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-textSecondary hover:bg-white/5 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 flex-grow flex flex-col">

        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-3 uppercase">
            {currentTab.badge}
          </span>
          <h3 className="text-xl font-semibold text-textPrimary leading-tight mb-2">
            {currentTab.title}
          </h3>
          <p className="text-textSecondary text-sm mb-6">
            {currentTab.desc}
          </p>
        </div>

        <div className="flex-grow space-y-2">
          <div className="bg-black/30 rounded-xl p-5 border border-white/5 mb-6">
            <span className="text-xs text-textSecondary uppercase tracking-wider font-semibold block outline-none mb-4">Input Parameters</span>
            <div className="space-y-1">
              {activeFields.includes('fv') && renderInput('fv', 'Future Value (FV)', '135500', 'USD')}
              {activeFields.includes('pv') && renderInput('pv', 'Present Value (PV)', '100000', 'USD')}
              {activeFields.includes('pmt') && renderInput('pmt', 'Payment (PMT)', '10000', 'USD')}
              {activeFields.includes('i') && renderInput('i', 'Interest Rate (i % per period)', '6', '%')}
              {activeFields.includes('n') && renderInput('n', 'Number of Periods (n)', '14', 'N')}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-2 mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-pulse flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            Please fill in all required parameters
          </div>
        )}

        <button onClick={handleCalculate} className="btn-primary w-full mt-2 flex items-center justify-center gap-2 py-3 text-lg font-bold group">
          Calculate <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        {result !== null && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-sm font-semibold text-textSecondary uppercase tracking-widest mb-1">Result</span>
            <span className="text-3xl font-bold gradient-text">
              {result === Infinity ? 'Infinite' : (isNaN(result) ? 'Error' : result.toLocaleString('en-US', { maximumFractionDigits: 4 }))}
            </span>
            <span className="text-xs text-textSecondary mt-2 opacity-70">
              {activeTab === 'Rate (i)' ? '% per period' : (activeTab === 'Period (n)' ? 'Periods' : 'USD')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorTabs;
