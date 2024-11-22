"use client";

import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (file && !isUploading) {
      setIsUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [file, isUploading]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      setFile(selectedFile);
      setUploadProgress(0);
    } else {
      alert("O arquivo deve ter no máximo 10MB");
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 10 * 1024 * 1024) {
      setFile(droppedFile);
      setUploadProgress(0);
    } else {
      alert("O arquivo deve ter no máximo 10MB");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
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

          <div className="flex flex-col gap-4">
            <Badge className="w-fit bg-[#F3F4F6] text-xs text-titles font-medium rounded-full px-2 py-1">
              0000
            </Badge>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold block">
                  Origem do documento
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
                  Tipo do documento
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

            {!file ? (
              <div
                className="border border-dashed border-green-500 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/file-up.svg"
                    alt="Upload"
                    width={24}
                    height={24}
                  />
                  <p className="text-sm text-gray-600">
                    Arraste e solte aqui ou selecione o arquivo para upload
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
            ) : (
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center mb-2">
                    <div className="grid grid-cols-[1fr,auto] gap-2 w-full">
                      <div className="flex items-center gap-2 flex-1">
                        <Image
                          src="/file-up-gray.svg"
                          alt="File"
                          width={0}
                          height={0}
                          className="bg-gray-100 rounded-full p-3 h-12 w-12"
                        />
                        <div className="flex items-start flex-col gap-1">
                          <span className="text-sm text-gray-700">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(1)} MB
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={handleRemoveFile}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={uploadProgress} className="flex-1" />
                  </div>
                </div>
                <div className="">
                  <Button
                    variant="link"
                    className="text-sm text-green-500 hover:text-green-700 p-0 h-auto font-normal"
                  >
                    Pré-visualizar
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-gray-200"></div>

          <div className="flex flex-col md:flex-row md:justify-end gap-2 md:gap-4">
            <Button
              onClick={handleSubmit}
              disabled={
                !file || isUploading || !documentOrigin || !documentType
              }
              className="bg-green-500 hover:bg-green-600 text-white flex justify-center items-center gap-2 order-1 md:order-2 disabled:opacity-50"
            >
              Criar documento
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-sm text-gray-500 hover:text-gray-700 order-2 md:order-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
