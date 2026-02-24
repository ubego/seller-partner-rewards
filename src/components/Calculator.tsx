'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateReward } from '@/lib/calculator';
import { CalculatorInputs, CalculatorResults } from '@/lib/types';
import { Info, Sparkles } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

// Define components outside to avoid re-creation on render
const InputField = ({ 
  label, 
  name, 
  value, 
  hint,
  onChange
}: { 
  label: string, 
  name: keyof CalculatorInputs, 
  value: number, 
  hint: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <div className="flex flex-col space-y-2 relative group">
    <div className="flex items-center space-x-2">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {label}
      </label>
      <Tooltip content={<div className="p-2 text-xs max-w-xs">{hint}</div>}>
        <Info className="w-4 h-4 text-blue-400 cursor-help hover:text-blue-600 transition-colors" />
      </Tooltip>
    </div>
    <input
      type="number"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      min="0"
      className="block w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-gray-900 focus:border-[var(--ubego-primary)] focus:ring-2 focus:ring-[var(--ubego-primary)] focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:border-blue-300"
    />
  </div>
);

const ResultCard = ({ 
  title, 
  value, 
  formula, 
  isTotal = false,
  highlight = false 
}: { 
  title: string, 
  value: number, 
  formula: string, 
  isTotal?: boolean,
  highlight?: boolean
}) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`relative p-6 rounded-xl border ${highlight ? 'border-yellow-400 bg-yellow-50/50' : 'border-slate-100 bg-white'} shadow-sm flex flex-col justify-between h-full`}
  >
    <div className="flex justify-between items-start mb-4 gap-2">
      <h3 className={`text-sm font-bold uppercase ${highlight ? 'text-yellow-700' : 'text-slate-500'} break-words pr-6`}>{title}</h3>
      <div className="shrink-0">
        <Tooltip content={<div className="p-2 text-xs font-mono">{formula}</div>}>
           <Info className={`w-4 h-4 ${highlight ? 'text-yellow-500' : 'text-slate-300'} cursor-help`} />
        </Tooltip>
      </div>
    </div>
    <div className={`text-2xl font-bold ${isTotal ? 'text-[var(--ubego-accent)] text-4xl' : 'text-slate-800'}`}>
      {value.toLocaleString('ru-RU')} ₽
    </div>
  </motion.div>
);

export default function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    baseSalary: 10000,
    planMeetings: 12,
    planSigned: 4,
    planLaunched: 4,
    meetings: 12,
    signed: 4,
    launched: 4,
  });

  const [results, setResults] = useState<CalculatorResults>({
    meetingReward: 0,
    meetingsKpi: 0,
    signReward: 0,
    signKpi: 0,
    launchReward: 0,
    launchKpi: 0,
    baseSalary: 0,
    total: 0,
  });

  useEffect(() => {
    setResults(calculateReward(inputs));
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: Number(value) >= 0 ? Number(value) : 0,
    }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 -mt-20 relative z-20">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/50">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
            Входные данные
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Планы (KPI)</h3>
              <InputField label="План Встреч" name="planMeetings" value={inputs.planMeetings} onChange={handleChange} hint="Целевое количество встреч на месяц (PLAN_MEETINGS)" />
              <InputField label="План Договоров" name="planSigned" value={inputs.planSigned} onChange={handleChange} hint="Целевое количество подписаний (PLAN_SIGNED)" />
              <InputField label="План Запусков" name="planLaunched" value={inputs.planLaunched} onChange={handleChange} hint="Целевое количество запусков (PLAN_LAUNCHED)" />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Фактические результаты</h3>
              <InputField label="Встречи" name="meetings" value={inputs.meetings} onChange={handleChange} hint="Встречи с ЛПР с демонстрацией продукта за месяц" />
              <InputField label="Подписано" name="signed" value={inputs.signed} onChange={handleChange} hint="Подписанные договоры за месяц" />
              <InputField label="Запущено" name="launched" value={inputs.launched} onChange={handleChange} hint="“Запуски” за месяц (старт продаж + условия)" />
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">База</h3>
               <InputField label="Оклад" name="baseSalary" value={inputs.baseSalary} onChange={handleChange} hint="Фиксированная базовая часть зарплаты" />
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 h-full">
             <h2 className="text-2xl font-bold text-slate-800 mb-6">Детализация Премии</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Meeting Group */}
                <div className="space-y-4 flex flex-col">
                  <ResultCard 
                    title="Выплата за встречи" 
                    value={results.meetingReward} 
                    formula={`300 ₽ × ${inputs.meetings} (Meetings)`} 
                  />
                  <ResultCard 
                    title="Бонус за KPI по встречам" 
                    value={results.meetingsKpi}
                    highlight={inputs.meetings >= inputs.planMeetings} 
                    formula={inputs.meetings >= inputs.planMeetings 
                      ? `План (${inputs.planMeetings}) выполнен! 700 ₽ × ${inputs.meetings}` 
                      : `План (${inputs.planMeetings}) НЕ выполнен. 0 ₽`
                    } 
                  />
                </div>

                {/* Sign Group */}
                <div className="space-y-4 flex flex-col">
                  <ResultCard 
                    title="Выплата за подписание" 
                    value={results.signReward} 
                    formula={`5,000 ₽ × ${inputs.signed} (Signed)`} 
                  />
                  <ResultCard 
                    title="Бонус за KPI по подписаниям" 
                    value={results.signKpi} 
                    highlight={inputs.signed >= inputs.planSigned}
                    formula={inputs.signed >= inputs.planSigned 
                      ? `План (${inputs.planSigned}) выполнен! 2,000 ₽ × ${inputs.signed}` 
                      : `План (${inputs.planSigned}) НЕ выполнен. 0 ₽`
                    } 
                  />
                </div>

                {/* Launch Group */}
                <div className="md:col-span-2 pt-4 border-t border-slate-100">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResultCard 
                      title="Выплата за запуск" 
                      value={results.launchReward} 
                      formula={`20,000 ₽ × ${inputs.launched} (Launched)`} 
                    />
                    <ResultCard 
                      title="Бонус за KPI по запускам" 
                      value={results.launchKpi}
                      highlight={inputs.launched >= inputs.planLaunched} 
                      formula={inputs.launched >= inputs.planLaunched 
                        ? `План (${inputs.planLaunched}) выполнен! 5,000 ₽ × ${inputs.launched}` 
                        : `План (${inputs.planLaunched}) НЕ выполнен. 0 ₽`
                      } 
                    />
                   </div>
                </div>
             </div>

             {/* Total */}
             <div className="mt-8 pt-6 border-t border-slate-100 relative z-30">
               <div className="relative rounded-2xl shadow-lg transform transition-transform hover:scale-[1.01] group">
                  {/* Background with overflow hidden for the decoration */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--ubego-primary)] to-orange-400 rounded-2xl overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Sparkles className="w-32 h-32 text-white" />
                      </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 text-white flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold uppercase opacity-90 mb-1">Итоговая выплата</h3>
                      <p className="text-sm opacity-75">Включая оклад {inputs.baseSalary.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <div className="text-5xl md:text-6xl font-extrabold tracking-tight mt-4 md:mt-0 drop-shadow-md">
                      {results.total.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>

                  {/* Tooltip positioned absolutely, but outside the overflow-hidden container */}
                  <div className="absolute top-4 right-4 z-20">
                    <Tooltip content={
                      <div className="space-y-1">
                        <div>Оклад: {results.baseSalary}</div>
                        <div>+ Встречи: {results.meetingReward + results.meetingsKpi}</div>
                        <div>+ Подписания: {results.signReward + results.signKpi}</div>
                        <div>+ Запуски: {results.launchReward + results.launchKpi}</div>
                        <div className="border-t pt-1 font-bold">= {results.total}</div>
                      </div>
                    }>
                      <div className="cursor-pointer hover:bg-white/20 p-2 rounded-full transition-colors">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                    </Tooltip>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
