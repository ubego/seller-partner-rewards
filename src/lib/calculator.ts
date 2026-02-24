import { CalculatorInputs, CalculatorResults } from './types';

export const MEETING_REWARD_RATE = 300;
export const MEETINGS_KPI_RATE = 700;
export const SIGN_REWARD_RATE = 5000;
export const SIGN_KPI_RATE = 2000;
export const QUEST_SALES_LAUNCH_REWARD_RATE = 20000;
export const LAUNCH_KPI_RATE = 5000;

export function calculateReward(inputs: CalculatorInputs): CalculatorResults {
  const { meetings, signed, launched, planMeetings, planSigned, planLaunched, baseSalary } = inputs;

  const meetingReward = MEETING_REWARD_RATE * meetings;
  // If plan is met (meetings >= planMeetings), pay 700 per meeting
  const meetingsKpi = meetings >= planMeetings ? MEETINGS_KPI_RATE * meetings : 0;

  const signReward = SIGN_REWARD_RATE * signed;
  // If plan is met (signed >= planSigned), pay 2000 per signed
  const signKpi = signed >= planSigned ? SIGN_KPI_RATE * signed : 0;

  const launchReward = QUEST_SALES_LAUNCH_REWARD_RATE * launched;
  // If plan is met (launched >= planLaunched), pay 5000 per launched
  const launchKpi = launched >= planLaunched ? LAUNCH_KPI_RATE * launched : 0;

  const total = baseSalary + meetingReward + meetingsKpi + signReward + signKpi + launchReward + launchKpi;

  return {
    meetingReward,
    meetingsKpi,
    signReward,
    signKpi,
    launchReward,
    launchKpi,
    baseSalary: baseSalary,
    total
  };
}
