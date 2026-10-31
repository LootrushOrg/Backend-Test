import type { EligibilityInput, EligibilityResult } from './types.js';

/**
 * TODO: turn financial features into a 0–100 risk score and approve/reject.
 * Reason codes live in ./reason-codes.ts — use them so the Loans UI has explanations.
 */
export function calculateEligibility(_input: EligibilityInput): EligibilityResult {
  throw new Error('TODO: implement calculateEligibility');
}
