"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Download,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface PreviewDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File;
}

export function PreviewDocumentDialog({
  open,
  onOpenChange,
  file,
}: PreviewDocumentDialogProps) {
  const [numPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setLoading(false);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  const changeScale = (newScale: number) => {
    setScale(Math.min(Math.max(0.5, newScale), 2.0));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        isPreview
        className="max-w-5xl w-[95vw] p-0 h-[90vh] bg-white"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex flex-col">
              <DialogTitle className="text-lg font-semibold">
                Pré-visualização do arquivo
              </DialogTitle>
              <p className="text-sm text-gray-500">{file.name}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 border-b bg-white">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => changeScale(scale - 0.1)}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => changeScale(scale + 0.1)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <select
                className="h-8 px-2 border rounded-md text-sm"
                value={`${Math.round(scale * 100)}`}
                onChange={(e) => changeScale(Number(e.target.value) / 100)}
              >
                <option value="50">50%</option>
                <option value="75">75%</option>
                <option value="100">100%</option>
                <option value="125">125%</option>
                <option value="150">150%</option>
                <option value="200">200%</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => changePage(-1)}
                disabled={pageNumber <= 1}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  className="w-12 h-8 px-2 border rounded-md text-sm text-center"
                  value={pageNumber}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= numPages) {
                      setPageNumber(page);
                    }
                  }}
                  min={1}
                  max={numPages}
                />
                <span className="text-sm text-gray-500">
                  / {numPages} páginas
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => changePage(1)}
                disabled={pageNumber >= numPages}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = pdfUrl;
                  link.download = file.name;
                  link.click();
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 bg-gray-100 overflow-auto p-4">
            <div className="flex justify-center">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <span>Carregando...</span>
                </div>
              ) : (
                <div>
                  <h1>Não foi possível carregar o documento</h1>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 flex justify-end border-t bg-white">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
