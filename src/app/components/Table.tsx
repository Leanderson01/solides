import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useMobile } from "@/hooks/use-mobile";
import { useTablet } from "@/hooks/use-tablet";

const data = [
  {
    code: "Cód. 0000",
    name: "Nome do documento",
    emitente: "Courtney Henry",
    valorTributos: "R$200,00",
    valorLiquido: "R$2.000,00",
    dataCriacao: "12 de abril 2024",
    ultimaAtualizacao: "12 de abril 2024",
  },
  {
    code: "Cód. 0000",
    name: "Nome do documento",
    emitente: "Theresa Webb",
    valorTributos: "R$200,00",
    valorLiquido: "R$2.000,00",
    dataCriacao: "12 de abril 2024",
    ultimaAtualizacao: "12 de abril 2024",
  },
  {
    code: "Cód. 0000",
    name: "Nome do documento",
    emitente: "Kristin Watson",
    valorTributos: "R$200,00",
    valorLiquido: "R$2.000,00",
    dataCriacao: "12 de abril 2024",
    ultimaAtualizacao: "12 de abril 2024",
  },
  {
    code: "Cód. 0000",
    name: "Nome do documento",
    emitente: "Jacob Jones",
    valorTributos: "R$200,00",
    valorLiquido: "R$2.000,00",
    dataCriacao: "12 de abril 2024",
    ultimaAtualizacao: "12 de abril 2024",
  },
  {
    code: "Cód. 0000",
    name: "Nome do documento",
    emitente: "Jacob Jones",
    valorTributos: "R$200,00",
    valorLiquido: "R$2.000,00",
    dataCriacao: "12 de abril 2024",
    ultimaAtualizacao: "12 de abril 2024",
  },
  {
    code: "Cód. 0000",
    name: "Nome do documento",
    emitente: "Arlene McCoy",
    valorTributos: "R$200,00",
    valorLiquido: "R$2.000,00",
    dataCriacao: "12 de abril 2024",
    ultimaAtualizacao: "12 de abril 2024",
  },
  {
    code: "Cód. 0000",
    name: "Nome do documento",
    emitente: "Bessie Cooper",
    valorTributos: "R$200,00",
    valorLiquido: "R$2.000,00",
    dataCriacao: "12 de abril 2024",
    ultimaAtualizacao: "12 de abril 2024",
  },
  {
    code: "Cód. 0000",
    name: "Nome do documento",
    emitente: "Jerome Bell",
    valorTributos: "R$200,00",
    valorLiquido: "R$2.000,00",
    dataCriacao: "12 de abril 2024",
    ultimaAtualizacao: "12 de abril 2024",
  },
  {
    code: "Cód. 0000",
    name: "Nome do documento",
    emitente: "Esther Howard",
    valorTributos: "R$200,00",
    valorLiquido: "R$2.000,00",
    dataCriacao: "12 de abril 2024",
    ultimaAtualizacao: "12 de abril 2024",
  },
];

type SortDirection = "asc" | "desc" | null;
type SortField =
  | "name"
  | "emitente"
  | "valorTributos"
  | "valorLiquido"
  | "dataCriacao"
  | "ultimaAtualizacao";

export default function Table() {
  const isMobile = useMobile();
  const isTablet = useTablet();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirections, setSortDirections] = useState<
    Record<SortField, SortDirection>
  >({
    name: "asc",
    emitente: null,
    valorTributos: null,
    valorLiquido: null,
    dataCriacao: null,
    ultimaAtualizacao: null,
  });

  const handleSort = (field: SortField) => {
    setSortDirections((prev) => {
      const newDirections = { ...prev };
      // Reset all other fields
      Object.keys(newDirections).forEach((key) => {
        if (key !== field) {
          newDirections[key as SortField] = null;
        }
      });
      // Toggle current field
      newDirections[field] = prev[field] === "asc" ? "desc" : "asc";
      return newDirections;
    });
    setSortField(field);
  };

  const SortButton = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => {
    const direction = sortDirections[field];
    return (
      <div className="flex items-center gap-2">
        {label}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => handleSort(field)}
        >
          {direction === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : direction === "desc" ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </Button>
      </div>
    );
  };

  const sortedData = [...data].sort((a, b) => {
    const direction = sortDirections[sortField];
    if (!direction) return 0;

    const multiplier = direction === "asc" ? 1 : -1;

    switch (sortField) {
      case "name":
        return multiplier * a.name.localeCompare(b.name);
      case "emitente":
        return multiplier * a.emitente.localeCompare(b.emitente);
      case "valorTributos":
        return (
          multiplier *
          (parseFloat(a.valorTributos.replace(/[^0-9.-]+/g, "")) -
            parseFloat(b.valorTributos.replace(/[^0-9.-]+/g, "")))
        );
      case "valorLiquido":
        return (
          multiplier *
          (parseFloat(a.valorLiquido.replace(/[^0-9.-]+/g, "")) -
            parseFloat(b.valorLiquido.replace(/[^0-9.-]+/g, "")))
        );
      case "dataCriacao":
        return (
          multiplier *
          (new Date(a.dataCriacao).getTime() -
            new Date(b.dataCriacao).getTime())
        );
      case "ultimaAtualizacao":
        return (
          multiplier *
          (new Date(a.ultimaAtualizacao).getTime() -
            new Date(b.ultimaAtualizacao).getTime())
        );
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col h-full">
      <div className="border rounded-lg">
        <div className="overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          <table className="w-full min-w-[900px]">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b text-sm">
                <th className="w-[48px] py-3 px-2 md:block hidden"></th>
                <th className="text-left text-sm font-medium md:text-base py-3 px-4">
                  <SortButton field="name" label="Nome do documento" />
                </th>
                <th className="text-left text-sm font-medium md:text-base py-3 px-4">
                  <SortButton field="emitente" label="Emitente" />
                </th>
                <th className="text-left text-sm font-medium md:text-base py-3 px-4">
                  <SortButton
                    field="valorTributos"
                    label="Valor total dos tributos"
                  />
                </th>
                <th className="text-left text-sm font-medium md:text-base py-3 px-4">
                  <SortButton field="valorLiquido" label="Valor líquido" />
                </th>
                <th className="text-left text-sm font-medium md:text-base py-3 px-4">
                  <SortButton field="dataCriacao" label="Data de criação" />
                </th>
                <th className="text-left text-sm font-medium md:text-base py-3 px-4">
                  <SortButton
                    field="ultimaAtualizacao"
                    label="Última atualização"
                  />
                </th>
                <th className="w-[40px]"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedData.map((doc, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4 md:block hidden">
                    {!isMobile ? (
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedItems.includes(doc.code)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, doc.code]);
                          } else {
                            setSelectedItems(
                              selectedItems.filter((item) => item !== doc.code)
                            );
                          }
                        }}
                      />
                    ) : null}
                  </td>
                  <td className="py-3 px-4 w-full md:w-auto whitespace-nowrap md:whitespace-normal">
                    <div className="flex items-center">
                      <Image
                        src="/file.svg"
                        alt="File icon"
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          {doc.code}
                        </span>
                        <span className="text-sm">{doc.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{doc.emitente}</td>
                  <td className="py-3 px-4">{doc.valorTributos}</td>
                  <td className="py-3 px-4">{doc.valorLiquido}</td>
                  <td className="py-3 px-4">{doc.dataCriacao}</td>
                  <td className="py-3 px-4">{doc.ultimaAtualizacao}</td>
                  <td className="py-3 px-4 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir documento
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
            {!isMobile && !isTablet && (
              <tfoot className="bg-gray-50">
                <tr className="text-sm">
                  <td colSpan={2} className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Total</span>
                      <span>9 documentos</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-gray-500">nº de emitentes</span>
                      <span>8 emitentes</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Total de tributos</span>
                      <span>R$1.800,00</span>
                    </div>
                  </td>
                  <td colSpan={4} className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Total valor líquido</span>
                      <span>R$18.000,00</span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 text-sm text-gray-500 mt-4">
        <span className="text-gray-400 hidden lg:block">09 de 100</span>
        <div className="flex gap-4 w-full lg:w-auto ">
          <Button
            variant="outline"
            disabled
            className="h-10 w-full lg:w-20 text-gray-600 border-[#D0D5DA] hover:bg-gray-50 rounded-sm"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full lg:w-20 text-gray-600 border-[#D0D5DA] hover:bg-gray-50 rounded-sm"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
