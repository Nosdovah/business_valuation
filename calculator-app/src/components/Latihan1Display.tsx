import React from 'react';
import data from '../data/jawaban_latihan_1.json';

const Latihan1Display: React.FC = () => {
    const { mata_kuliah, topik, jumlah_soal, soal_jawaban } = data.latihan_nilai_waktu_uang;

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

    const renderResult = (soal: any) => {
        if (soal.hasil !== undefined) {
            return (
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold gradient-text">
                        {soal.hasil.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </span>
                </div>
            );
        }
        if (soal.hasil_per_rate) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {Object.entries(soal.hasil_per_rate).map(([key, val]) => (
                        <div key={key} className="bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col justify-center">
                            <span className="text-xs text-textSecondary mb-1 font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                            <span className="text-xl font-bold text-primary">{typeof val === 'number' ? val.toLocaleString('en-US', { maximumFractionDigits: 2 }) : String(val)}</span>
                        </div>
                    ))}
                </div>
            );
        }
        if (soal.hasil_tahun !== undefined) {
            return (
                <div className="flex flex-col gap-1 mt-1">
                    <span className="text-2xl font-bold gradient-text">{soal.hasil_tahun} Years</span>
                    <span className="text-sm font-medium text-textPrimary/80">{soal.konversi_waktu}</span>
                </div>
            );
        }
        if (soal.hasil_decimal !== undefined) {
            return (
                <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold gradient-text">{soal.hasil_persentase}</span>
                    <span className="text-sm font-medium text-textSecondary/80">({soal.hasil_decimal})</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 backdrop-blur-md text-center max-w-3xl mx-auto shadow-xl">
                <h2 className="text-2xl font-bold gradient-text mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{mata_kuliah}</h2>
                <p className="text-textPrimary tracking-wide text-lg mb-4">{topik}</p>
                <span className="inline-block px-4 py-1.5 bg-black/40 rounded-full text-sm font-medium border border-white/10 text-textSecondary uppercase tracking-wider shadow-inner">
                    Total Soal: <span className="text-white font-bold">{jumlah_soal}</span>
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {soal_jawaban.map((soal) => (
                    <div key={soal.nomor} className="glass-card p-6 flex flex-col h-full transform transition hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-2 uppercase">
                                Soal {soal.nomor}
                            </span>
                            <h3 className="text-lg font-semibold text-textPrimary leading-tight">Exercise Case Study {soal.nomor}</h3>
                        </div>
                        <p className="text-textSecondary text-sm mb-6 flex-grow">
                            {soal.deskripsi}
                        </p>

                        <div className="space-y-4">
                            <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                                <span className="text-xs text-textSecondary uppercase tracking-wider font-semibold block mb-2">Input Parameters</span>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {Object.entries(soal.input).map(([key, value]) => (
                                        <div key={key} className="flex flex-col">
                                            <span className="text-textSecondary/70 truncate uppercase text-[10px]" title={key}>
                                                {key.replace(/_/g, ' ')}
                                            </span>
                                            <span className="font-medium">
                                                {Array.isArray(value) ? (
                                                    value.map(v => typeof v === 'number' && v < 1 && v > 0 ? `${v * 100}%` : v).join(', ')
                                                ) : typeof value === 'number'
                                                    ? (key.toLowerCase().includes('bunga') || key.toLowerCase().includes('rate')
                                                        ? `${(value * 100).toLocaleString('en-US', { maximumFractionDigits: 4 })}%`
                                                        : value.toLocaleString('en-US'))
                                                    : typeof value === 'string'
                                                        ? value
                                                        : String(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                                <span className="text-xs text-primary uppercase tracking-wider font-semibold block mb-2 font-accent">Result</span>

                                {renderResult(soal)}

                                {soal.rumus && (
                                    <div className="mt-3 overflow-x-auto">
                                        <span className="text-xs text-textSecondary/60 block mb-1">Formula:</span>
                                        <div className="text-textPrimary/90 bg-white/5 p-3 rounded border border-white/5 min-h-[3rem] flex items-center">
                                            {renderFormula(soal.rumus)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Latihan1Display;
