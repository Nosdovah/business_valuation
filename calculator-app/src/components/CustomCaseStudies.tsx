import { FolderGit2, Plus, ArrowRight } from 'lucide-react';

const CustomCaseStudies = () => {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full inline-block"></span>
                    Customized Case Studies
                </h2>
                <button className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 px-4 py-2 rounded-lg transition-colors font-medium">
                    <Plus className="w-4 h-4" />
                    <span>New Project</span>
                </button>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
                    <FolderGit2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">No Custom Projects Yet</h3>
                <p className="text-textSecondary max-w-md mx-auto mb-8">
                    Save your specific valuation models or customized scenarios here for future reference and continuous analysis.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl text-left">
                    <div className="bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors flex items-center justify-between">
                            Corporate M&A Model
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </h4>
                        <p className="text-sm text-textSecondary">Template for mergers and acquisitions valuation.</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-primary transition-colors flex items-center justify-between">
                            Startup DCF Analysis
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </h4>
                        <p className="text-sm text-textSecondary">Early stage company discounted cash flow.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomCaseStudies;
