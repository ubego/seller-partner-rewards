import { CalculatorInputs, CalculatorResults, KpiBreakdown, NextCoefficientStep } from './types';

export const MEETING_REWARD_RATE = 3000;
export const PILOT_CONTRACT_RATE = 10000;
export const PILOT_LAUNCH_RATE = 3000;
export const FULL_CONTRACT_RATE = 20000;
export const FULL_LAUNCH_RATE = 20000;
export const MEETINGS_KPI_BONUS = 10000;
export const DEFAULT_BASE_SALARY = 10000;

export const DEFAULT_PLAN_MEETINGS = 12;
export const DEFAULT_PLAN_PILOT_CONTRACTS = 3;
export const DEFAULT_PLAN_FULL_CONTRACTS = 2;

export const DEFAULT_INPUTS: CalculatorInputs = {
  baseSalary: DEFAULT_BASE_SALARY,
  planMeetings: DEFAULT_PLAN_MEETINGS,
  planPilotContracts: DEFAULT_PLAN_PILOT_CONTRACTS,
  planFullContracts: DEFAULT_PLAN_FULL_CONTRACTS,
  meetings: DEFAULT_PLAN_MEETINGS,
  pilotContracts: DEFAULT_PLAN_PILOT_CONTRACTS,
  fullContracts: DEFAULT_PLAN_FULL_CONTRACTS,
  directFullContracts: 0,
  pilotLaunches: DEFAULT_PLAN_PILOT_CONTRACTS,
  fullLaunches: DEFAULT_PLAN_FULL_CONTRACTS,
  directFullLaunches: 0,
};

const NEXT_TIERS = [
  { percent: 51, coefficient: 1 },
  { percent: 100, coefficient: 1.3 },
  { percent: 150, coefficient: 1.45 },
  { percent: 200, coefficient: 1.57 },
] as const;

export function getKpiCoefficient(achievementPercent: number): number {
  if (achievementPercent < 51) return 0.8;
  if (achievementPercent < 100) return 1;
  if (achievementPercent < 150) return 1.3;
  if (achievementPercent < 200) return 1.45;
  return 1.57;
}

export function getAchievementPercent(actual: number, plan: number): number {
  if (plan <= 0) {
    return actual > 0 ? 200 : 100;
  }
  return (actual / plan) * 100;
}

export function getNextCoefficientStep(actual: number, plan: number): NextCoefficientStep | null {
  if (plan <= 0) return null;
  const currentCoefficient = getKpiCoefficient(getAchievementPercent(actual, plan));

  for (const tier of NEXT_TIERS) {
    const targetActual = Math.ceil((tier.percent / 100) * plan - Number.EPSILON);
    const needed = targetActual - actual;
    if (needed <= 0) continue;

    const coefficientAtTarget = getKpiCoefficient(getAchievementPercent(targetActual, plan));
    if (coefficientAtTarget <= currentCoefficient) continue;

    return {
      needed,
      nextCoefficient: coefficientAtTarget,
      nextPercent: getAchievementPercent(targetActual, plan),
    };
  }

  return null;
}

function clampNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.floor(value);
}

function clampDirect(direct: number, total: number): number {
  return Math.min(clampNonNegative(direct), clampNonNegative(total));
}

function buildKpi(actual: number, plan: number, rate: number): KpiBreakdown {
  const safeActual = clampNonNegative(actual);
  const safePlan = clampNonNegative(plan);
  const achievementPercent = getAchievementPercent(safeActual, safePlan);
  const coefficient = getKpiCoefficient(achievementPercent);
  const payment = Math.round(safeActual * rate * coefficient);

  return {
    actual: safeActual,
    plan: safePlan,
    achievementPercent,
    coefficient,
    payment,
    next: getNextCoefficientStep(safeActual, safePlan),
  };
}

export function calculateReward(inputs: CalculatorInputs): CalculatorResults {
  const meetings = clampNonNegative(inputs.meetings);
  const planMeetings = clampNonNegative(inputs.planMeetings);
  const impliedPilotContracts = clampDirect(inputs.directFullContracts, inputs.fullContracts);
  const impliedPilotLaunches = clampDirect(inputs.directFullLaunches, inputs.fullLaunches);

  const effectivePilotContracts = clampNonNegative(inputs.pilotContracts) + impliedPilotContracts;
  const effectiveFullContracts = clampNonNegative(inputs.fullContracts);
  const effectivePilotLaunches = clampNonNegative(inputs.pilotLaunches) + impliedPilotLaunches;
  const effectiveFullLaunches = clampNonNegative(inputs.fullLaunches);

  const meetingsKpi = buildKpi(meetings, planMeetings, MEETING_REWARD_RATE);
  const meetingsBonusUnlocked = planMeetings > 0 && meetings >= planMeetings;
  const meetingsKpiBonus = meetingsBonusUnlocked ? MEETINGS_KPI_BONUS : 0;

  const pilotContracts = buildKpi(
    effectivePilotContracts,
    clampNonNegative(inputs.planPilotContracts),
    PILOT_CONTRACT_RATE
  );
  const fullContracts = buildKpi(
    effectiveFullContracts,
    clampNonNegative(inputs.planFullContracts),
    FULL_CONTRACT_RATE
  );

  const pilotLaunchesPayment = effectivePilotLaunches * PILOT_LAUNCH_RATE;
  const fullLaunchesPayment = effectiveFullLaunches * FULL_LAUNCH_RATE;
  const baseSalary = clampNonNegative(inputs.baseSalary);

  const total =
    baseSalary +
    meetingsKpi.payment +
    meetingsKpiBonus +
    pilotContracts.payment +
    fullContracts.payment +
    pilotLaunchesPayment +
    fullLaunchesPayment;

  return {
    baseSalary,
    meetings: meetingsKpi,
    meetingsKpiBonus,
    meetingsBonusUnlocked,
    pilotContracts,
    fullContracts,
    impliedPilotContracts,
    pilotLaunchesCount: effectivePilotLaunches,
    impliedPilotLaunches,
    pilotLaunchesPayment,
    fullLaunchesCount: effectiveFullLaunches,
    fullLaunchesPayment,
    total,
  };
}
