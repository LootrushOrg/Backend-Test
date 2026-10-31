export type User = {
  id: string;
  walletAddress: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: string;
};

export type Goal = {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  createdAt: string;
};

export const users: User[] = [
  {
    id: 'user-demo',
    walletAddress: null,
    email: null,
    firstName: 'Sandbox',
    lastName: 'User',
    role: 'user',
  },
];

/** In-memory goals for the Savings exercise. Cleared when the server restarts. */
export const goals: Goal[] = [];
