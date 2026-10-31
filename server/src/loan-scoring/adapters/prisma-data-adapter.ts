import type { FinancialData, IFinancialDataPort } from '../ports/data-port.js';

/** TODO: aggregate the user's accounts, transactions, budgets, and fraud signals. */
export class PrismaFinancialDataAdapter implements IFinancialDataPort {
  async getFinancialData(_userId: string): Promise<FinancialData> {
    throw new Error('TODO: implement PrismaFinancialDataAdapter.getFinancialData');
  }
}
