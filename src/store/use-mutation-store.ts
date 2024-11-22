import { create } from "zustand";

interface MutationStore {
  shouldRefetch: boolean;
  setShouldRefetch: (value: boolean) => void;
}

export const useMutationStore = create<MutationStore>((set) => ({
  shouldRefetch: false,
  setShouldRefetch: (value) => set({ shouldRefetch: value }),
}));
