export interface CalculatorInputs {
  meetings: number;
  signed: number;
  launched: number;
  planMeetings: number;
  planSigned: number;
  planLaunched: number;
  baseSalary: number;
}

export interface CalculatorResults {
  meetingReward: number;
  meetingsKpi: number;
  signReward: number;
  signKpi: number;
  launchReward: number;
  launchKpi: number;
  total: number;
  baseSalary: number;
}
