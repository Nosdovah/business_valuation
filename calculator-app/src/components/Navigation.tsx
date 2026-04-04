import { Calculator, BarChart3, FolderGit2 } from 'lucide-react';

interface NavigationProps {
  activeTab: 'calculator' | 'case-studies' | 'custom' | 'exercise-1';
  setActiveTab: (tab: 'calculator' | 'case-studies' | 'custom' | 'exercise-1') => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'case-studies', label: 'Exercise 2', icon: BarChart3 },
    { id: 'exercise-1', label: 'Exercise 1', icon: BarChart3 },
    { id: 'custom', label: 'Customized Case Studies', icon: FolderGit2 },
  ] as const;

  return (
    <div className="w-full mt-8 mb-6 container mx-auto px-4 flex justify-center">
      <div className="inline-flex bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-xl overflow-x-auto max-w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap
                ${isActive
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'text-textSecondary hover:text-white hover:bg-white/10'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-primary'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
