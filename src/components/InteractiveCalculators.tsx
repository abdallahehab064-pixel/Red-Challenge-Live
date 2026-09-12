import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, AlertTriangle, ShieldCheck, ArrowLeft, Coins, Briefcase } from 'lucide-react';

export const InteractiveCalculators: React.FC = () => {
  const { setIsBookingModalOpen } = useApp();
  const [activeCalc, setActiveCalc] = useState<'tax' | 'gratuity' | 'fees'>('tax');

  // 1. Egyptian Personal Income Tax Calculator State
  const [annualIncome, setAnnualIncome] = useState<number>(180000);
  const [personalExemption] = useState<number>(20000); // 20,000 EGP standard personal exemption

  // Progressive Egyptian Income Tax estimation
  const calculateEgyptianTax = (taxableGross: number) => {
    const netTaxable = Math.max(0, taxableGross - personalExemption);
    if (netTaxable <= 0) return { tax: 0, effectiveRate: 0 };

    let remaining = netTaxable;
    let totalTax = 0;

    // Brackets (Law 30/2023 & recent updates):
    // 0 to 40,000: 0%
    const b1 = Math.min(remaining, 40000);
    remaining -= b1;

    // 40,001 to 55,000 (15k): 10%
    if (remaining > 0) {
      const b2 = Math.min(remaining, 15000);
      totalTax += b2 * 0.10;
      remaining -= b2;
    }

    // 55,001 to 70,000 (15k): 15%
    if (remaining > 0) {
      const b3 = Math.min(remaining, 15000);
      totalTax += b3 * 0.15;
      remaining -= b3;
    }

    // 70,001 to 200,000 (130k): 20%
    if (remaining > 0) {
      const b4 = Math.min(remaining, 130000);
      totalTax += b4 * 0.20;
      remaining -= b4;
    }

    // 200,001 to 400,000 (200k): 22.5%
    if (remaining > 0) {
      const b5 = Math.min(remaining, 200000);
      totalTax += b5 * 0.225;
      remaining -= b5;
    }

    // Above 400,000: 25%
    if (remaining > 0) {
      totalTax += remaining * 0.25;
    }

    const effectiveRate = taxableGross > 0 ? (totalTax / taxableGross) * 100 : 0;
    return {
      tax: Math.round(totalTax),
      monthlyTax: Math.round(totalTax / 12),
      effectiveRate: effectiveRate.toFixed(1),
    };
  };

  const taxResult = calculateEgyptianTax(annualIncome);

  // 2. Egyptian Labor Law End of Service Gratuity State
  const [monthlySalary, setMonthlySalary] = useState<number>(12000);
  const [yearsOfService, setYearsOfService] = useState<number>(8);

  const calculateGratuity = () => {
    // Egyptian Labor Law (Law 12/2003): 
    // Half month salary for each of first 5 years, full month for each following year
    let total = 0;
    const first5 = Math.min(yearsOfService, 5);
    total += first5 * (monthlySalary * 0.5);

    if (yearsOfService > 5) {
      const remainingYears = yearsOfService - 5;
      total += remainingYears * monthlySalary;
    }
    return Math.round(total);
  };

  // 3. Estimated Legal Filing & Court Fees
  const [claimAmount, setClaimAmount] = useState<number>(250000);
  const estimateCourtFees = () => {
    // Typical Egyptian civil/commercial preliminary court fee bracket approx ~ 3% to 5% with maximum caps and micro-stamps
    const base = claimAmount * 0.035;
    const estimatedMin = Math.round(Math.min(base * 0.8, 15000));
    const estimatedMax = Math.round(Math.min(base * 1.2, 22000));
    return { estimatedMin, estimatedMax };
  };

  const courtFeeResult = estimateCourtFees();

  return (
    <section id="calculators-section" className="py-20 bg-[#07101E] text-[#F5F5F0] border-t border-b border-[#1E2E47] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#112240] border border-[#C9A227]/30 text-[#DFC377] text-xs font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>حاسبات أركان التقديرية الذكية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            حاسبات أركان{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF0CA] to-[#C9A227]">
              المالية والقانونية
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            أدوات رقمية تفاعلية تساعدك في تقدير الالتزامات الضريبية، مستحقات نهاية الخدمة، والتكاليف التقريبية.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0A192F] border border-slate-800">
            <button
              onClick={() => setActiveCalc('tax')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCalc === 'tax'
                  ? 'bg-[#C9A227] text-[#0A192F] shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              حاسبة ضريبة الدخل
            </button>
            <button
              onClick={() => setActiveCalc('gratuity')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCalc === 'gratuity'
                  ? 'bg-[#C9A227] text-[#0A192F] shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              مكافأة نهاية الخدمة
            </button>
            <button
              onClick={() => setActiveCalc('fees')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCalc === 'fees'
                  ? 'bg-[#C9A227] text-[#0A192F] shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              تقدير الرسوم القضائية
            </button>
          </div>
        </div>

        {/* Calculator Cards */}
        <div className="max-w-3xl mx-auto bg-[#0A192F] border border-[#C9A227]/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* TAB 1: Income Tax */}
          {activeCalc === 'tax' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold font-heading text-white">
                  حاسبة ضريبة كسب العمل / الدخل السنوي في مصر
                </h3>
                <Coins className="w-5 h-5 text-[#C9A227]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  إجمالي الدخل أو الراتب السنوي (بالجنيه المصري):
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="30000"
                    max="1000000"
                    step="10000"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="flex-1 accent-[#C9A227] h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="w-32 bg-[#112240] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono text-center focus:border-[#C9A227] focus:outline-none"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>30,000 ج.م</span>
                  <span>يعادل {Math.round(annualIncome / 12).toLocaleString()} ج.م شهرياً</span>
                  <span>1,000,000 ج.م</span>
                </div>
              </div>

              {/* Tax Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-[#112240] border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">الضريبة السنوية التقديرية</span>
                  <div className="text-2xl font-black font-mono text-[#DFC377]">
                    {taxResult.tax.toLocaleString()} ج.م
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#112240] border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">الاستقطاع الشهري التقريبي</span>
                  <div className="text-2xl font-black font-mono text-white">
                    {taxResult.monthlyTax.toLocaleString()} ج.م
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#112240] border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block mb-1">متوسط العبء الضريبي</span>
                  <div className="text-2xl font-black font-mono text-emerald-400">
                    {taxResult.effectiveRate}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Gratuity */}
          {activeCalc === 'gratuity' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold font-heading text-white">
                  حاسبة مكافأة نهاية الخدمة طبقاً لقانون العمل المصري رقم 12 لسنة 2003
                </h3>
                <Briefcase className="w-5 h-5 text-[#C9A227]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    الراتب الشهري الأخير (ج.م):
                  </label>
                  <input
                    type="number"
                    min="3000"
                    step="500"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(Number(e.target.value))}
                    className="w-full bg-[#112240] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-[#C9A227] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    مدة الخدمة المستمرة (بالسنوات):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="45"
                    value={yearsOfService}
                    onChange={(e) => setYearsOfService(Number(e.target.value))}
                    className="w-full bg-[#112240] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-[#C9A227] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#112240] to-[#1B335A] border border-[#C9A227]/40 text-center">
                <span className="text-xs text-[#DFC377] font-bold block mb-1">
                  المكافأة المستحقة التقديرية:
                </span>
                <div className="text-4xl font-black font-mono text-white mb-1">
                  {calculateGratuity().toLocaleString()} ج.م
                </div>
                <p className="text-[11px] text-slate-300">
                  تحسب بواقع نصف شهر عن كل سنة من السنوات الخمس الأولى، وشهر كامل عن كل سنة تالية.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Court Fees */}
          {activeCalc === 'fees' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold font-heading text-white">
                  تقدير الرسوم القضائية النسبية للدعاوى المدنية والتجارية
                </h3>
                <Coins className="w-5 h-5 text-[#C9A227]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  قيمة المطالبة أو الحق المتنازع عليه (ج.م):
                </label>
                <input
                  type="number"
                  min="10000"
                  step="10000"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(Number(e.target.value))}
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:border-[#C9A227] focus:outline-none"
                />
              </div>

              <div className="p-5 rounded-2xl bg-[#112240] border border-slate-800 text-center space-y-2">
                <span className="text-xs text-slate-400 block">النطاق التقديري للرسوم النسبية وصندوق الخدمات</span>
                <div className="text-3xl font-black font-mono text-[#DFC377]">
                  {courtFeeResult.estimatedMin.toLocaleString()} - {courtFeeResult.estimatedMax.toLocaleString()} ج.م
                </div>
                <p className="text-[11px] text-slate-400">
                  تحدد الرسوم النهائية بدقة بمعرفة قلم كتاب المحكمة المختصة وفقاً لطلبات صحيفة الدعوى وقوانين الرسوم القضائية.
                </p>
              </div>
            </div>
          )}

          {/* STRICT MANDATED LEGAL DISCLAIMER (Section 24 & 51) */}
          <div className="mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-300 mb-0.5">تنويه قانوني وضريبي هام:</span>
              النتائج المعروضة تقديرية ولأغراض المعلومات العامة فقط، ولا تُعد بديلاً عن الاستشارة المهنية المتخصصة. تختلف النسب والإعفاءات بحسب ظروف كل حالة وقوانين الضرائب والعمل المحدثة.
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">ترغب في تقييم مالي وقانوني دقيق؟</span>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-2 rounded-xl bg-[#C9A227] text-[#0A192F] font-bold text-xs hover:bg-[#DFC377] transition-all cursor-pointer"
            >
              احجز استشارة مع خبير
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
