'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  calculateReward,
  DEFAULT_INPUTS,
  FULL_CONTRACT_RATE,
  FULL_LAUNCH_RATE,
  MEETING_REWARD_RATE,
  PILOT_CONTRACT_RATE,
  PILOT_LAUNCH_RATE,
} from '@/lib/calculator';
import { CalculatorInputs } from '@/lib/types';
import { formatCoefficient, formatMoney, formatNumber } from '@/lib/format';
import { Info, Sparkles } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';
import { KpiProgress } from '@/components/KpiProgress';

const DIRECT_FULL_LAUNCH_HINT =
  'Если музей сразу выходит на полный коммерческий запуск, без отдельного пилотного запуска, seller manager получает обе ещё не выплаченные части вознаграждения: 3 000 ₽ за пилотный запуск + 20 000 ₽ за полный коммерческий запуск = 23 000 ₽.';

const FULL_LAUNCH_DEFINITION =
  'Полный коммерческий запуск — момент, когда музей разместил все согласованные рекламные и информационные материалы и начал продавать квест своим посетителям. Только подписание договора или техническая готовность сами по себе не считаются полным коммерческим запуском.';

const DIRECT_FULL_CONTRACT_HINT =
  'Если музей сразу подписывает полный договор, без отдельного пилотного, он учитывается и в KPI пилотных договоров, и в KPI полных договоров. Ранее выплаченные части повторно не начисляются.';

const BASE_SALARY_DESCRIPTION =
  'Оклад — фиксированная базовая часть заработной платы. Он выплачивается за корректное и своевременное ведение CRM, отчётности и документации и не зависит от KPI по встречам, договорам и запускам. Если CRM, отчётность или документация ведутся некорректно или несвоевременно, оклад за месяц не выплачивается.';

type InputName = keyof CalculatorInputs;

const InputField = ({
  label,
  name,
  value,
  hint,
  onChange,
  nested = false,
}: {
  label: string;
  name: InputName;
  value: number;
  hint: string;
  onChange: (name: InputName, value: number) => void;
  nested?: boolean;
}) => (
  <div className={`flex flex-col space-y-2 relative group ${nested ? 'pl-4 border-l-2 border-orange-200' : ''}`}>
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
      onChange={(e) => onChange(name, Number(e.target.value))}
      min="0"
      className="block w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-gray-900 focus:border-[var(--ubego-primary)] focus:ring-2 focus:ring-[var(--ubego-primary)] focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:border-blue-300"
    />
  </div>
);

const ResultCard = ({
  title,
  value,
  formula,
  highlight = false,
  children,
}: {
  title: string;
  value: number;
  formula: string;
  highlight?: boolean;
  children?: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className={`relative p-6 rounded-xl border ${
      highlight ? 'border-yellow-400 bg-yellow-50/50' : 'border-slate-100 bg-white'
    } shadow-sm flex flex-col h-full`}
  >
    <div className="flex justify-between items-start mb-4 gap-2">
      <h3
        className={`text-sm font-bold uppercase ${highlight ? 'text-yellow-700' : 'text-slate-500'} break-words pr-6`}
      >
        {title}
      </h3>
      <div className="shrink-0">
        <Tooltip content={<div className="p-2 text-xs font-mono whitespace-pre-line">{formula}</div>}>
          <Info className={`w-4 h-4 ${highlight ? 'text-yellow-500' : 'text-slate-300'} cursor-help`} />
        </Tooltip>
      </div>
    </div>
    <div className="text-2xl font-bold text-slate-800">{formatMoney(value)}</div>
    {children}
  </motion.div>
);

export default function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const results = useMemo(() => calculateReward(inputs), [inputs]);

  const handleChange = (name: InputName, rawValue: number) => {
    const value = Number.isFinite(rawValue) && rawValue >= 0 ? Math.floor(rawValue) : 0;

    setInputs((prev) => {
      const next = { ...prev, [name]: value };

      if (name === 'directFullContracts' && value > next.fullContracts) {
        next.fullContracts = value;
      }
      if (name === 'fullContracts' && next.directFullContracts > value) {
        next.directFullContracts = value;
      }
      if (name === 'directFullLaunches' && value > next.fullLaunches) {
        next.fullLaunches = value;
      }
      if (name === 'fullLaunches' && next.directFullLaunches > value) {
        next.directFullLaunches = value;
      }

      return next;
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 -mt-20 relative z-20">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/50">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
            <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
            Входные данные
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            <span className="font-semibold text-slate-700">
              Квалифицированные встречи → пилотные договоры → полные договоры
            </span>
          </p>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">
                Планы (KPI)
              </h3>
              <InputField
                label="План встреч"
                name="planMeetings"
                value={inputs.planMeetings}
                onChange={handleChange}
                hint="Целевое количество квалифицированных встреч в месяц. Стандарт: 12."
              />
              <InputField
                label="План пилотных договоров"
                name="planPilotContracts"
                value={inputs.planPilotContracts}
                onChange={handleChange}
                hint="Целевое количество подписанных пилотных договоров. Стандарт: 3."
              />
              <InputField
                label="План полных договоров"
                name="planFullContracts"
                value={inputs.planFullContracts}
                onChange={handleChange}
                hint="Целевое количество подписанных полных договоров. Стандарт: 2."
              />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">
                Трек договоров
              </h3>
              <InputField
                label="Квалифицированные встречи"
                name="meetings"
                value={inputs.meetings}
                onChange={handleChange}
                hint="Фактические квалифицированные встречи за месяц. Каждая встреча оплачивается; план влияет только на коэффициент и бонус 10 000 ₽."
              />
              <InputField
                label="Пилотные договоры"
                name="pilotContracts"
                value={inputs.pilotContracts}
                onChange={handleChange}
                hint="Пилотные договоры, подписанные в этом месяце. Не включайте сюда прямой полный договор — он учитывается полем ниже."
              />
              <InputField
                label="Полные договоры"
                name="fullContracts"
                value={inputs.fullContracts}
                onChange={handleChange}
                hint="Полные договоры, подписанные в этом месяце. Оплачиваются отдельно от запуска и дополнительно к пилотному договору."
              />
              <InputField
                nested
                label="Из них сразу полные"
                name="directFullContracts"
                value={inputs.directFullContracts}
                onChange={handleChange}
                hint={DIRECT_FULL_CONTRACT_HINT}
              />
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">
                Трек запусков
              </h3>
              <InputField
                label="Пилотные запуски"
                name="pilotLaunches"
                value={inputs.pilotLaunches}
                onChange={handleChange}
                hint="Операционный пилотный запуск: квест можно продавать по пилотной модели. Фиксированно 3 000 ₽, без KPI."
              />
              <InputField
                label="Полные коммерческие запуски"
                name="fullLaunches"
                value={inputs.fullLaunches}
                onChange={handleChange}
                hint={FULL_LAUNCH_DEFINITION}
              />
              <InputField
                nested
                label="Из них сразу полные запуски"
                name="directFullLaunches"
                value={inputs.directFullLaunches}
                onChange={handleChange}
                hint={DIRECT_FULL_LAUNCH_HINT}
              />
              <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 rounded-lg p-3">
                {FULL_LAUNCH_DEFINITION}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed bg-orange-50 rounded-lg p-3">
                {DIRECT_FULL_LAUNCH_HINT}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">База</h3>
              <InputField
                label="Оклад"
                name="baseSalary"
                value={inputs.baseSalary}
                onChange={handleChange}
                hint={BASE_SALARY_DESCRIPTION}
              />
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  id="salaryConditionsMet"
                  checked={inputs.salaryConditionsMet}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, salaryConditionsMet: e.target.checked }))
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[var(--ubego-primary)] focus:ring-[var(--ubego-primary)]"
                />
                <span className="text-sm text-slate-700 leading-relaxed">
                  CRM, отчётность и документация ведутся корректно и своевременно
                </span>
              </label>
              <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 rounded-lg p-3">
                {BASE_SALARY_DESCRIPTION}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 h-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Детализация премии</h2>
            <p className="text-sm text-slate-500 mb-6">
              Договоры и запуски считаются независимо и суммируются. KPI-коэффициент применяется только к встречам и
              подписаниям.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResultCard
                title="Базовая часть"
                value={results.baseSalary + results.meetingsKpiBonus}
                highlight={!results.salaryConditionsMet || results.meetingsBonusUnlocked}
                formula={
                  `${results.salaryConditionsMet ? `Оклад: ${formatNumber(results.baseSalary)} ₽` : 'Оклад не выплачен: 0 ₽'}\nБонус за выполнение плана встреч: ${formatNumber(results.meetingsKpiBonus)} ₽`
                }
              >
                <div className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-slate-700">Оклад</span>
                      <span className="font-bold text-slate-800">{formatMoney(results.baseSalary)}</span>
                    </div>
                    <p className="mt-1 text-slate-500">{BASE_SALARY_DESCRIPTION}</p>
                  </div>
                  <div className={`rounded-lg border p-3 ${results.meetingsBonusUnlocked ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-white'}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`font-semibold ${results.meetingsBonusUnlocked ? 'text-amber-800' : 'text-slate-700'}`}>
                        Бонус за выполнение плана встреч
                      </span>
                      <span className={`font-bold ${results.meetingsBonusUnlocked ? 'text-amber-800' : 'text-slate-800'}`}>
                        {formatMoney(results.meetingsKpiBonus)}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-500">
                      {results.meetingsBonusUnlocked
                        ? `План выполнен: ${inputs.meetings} из ${inputs.planMeetings}`
                        : `Выплачивается при выполнении плана: ${inputs.meetings} из ${inputs.planMeetings}`}
                    </p>
                  </div>
                </div>
              </ResultCard>

              <ResultCard
                title="Квалифицированные встречи"
                value={results.meetings.payment}
                highlight={results.meetingsBonusUnlocked}
                formula={`${inputs.meetings} × ${formatNumber(MEETING_REWARD_RATE)} ₽ × ${formatCoefficient(results.meetings.coefficient)}`}
              >
                <KpiProgress
                  kpi={results.meetings}
                  unit={['встреча', 'встречи', 'встреч']}
                />
              </ResultCard>

              <ResultCard
                title="Пилотные договоры"
                value={results.pilotContracts.payment}
                highlight={results.pilotContracts.actual >= results.pilotContracts.plan && results.pilotContracts.plan > 0}
                formula={`${results.pilotContracts.actual} × ${formatNumber(PILOT_CONTRACT_RATE)} ₽ × ${formatCoefficient(results.pilotContracts.coefficient)}${
                  results.impliedPilotContracts > 0
                    ? `\nвключая ${results.impliedPilotContracts} подразумеваемых пилотных (прямой полный договор)`
                    : ''
                }`}
              >
                <KpiProgress kpi={results.pilotContracts} unit={['договор', 'договора', 'договоров']} />
              </ResultCard>

              <ResultCard
                title="Пилотные запуски"
                value={results.pilotLaunchesPayment}
                highlight={results.impliedPilotLaunches > 0}
                formula={`${results.pilotLaunchesCount} × ${formatNumber(PILOT_LAUNCH_RATE)} ₽ (без KPI)${
                  results.impliedPilotLaunches > 0
                    ? `\nвключая ${results.impliedPilotLaunches} подразумеваемых пилотных запусков`
                    : ''
                }`}
              >
                {results.impliedPilotLaunches > 0 && (
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">{DIRECT_FULL_LAUNCH_HINT}</p>
                )}
              </ResultCard>

              <ResultCard
                title="Полные договоры"
                value={results.fullContracts.payment}
                highlight={results.fullContracts.actual >= results.fullContracts.plan && results.fullContracts.plan > 0}
                formula={`${results.fullContracts.actual} × ${formatNumber(FULL_CONTRACT_RATE)} ₽ × ${formatCoefficient(results.fullContracts.coefficient)}`}
              >
                <KpiProgress kpi={results.fullContracts} unit={['договор', 'договора', 'договоров']} />
              </ResultCard>

              <ResultCard
                title="Полные коммерческие запуски"
                value={results.fullLaunchesPayment}
                formula={`${results.fullLaunchesCount} × ${formatNumber(FULL_LAUNCH_RATE)} ₽ (без KPI)`}
              >
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">{FULL_LAUNCH_DEFINITION}</p>
              </ResultCard>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 relative z-30">
              <div className="relative rounded-2xl shadow-lg transform transition-transform hover:scale-[1.01] group">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--ubego-primary)] to-orange-400 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Sparkles className="w-32 h-32 text-white" />
                  </div>
                </div>

                <div className="relative z-10 p-8 text-white flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold uppercase opacity-90 mb-1">Итоговая выплата</h3>
                    <p className="text-sm opacity-75">
                      {results.salaryConditionsMet
                        ? `Включая оклад ${formatMoney(results.baseSalary)}`
                        : 'Оклад не выплачен: условия по CRM, отчётности и документации не выполнены'}
                    </p>
                  </div>
                  <div className="text-5xl md:text-6xl font-extrabold tracking-tight mt-4 md:mt-0 drop-shadow-md">
                    {formatMoney(results.total)}
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-20">
                  <Tooltip
                    content={
                      <div className="space-y-1 text-sm">
                        <div>Оклад: {formatMoney(results.baseSalary)}</div>
                        <div>Встречи: {formatMoney(results.meetings.payment)}</div>
                        <div>Бонус за план встреч: {formatMoney(results.meetingsKpiBonus)}</div>
                        <div>Пилотные договоры: {formatMoney(results.pilotContracts.payment)}</div>
                        <div>Полные договоры: {formatMoney(results.fullContracts.payment)}</div>
                        <div>Пилотные запуски: {formatMoney(results.pilotLaunchesPayment)}</div>
                        <div>Полные запуски: {formatMoney(results.fullLaunchesPayment)}</div>
                        <div className="border-t pt-1 font-bold">= {formatMoney(results.total)}</div>
                      </div>
                    }
                  >
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
