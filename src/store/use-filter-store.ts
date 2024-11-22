import { create } from "zustand";

type FilterStore = {
  date: string;
  documentType: string;
  emitter: string;
  tributeValue: string;
  liquidValue: string;
  setDate: (date: string) => void;
  setDocumentType: (type: string) => void;
  setEmitter: (emitter: string) => void;
  setTributeValue: (value: string) => void;
  setLiquidValue: (value: string) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  date: "",
  documentType: "all",
  emitter: "",
  tributeValue: "",
  liquidValue: "",

  setDate: (date) => set({ date }),
  setDocumentType: (documentType) => set({ documentType }),
  setEmitter: (emitter) => set({ emitter }),
  setTributeValue: (tributeValue) => set({ tributeValue }),
  setLiquidValue: (liquidValue) => set({ liquidValue }),

  clearFilters: () =>
    set({
      date: "",
      documentType: "all",
      emitter: "",
      tributeValue: "",
      liquidValue: "",
    }),
}));
