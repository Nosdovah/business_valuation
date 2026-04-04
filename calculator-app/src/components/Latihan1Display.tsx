import React from 'react';
import data from '../data/jawaban_latihan_1.json';

const Latihan1Display: React.FC = () => {
    const { soal_jawaban } = data.latihan_nilai_waktu_uang;

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

    const renderSteps = (soal: any) => {
        const steps: string[] = [];
        const fNum = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 5 });
        const fCur = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

        switch (soal.nomor) {
            case 1: {
                const cf = soal.input.cash_flow;
                const n = soal.input.periode_tahun;
                soal.input.suku_bunga_list.forEach((r: number) => {
                    const powVal = Math.pow(1 + r, n);
                    const res = cf * powVal;
                    steps.push(`Rate ${(r * 100).toFixed(0)}%: FV = ${fNum(cf)} × (1 + ${r})^${n}`);
                    steps.push(`Rate ${(r * 100).toFixed(0)}%: FV = ${fNum(cf)} × ${fNum(powVal)} = ${fCur(res)}`);
                });
                break;
            }
            case 2: {
                const cf = soal.input.cash_flow;
                const r = soal.input.suku_bunga;
                const n = soal.input.periode_tahun;
                const powVal = Math.pow(1 + r, n);
                steps.push(`FV = ${fNum(cf)} × (1 + ${r})^${n}`);
                steps.push(`FV = ${fNum(cf)} × ${fNum(powVal)}`);
                steps.push(`FV = ${fCur(soal.hasil)}`);
                break;
            }
            case 3: {
                const fv = soal.input.future_value;
                const n = soal.input.periode_tahun;
                soal.input.suku_bunga_list.forEach((r: number) => {
                    const powVal = Math.pow(1 + r, n);
                    const res = fv / powVal;
                    steps.push(`Rate ${(r * 100).toFixed(0)}%: PV = ${fNum(fv)} ÷ (1 + ${r})^${n}`);
                    steps.push(`Rate ${(r * 100).toFixed(0)}%: PV = ${fNum(fv)} ÷ ${fNum(powVal)} = ${fCur(res)}`);
                });
                break;
            }
            case 4: {
                const fv = soal.input.future_value;
                const r = soal.input.suku_bunga;
                const n = soal.input.periode_tahun;
                const powVal = Math.pow(1 + r, n);
                steps.push(`PV = ${fNum(fv)} ÷ (1 + ${r})^${n}`);
                steps.push(`PV = ${fNum(fv)} ÷ ${fNum(powVal)}`);
                steps.push(`PV = ${fCur(soal.hasil)}`);
                break;
            }
            case 5: {
                const target = soal.input.target_multiplier;
                const r = soal.input.suku_bunga;
                steps.push(`n = ln(${target}) ÷ ln(1 + ${r})`);
                steps.push(`n = ${fNum(Math.log(target))} ÷ ${fNum(Math.log(1 + r))}`);
                steps.push(`n = ${fNum(soal.hasil_tahun)} Tahun`);
                break;
            }
            case 6: {
                const pv = soal.input.present_value;
                const fv = soal.input.future_value;
                const n = soal.input.periode_tahun;
                steps.push(`r = (${fNum(fv)} ÷ ${fNum(pv)})^(1 / ${n}) - 1`);
                steps.push(`r = (${fNum(fv / pv)})^(${fNum(1 / n)}) - 1`);
                steps.push(`r = ${fNum(Math.pow(fv / pv, 1 / n))} - 1`);
                steps.push(`r = ${fNum(soal.hasil_decimal)} (${soal.hasil_persentase})`);
                break;
            }
            case 7: {
                const pv = soal.input.nilai_awal;
                const fv = soal.input.nilai_akhir;
                const n = soal.input.periode_tahun;
                steps.push(`r = (${fNum(fv)} ÷ ${fNum(pv)})^(1 / ${n}) - 1`);
                steps.push(`r = (${fNum(fv / pv)})^(${fNum(1 / n)}) - 1`);
                steps.push(`r = ${fNum(Math.pow(fv / pv, 1 / n))} - 1`);
                steps.push(`r = ${fNum(soal.hasil_decimal)} (${soal.hasil_persentase})`);
                break;
            }
        }

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

                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <span className="text-xs text-textSecondary/60 block mb-3 uppercase tracking-wider font-semibold">Langkah-Langkah Perhitungan</span>
                                    <div className="bg-black/20 rounded-xl p-4 border border-white/5 shadow-inner">
                                        {renderSteps(soal)}
                                    </div>
                                </div>
                            </div>

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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Latihan1Display;
