"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";

interface FiltersProps {
  origin: string;
  type: string;
  onOriginChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function Filters({
  origin,
  type,
  onOriginChange,
  onTypeChange,
}: FiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-1">
            <span className="text-sm text-titles font-bold">
              Origem do documento
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Image
                      src="/tooltip.svg"
                      alt="Info"
                      width={16}
                      height={16}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Informações sobre origem do documento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={origin} onValueChange={onOriginChange}>
            <SelectTrigger className="w-full lg:w-80 h-10">
              <SelectValue placeholder="Origem do documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="interno">Interno</SelectItem>
              <SelectItem value="externo">Externo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-1">
            <span className="text-sm text-titles font-bold">
              Tipo documental
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Image
                      src="/tooltip.svg"
                      alt="Info"
                      width={16}
                      height={16}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Informações sobre tipo documental</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger className="w-full lg:w-80 h-10">
              <SelectValue placeholder="Tipo documental" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="contrato">Contrato</SelectItem>
              <SelectItem value="nota-fiscal">Nota Fiscal</SelectItem>
              <SelectItem value="relatorio">Relatório</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        className="bg-green-500 hover:bg-green-600 w-40 h-10 text-white font-medium lg:block hidden"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo documento
        </div>
      </Button>
      <UploadDocumentDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
