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
import { Document } from "@prisma/client";
import { toast } from "sonner";
import { PreviewDocumentDialog } from "@/components/preview-document-dialog";
import { TableSkeleton } from "./TableSkeleton";

type SortDirection = "asc" | "desc" | null;
type SortField =
  | "name"
  | "emitente"
  | "valorTributos"
  | "valorLiquido"
  | "dataCriacao"
  | "ultimaAtualizacao";

const formatDate = (dateString: string | Date): string => {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    console.error("Invalid date:", dateString);
    return error as string;
  }
};

const cleanNumberString = (value: string): number => {
  const cleanValue = value
    .replace("R$", "")
    .replace(/\s/g, "")
    .replace(".", "")
    .replace(",", ".");
  return parseFloat(cleanValue) || 0;
};

interface TableProps {
  documents: Document[];
  onDeleteDocument: (id: string) => void;
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Table({
  documents,
  onDeleteDocument,
  isLoading = false,
  currentPage,
  totalPages,
  onPageChange,
}: TableProps) {
  const isMobile = useMobile();
  const isTablet = useTablet();

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
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
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleSort = (field: SortField) => {
    setSortDirections((prev) => {
      const newDirections = { ...prev };
      Object.keys(newDirections).forEach((key) => {
        if (key !== field) {
          newDirections[key as SortField] = null;
        }
      });
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

  const sortedData = [...documents].sort((a, b) => {
    const direction = sortDirections[sortField];
    if (!direction) return 0;

    const multiplier = direction === "asc" ? 1 : -1;

    switch (sortField) {
      case "name":
        return multiplier * a.name.localeCompare(b.name);
      case "emitente":
        return multiplier * a.emitter.localeCompare(b.emitter);
      case "valorTributos":
        return (
          multiplier *
          (cleanNumberString(a.tributeValue) -
            cleanNumberString(b.tributeValue))
        );
      case "valorLiquido":
        return (
          multiplier *
          (cleanNumberString(a.liquidValue) - cleanNumberString(b.liquidValue))
        );
      case "dataCriacao":
        return (
          multiplier *
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        );
      case "ultimaAtualizacao":
        return (
          multiplier *
          (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
        );
      default:
        return 0;
    }
  });

  const handleDeleteDocument = async (id: string) => {
    try {
      const response = await fetch(`/api/documents?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir documento");
      }

      onDeleteDocument(id);
      toast.success("Documento excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
      toast.error("Erro ao excluir documento");
    }
  };

  const handlePreviewDocument = (doc: Document) => {
    const previewUrl = doc.fileUrl.replace("image/upload", "raw/upload");

    setPreviewUrl(previewUrl);
    setIsPreviewOpen(true);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
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
              {documents.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={8}>
                      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                        <Image
                          src="/file.svg"
                          alt="No documents"
                          width={48}
                          height={48}
                          className="mb-4 opacity-50"
                        />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          Nenhum documento encontrado
                        </h3>
                        <p className="text-sm text-gray-500">
                          Faça upload de documentos para começar a visualizá-los
                          aqui.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <>
                  <tbody className="bg-white">
                    {sortedData.map((doc, i) => (
                      <tr
                        key={i}
                        className="border-b last:border-0 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 md:block hidden">
                          {!isMobile ? (
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                              checked={selectedItems.includes(doc.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedItems([...selectedItems, doc.id]);
                                } else {
                                  setSelectedItems(
                                    selectedItems.filter(
                                      (item) => item !== doc.id
                                    )
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
                                {doc.id}
                              </span>
                              <span className="text-sm">{doc.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{doc.emitter}</td>
                        <td className="py-3 px-4">{doc.tributeValue}</td>
                        <td className="py-3 px-4">{doc.liquidValue}</td>
                        <td className="py-3 px-4">
                          {formatDate(doc.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          {formatDate(doc.updatedAt)}
                        </td>
                        <td className="py-3 px-4 relative">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="flex items-center cursor-pointer"
                                onClick={() => handlePreviewDocument(doc)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center text-red-600 focus:text-red-600 cursor-pointer"
                                onClick={() => handleDeleteDocument(doc.id)}
                              >
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
                            <span>{documents.length} documentos</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="text-gray-500">
                              nº de emitentes
                            </span>
                            <span>
                              {
                                new Set(documents.map((doc) => doc.emitter))
                                  .size
                              }{" "}
                              emitentes
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="text-gray-500">
                              Total de tributos
                            </span>
                            <span>
                              {`R$ ${documents
                                .reduce(
                                  (acc, doc) =>
                                    acc + cleanNumberString(doc.tributeValue),
                                  0
                                )
                                .toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                })}`}
                            </span>
                          </div>
                        </td>
                        <td colSpan={4} className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="text-gray-500">
                              Total valor líquido
                            </span>
                            <span>
                              {`R$ ${documents
                                .reduce(
                                  (acc, doc) =>
                                    acc + cleanNumberString(doc.liquidValue),
                                  0
                                )
                                .toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                })}`}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </>
              )}
            </table>
          </div>
        </div>
        {documents.length > 0 && (
          <div className="flex items-center justify-end gap-4 text-sm text-gray-500 mt-4">
            <span className="text-gray-400 hidden lg:block">
              Página {currentPage} de {totalPages}
            </span>
            <div className="flex gap-4 w-full lg:w-auto">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
                className="h-10 w-full lg:w-20 text-gray-600 border-[#D0D5DA] hover:bg-gray-50 rounded-sm"
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={handleNextPage}
                className="h-10 w-full lg:w-20 text-gray-600 border-[#D0D5DA] hover:bg-gray-50 rounded-sm"
              >
                Próximo
              </Button>
            </div>
          </div>
        )}
      </div>
      <PreviewDocumentDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        fileUrl={previewUrl}
      />
    </>
  );
}
