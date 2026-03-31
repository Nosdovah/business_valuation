import './App.css';
import 'katex/dist/katex.min.css';
import DataDisplay from './components/DataDisplay';
import CalculatorTabs from './components/CalculatorTabs';
import { Calculator } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen relative">
      <div className="bg-blobs"></div>
      
      <header className="container mx-auto px-4 py-10">
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

      <main className="container mx-auto px-4 flex flex-col xl:flex-row gap-8 mt-6">
        <div className="flex-1 w-full order-2 xl:order-1 space-y-6 pb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full inline-block"></span>
            Case Studies
          </h2>
          <DataDisplay />
        </div>
        <div className="w-full xl:w-[500px] shrink-0 order-1 xl:order-2 pb-12">
          <div className="sticky top-6">
             <CalculatorTabs />
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-md py-8 mt-12">
        <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-2">
          <p className="text-textSecondary text-sm font-medium tracking-wide uppercase">Developed By</p>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span className="text-xl font-bold gradient-text tracking-tight">Raihan Hanif Firdaus</span>
            <span className="hidden md:block w-px h-4 bg-white/20"></span>
            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/5 text-sm font-mono text-textPrimary/80">
              ID: 023124157
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
