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
import { PreviewDocumentDialog } from "./preview-document-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  documentSchema,
  type DocumentFormData,
} from "@/lib/validations/document";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDocumentDialog({
  open,
  onOpenChange,
}: UploadDocumentDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedSize, setUploadedSize] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      name: "",
      origin: "interno",
      type: "contrato",
      emitter: "",
      tributeValue: "",
      liquidValue: "",
      fileUrl: "",
      fileSize: 0,
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
      setFile(null);
      setUploadProgress(0);
      setUploadedSize(0);
      setIsUploading(false);
    }
  }, [open, reset]);

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadedSize(0);
    setUploadProgress(0);

    const totalSize = file.size;
    const interval = setInterval(() => {
      setUploadedSize((current) => {
        const newSize = current + totalSize * 0.1;
        const progress = (newSize / totalSize) * 100;

        setUploadProgress(Math.min(progress, 100));

        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return totalSize;
        }
        return newSize;
      });
    }, 500);

    return () => clearInterval(interval);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      setFile(selectedFile);
      simulateUpload(selectedFile);
    } else {
      alert("O arquivo deve ter no máximo 10MB");
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 10 * 1024 * 1024) {
      setFile(droppedFile);
      simulateUpload(droppedFile);
    } else {
      alert("O arquivo deve ter no máximo 10MB");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadedSize(0);
    setIsUploading(false);
  };

  const onSubmit = async (data: DocumentFormData) => {
    console.log("Formulário submetido", data);

    if (!file) {
      toast.error("Por favor, selecione um arquivo");
      return;
    }

    try {
      const formData = {
        ...data,
        fileUrl: file.name,
        fileSize: file.size,
      };

      console.log("Dados a serem enviados:", formData);

      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar documento");
      }

      const responseData = await response.json();
      console.log("Resposta do servidor:", responseData);

      toast.success("Documento adicionado com sucesso!");
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao enviar documento:", error);
      toast.error("Erro ao criar documento");
    }
  };

  const formatFileSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)}`;
  };

  const formatCurrency = (value: string) => {
    let numbers = value.replace(/\D/g, "");

    const amount = Number(numbers) / 100;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const handleCurrencyInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "tributeValue" | "liquidValue"
  ) => {
    const value = e.target.value;
    const formattedValue = formatCurrency(value);
    setValue(field, formattedValue);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full h-full overflow-y-auto max-h-[90vh]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
                    Nome do documento
                  </label>
                  <Input
                    {...register("name")}
                    className={cn(errors.name && "border-red-500")}
                    placeholder="Digite o nome do documento"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold block">Emitente</label>
                  <Input
                    {...register("emitter")}
                    className={cn(errors.emitter && "border-red-500")}
                    placeholder="Digite o nome do emitente"
                  />
                  {errors.emitter && (
                    <span className="text-xs text-red-500">
                      {errors.emitter.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold block">
                    Valor do tributo
                  </label>
                  <Input
                    {...register("tributeValue")}
                    className={cn(errors.tributeValue && "border-red-500")}
                    placeholder="R$ 0,00"
                    onChange={(e) => handleCurrencyInput(e, "tributeValue")}
                    onKeyPress={(e) => {
                      if (!/[\d\b]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.tributeValue && (
                    <span className="text-xs text-red-500">
                      {errors.tributeValue.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold block">
                    Valor líquido
                  </label>
                  <Input
                    {...register("liquidValue")}
                    className={cn(errors.liquidValue && "border-red-500")}
                    placeholder="R$ 0,00"
                    onChange={(e) => handleCurrencyInput(e, "liquidValue")}
                    onKeyPress={(e) => {
                      // Permite apenas números e teclas de controle
                      if (!/[\d\b]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.liquidValue && (
                    <span className="text-xs text-red-500">
                      {errors.liquidValue.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold block">
                    Origem do documento
                  </label>
                  <Select
                    onValueChange={(value: "interno" | "externo") =>
                      setValue("origin", value)
                    }
                  >
                    <SelectTrigger
                      className={cn(errors.origin && "border-red-500")}
                    >
                      <SelectValue placeholder="Selecionar a origem do documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interno">Interno</SelectItem>
                      <SelectItem value="externo">Externo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.origin && (
                    <span className="text-xs text-red-500">
                      {errors.origin.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold block">
                    Tipo do documento
                  </label>
                  <Select
                    onValueChange={(
                      value: "contrato" | "nota-fiscal" | "relatorio"
                    ) => setValue("type", value)}
                  >
                    <SelectTrigger
                      className={cn(errors.type && "border-red-500")}
                    >
                      <SelectValue placeholder="Selecionar tipo do documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contrato">Contrato</SelectItem>
                      <SelectItem value="nota-fiscal">Nota Fiscal</SelectItem>
                      <SelectItem value="relatorio">Relatório</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <span className="text-xs text-red-500">
                      {errors.type.message}
                    </span>
                  )}
                </div>
              </div>

              {!file ? (
                <div
                  className="border border-dashed border-green-500 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
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
                          <div className="flex items-start w-full flex-col gap-1">
                            <span className="text-sm text-gray-700">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatFileSize(uploadedSize)} de{" "}
                              {formatFileSize(file.size)}MB
                            </span>
                            <div className="flex items-center w-full gap-2">
                              <Progress
                                value={uploadProgress}
                                className="flex-1 w-full"
                              />
                            </div>
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
                  </div>
                  <div className="">
                    <Button
                      variant="link"
                      onClick={() => setPreviewOpen(true)}
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
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white flex justify-center items-center gap-2 order-1 md:order-2"
                onClick={handleSubmit(onSubmit)}
              >
                Criar documento
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="text-sm text-gray-500 hover:text-gray-700 order-2 md:order-1"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {file && (
        <PreviewDocumentDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          file={file}
        />
      )}
    </>
  );
}
