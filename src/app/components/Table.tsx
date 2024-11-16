import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Trash2 } from "lucide-react";
import Image from "next/image";

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

export default function Table() {
  return (
    <div>
      <div className="border rounded-lg mb-4 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b text-sm">
              <th className="w-[40px] py-3 px-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="text-left font-medium py-3 px-4">
                Nome do documento
              </th>
              <th className="text-left font-medium py-3 px-4">Emitente</th>
              <th className="text-left font-medium py-3 px-4">
                Valor total dos tributos
              </th>
              <th className="text-left font-medium py-3 px-4">Valor líquido</th>
              <th className="text-left font-medium py-3 px-4">
                Data de criação
              </th>
              <th className="text-left font-medium py-3 px-4">
                Última atualização
              </th>
              <th className="w-[40px]"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((doc, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <Image
                      src="/file.svg"
                      alt="File icon"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">{doc.code}</span>
                      <span>{doc.name}</span>
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
          <tfoot className="border-t bg-gray-50">
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
        </table>
      </div>
      <div className="flex items-center justify-end gap-4 text-sm text-gray-500">
        <span className="text-gray-400">09 de 100</span>
        <div className="flex gap-4">
          <Button
            variant="outline"
            disabled
            className="h-10 w-20 text-gray-600 border-[#D0D5DA] hover:bg-gray-50 rounded-sm"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            className="h-10 w-20 text-gray-600 border-[#D0D5DA] hover:bg-gray-50 rounded-sm"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
