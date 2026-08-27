'use client';

import { formatCoefficient, formatNumber, formatPercent, pluralize } from '@/lib/format';
import { KpiBreakdown } from '@/lib/types';

type UnitForms = [one: string, few: string, many: string];

interface KpiProgressProps {
  kpi: KpiBreakdown;
  unit: UnitForms;
  meetingsBonus?: {
    unlocked: boolean;
    amount: number;
  };
}

export function KpiProgress({ kpi, unit, meetingsBonus }: KpiProgressProps) {
  const nextLabel = kpi.next
    ? `Ещё ${kpi.next.needed} ${pluralize(kpi.next.needed, ...unit)} → ${formatCoefficient(kpi.next.nextCoefficient)}`
    : null;

  const nextWithBonus =
    nextLabel &&
    meetingsBonus &&
    !meetingsBonus.unlocked &&
    kpi.next &&
    kpi.actual + kpi.next.needed >= kpi.plan
      ? `${nextLabel} и бонус ${formatNumber(meetingsBonus.amount)} ₽`
      : nextLabel;

  return (
    <div className="mt-4 space-y-1 text-sm text-slate-600 leading-relaxed">
      <p>
        {kpi.actual} из {kpi.plan}
      </p>
      <p>Выполнение плана: {formatPercent(kpi.achievementPercent)}</p>
      <p>
        {kpi.actual >= kpi.plan && kpi.plan > 0
          ? `Коэффициент: ${formatCoefficient(kpi.coefficient)}`
          : `Текущий коэффициент: ${formatCoefficient(kpi.coefficient)}`}
      </p>
      {meetingsBonus?.unlocked && (
        <p className="text-amber-700 font-semibold">
          Бонус за выполнение плана встреч: +{formatNumber(meetingsBonus.amount)} ₽
        </p>
      )}
      {nextWithBonus && <p>{nextWithBonus}</p>}
    </div>
  );
}
