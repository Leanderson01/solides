"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadDocumentDialog } from "./upload-document-dialog";

export function AddNewDocument() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-40 z-50 right-6 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Adicionar novo documento"
      >
        <Plus className="h-6 w-6 text-white" />
      </Button>
      <UploadDocumentDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
