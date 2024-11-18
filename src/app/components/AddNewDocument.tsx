import { Plus } from "lucide-react";

export function AddNewDocument() {
  return (
    <button
      className="fixed bottom-60 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg lg:hidden"
      aria-label="Adicionar novo documento"
    >
      <Plus className="w-6 h-6 text-white" />
    </button>
  );
}
