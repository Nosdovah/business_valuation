import DataDisplay from './components/DataDisplay';
import CalculatorTabs from './components/CalculatorTabs';
import { Calculator } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen relative pb-20">
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
        <div className="flex-1 w-full order-2 xl:order-1 space-y-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full inline-block"></span>
            Case Studies
          </h2>
          <DataDisplay />
        </div>
        <div className="w-full xl:w-[500px] shrink-0 order-1 xl:order-2">
          <div className="sticky top-6">
             <CalculatorTabs />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
