import type { EligibilityResult } from '../domain/types.js';
import type { IFinancialDataPort } from '../ports/data-port.js';

export interface CalculateEligibilityDeps {
  dataPort: IFinancialDataPort;
  monthlyIncomeOverride?: number;
}

/**
 * TODO: load FinancialData, map it to EligibilityInput, call calculateEligibility().
 * Persist a LoanEligibilityResult from the loans route after this returns.
 */
export async function calculateEligibilityUseCase(
  _userId: string,
  _deps: CalculateEligibilityDeps
): Promise<EligibilityResult> {
  throw new Error('TODO: implement calculateEligibilityUseCase');
}
