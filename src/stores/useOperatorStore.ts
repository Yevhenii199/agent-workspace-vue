import { create } from 'zustand';

export type OperatorStatus = 'online' | 'away' | 'offline';

interface OperatorState {
  status: OperatorStatus;
  operatorName: string;
  setStatus: (status: OperatorStatus) => void;
}

export const useOperatorStore = create<OperatorState>((set) => ({
  status: 'online',
  operatorName: 'Sarah Chen',
  setStatus: (status) => set({ status }),
}));
