"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "./ui/badge";
import Image from "next/image";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDocumentDialog({
  open,
  onOpenChange,
}: UploadDocumentDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [documentOrigin, setDocumentOrigin] = useState("");
  const [documentType, setDocumentType] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      alert("O arquivo deve ter no máximo 10MB");
    }

    console.log(selectedFile, file);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 10 * 1024 * 1024) {
      setFile(droppedFile);
    } else {
      alert("O arquivo deve ter no máximo 10MB");
    }
  };

  const handleSubmit = async () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full z-[999]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <DialogTitle>Criar novo documento</DialogTitle>
            <p className="text-sm text-gray-500">
              Insira os dados necessários para criar
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <Badge className="w-fit bg-[#F3F4F6] text-xs text-titles font-medium rounded-full px-2 py-1">
              0000
            </Badge>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold block">
                  Origem do Documento
                </label>
                <Select
                  value={documentOrigin}
                  onValueChange={setDocumentOrigin}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar a origem do documento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interno">Interno</SelectItem>
                    <SelectItem value="externo">Externo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold block">
                  Tipo do Documento
                </label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo do documento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contrato">Contrato</SelectItem>
                    <SelectItem value="nota-fiscal">Nota Fiscal</SelectItem>
                    <SelectItem value="relatorio">Relatório</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div
              className="border-2 border-dashed border-green-500 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <div className="flex flex-col items-center gap-4">
                <Image src="/file-up.svg" alt="Upload" width={32} height={32} />
                <p className="text-sm text-[#3A424E]">
                  Toque aqui e selecione o arquivo para upload
                </p>
                <Button variant="outline" size="sm" className="text-sm">
                  Procurar e selecionar arquivo
                </Button>
                <p className="text-xs text-gray-400">Tamanho max: 10MB</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </div>
            <div className="w-full h-px bg-gray-300" />
          </div>
          <div className="flex flex-col md:flex-row md:justify-end gap-2">
            <Button
              onClick={handleSubmit}
              // disabled={!file || !documentOrigin || !documentType}
              className="bg-green-500 hover:bg-green-600 text-white flex justify-center items-center gap-2 order-1 md:order-2"
            >
              Criar documento
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-sm text-gray-500 hover:text-gray-700 shadow-none order-2 md:order-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
