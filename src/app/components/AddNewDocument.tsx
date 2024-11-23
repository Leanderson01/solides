import { UploadDocumentDialog } from "@/components/upload-document-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddNewDocument() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-40 z-50 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Adicionar novo documento"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
      <UploadDocumentDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
