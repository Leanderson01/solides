"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Filter, LogOut, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import Table from "./components/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleClearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-40">
        <div className="flex items-center px-4 h-14 py-2">
          {/* Menu */}
          <button
            className="p-2 hover:bg-gray-100 rounded-sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <div className="flex items-center ml-4">
            <Image src="/logo.svg" alt="e-paper" width={120} height={12} />
          </div>
          <div className="w-px h-8 bg-gray-200 mx-4" />
          <div className="flex items-center ml-4">
            <Button variant="ghost" className="text-gray-600">
              <Image src="/square.svg" alt="Soluções" width={20} height={20} />
              Soluções
            </Button>
          </div>
          {/* User */}
          <div className="ml-auto flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 border border-[#E5E6EA] rounded-md">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/user.svg"
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-gray-700 font-bold">
                        Nome do usuário
                      </span>
                      <span className="text-xs text-gray-400">Organização</span>
                    </div>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {/* Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <div className="p-6 pr-12">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-6 w-full">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Documentos</h1>
                  <p className="text-sm text-gray-500">
                    Crie, gerencie e visualize os documentos
                  </p>
                </div>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-4">
                  <div className="relative">
                    <Input
                      className="w-80 h-10 text-xl pr-10 border-[#D0D5DA]"
                      placeholder="Buscar documentos"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {searchValue ? (
                      <button
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : (
                      <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex gap-2 items-center w-24 px-0 h-10"
                  >
                    <Filter className="h-4 w-4" />
                    Filtrar
                  </Button>
                </div>
              </div>
              <div className="w-full h-px bg-gray-200 my-6" />
              {/* Filter */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
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
                      <SelectTrigger className="w-80 h-10">
                        <SelectValue placeholder="Origem do documento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digitalizado">
                          Digitalizado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1">
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
                      <SelectTrigger className="w-80 h-10">
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
                <Button className="bg-green-500 hover:bg-green-600 w-40 h-10 text-white font-medium">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Novo documento
                  </div>
                </Button>
              </div>
              {/* Table */}
              <Table />
            </div>
          </div>
        </main>
      </div>
      {/* Footer */}
      <footer className=" py-4 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-2">
          <Image src="/logo-footer.svg" alt="e-paper" width={120} height={12} />
          <p>© 2024 e-paper. Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
