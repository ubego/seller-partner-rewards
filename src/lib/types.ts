export interface CalculatorInputs {
  baseSalary: number;
  meetingsKpiBonus: number;
  planMeetings: number;
  planPilotContracts: number;
  planFullContracts: number;
  meetings: number;
  /** Explicit Pilot Contracts signed this month (Pilot already paid / counted separately). */
  pilotContracts: number;
  /** Full Contracts signed this month, including direct Full Contracts. */
  fullContracts: number;
  /** Subset of fullContracts with no previously paid Pilot Contract. */
  directFullContracts: number;
  /** Explicit Pilot Launches this month (Pilot Launch already paid / counted separately). */
  pilotLaunches: number;
  /** Full Commercial Launches this month, including direct Full Launches. */
  fullLaunches: number;
  /** Subset of fullLaunches with no previously paid Pilot Launch. */
  directFullLaunches: number;
  /** True when CRM, reporting and documentation are kept correctly and on time. */
  salaryConditionsMet: boolean;
}

export interface NextCoefficientStep {
  needed: number;
  nextCoefficient: number;
  nextPercent: number;
}

export interface KpiBreakdown {
  actual: number;
  plan: number;
  achievementPercent: number;
  coefficient: number;
  payment: number;
  next: NextCoefficientStep | null;
}

export interface CalculatorResults {
  baseSalary: number;
  salaryConditionsMet: boolean;
  meetings: KpiBreakdown;
  meetingsKpiBonus: number;
  meetingsBonusUnlocked: boolean;
  pilotContracts: KpiBreakdown;
  fullContracts: KpiBreakdown;
  impliedPilotContracts: number;
  pilotLaunchesCount: number;
  impliedPilotLaunches: number;
  pilotLaunchesPayment: number;
  fullLaunchesCount: number;
  fullLaunchesPayment: number;
  total: number;
}
