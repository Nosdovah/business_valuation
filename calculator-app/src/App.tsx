import { useState } from 'react';
import './App.css';
import 'katex/dist/katex.min.css';
import DataDisplay from './components/DataDisplay';
import CalculatorTabs from './components/CalculatorTabs';
import Navigation from './components/Navigation';
import CustomCaseStudies from './components/CustomCaseStudies';
import Latihan1Display from './components/Latihan1Display';
import { Calculator } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'case-studies' | 'custom' | 'exercise-1'>('calculator');

  return (
    <div className="min-h-screen relative flex flex-col">
      <div className="bg-blobs"></div>

      <header className="container mx-auto px-4 pt-10 pb-4">
        <div className="flex items-center gap-3 justify-center text-center">
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/5 shadow-xl">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Advanced <span className="gradient-text">Valuation</span>
          </h1>
        </div>
        <p className="text-center text-textSecondary mt-4 max-w-xl mx-auto">
          Interactive financial models and tools for Present Value, Future Value, and Annuity calculations.
        </p>
      </header>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 flex justify-center mt-2 flex-grow">
        {activeTab === 'calculator' && (
          <div className="w-full xl:w-[800px] shrink-0 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CalculatorTabs />
          </div>
        )}

        {activeTab === 'case-studies' && (
          <div className="w-full xl:w-[1000px] space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full inline-block"></span>
              Exercise 2
            </h2>
            <DataDisplay />
          </div>
        )}

        {activeTab === 'exercise-1' && (
          <div className="w-full xl:w-[1000px] space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full inline-block"></span>
              Exercise 1
            </h2>
            <Latihan1Display />
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="w-full xl:w-[1000px] pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CustomCaseStudies />
          </div>
        )}
      </main>

      <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-md py-8 mt-auto">
        <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-2">
          <p className="text-textSecondary text-sm font-medium tracking-wide uppercase">Developed By</p>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span className="text-xl font-bold gradient-text tracking-tight">Raihan Hanif Firdaus</span>
            <span className="hidden md:block w-px h-4 bg-white/20"></span>
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/5 text-sm font-mono text-textPrimary/80">
              NPM: 023124157
            </span>
          </div>
          <p className="text-xs text-textSecondary/40 mt-4 font-accent">
            &copy; {new Date().getFullYear()} Universitas Pakuan
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

