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
import { Document, Page, pdfjs } from "react-pdf";
import { useMobile } from "@/hooks/use-mobile";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js`;

interface PreviewDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file?: File;
  fileUrl?: string;
}

export function PreviewDocumentDialog({
  open,
  onOpenChange,
  file,
  fileUrl,
}: PreviewDocumentDialogProps) {
  const isMobile = useMobile();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(isMobile ? 0.5 : 1.0);
  const [error, setError] = useState<string | null>(null);

  const documentUrl = file
    ? URL.createObjectURL(file)
    : fileUrl?.includes("cloudinary")
    ? fileUrl
    : fileUrl;

  useEffect(() => {
    if (open) {
      setError(null);
    }
  }, [open, documentUrl]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Erro ao carregar PDF:", error);
    setError(
      "Não foi possível carregar o documento. Por favor, tente novamente."
    );
  };

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
        className="max-w-10xl w-full md:w-[95vw] p-0 h-[100vh] bg-white flex flex-col"
        isPreview
      >
        <div className="flex-none">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex flex-col">
              <DialogTitle className="text-lg font-semibold">
                Pré-visualização do arquivo
              </DialogTitle>
              <p className="text-sm text-gray-500">{file?.name}</p>
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
                  link.href = file ? URL.createObjectURL(file) : fileUrl || "";
                  link.download = file?.name || "";
                  link.click();
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className="flex justify-center min-h-full">
            {error ? (
              <div className="flex items-center justify-center text-red-500">
                {error}
              </div>
            ) : (
              <Document
                file={documentUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                options={{
                  cMapUrl:
                    "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.6.172/cmaps/",
                  cMapPacked: true,
                  standardFontDataUrl:
                    "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.6.172/standard_fonts/",
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            )}
          </div>
        </div>

        <div className="flex-none p-4 flex justify-end border-t bg-white">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
