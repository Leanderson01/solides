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

export default function Filters() {
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
          <Select defaultValue="digitalizado">
            <SelectTrigger className="w-full lg:w-80 h-10">
              <SelectValue placeholder="Origem do documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="digitalizado">Digitalizado</SelectItem>
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
          <Select defaultValue="nota-fiscal">
            <SelectTrigger className="w-full lg:w-80 h-10">
              <SelectValue placeholder="Tipo documental" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nota-fiscal">
                Nota fiscal de serviço
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button className="bg-green-500 hover:bg-green-600 w-40 h-10 text-white font-medium lg:block hidden">
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo documento
        </div>
      </Button>
    </div>
  );
}