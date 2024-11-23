import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { useFilterStore } from "@/store/use-filter-store";
import { formatDate } from "date-fns";
import { useState, useEffect } from "react";

type FilterDrawerProps = {
  children: React.ReactNode;
};

export function FilterDrawer({ children }: FilterDrawerProps) {
  const {
    date,
    documentType,
    emitter,
    tributeValue,
    liquidValue,
    setDate,
    setDocumentType,
    setEmitter,
    setTributeValue,
    setLiquidValue,
    clearFilters,
  } = useFilterStore();

  const [displayTributeValue, setDisplayTributeValue] = useState("");
  const [displayLiquidValue, setDisplayLiquidValue] = useState("");

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "tributeValue" | "liquidValue"
  ) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");

    let formattedValue = "";
    if (numericValue) {
      const value = Number(numericValue) / 100;
      formattedValue = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    if (field === "tributeValue") {
      setDisplayTributeValue(formattedValue);
      setTributeValue(formattedValue);
    } else {
      setDisplayLiquidValue(formattedValue);
      setLiquidValue(formattedValue);
    }
  };

  useEffect(() => {
    if (tributeValue) {
      setDisplayTributeValue(tributeValue);
    }
    if (liquidValue) {
      setDisplayLiquidValue(liquidValue);
    }
  }, [tributeValue, liquidValue]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        overlay
        className="w-full md:max-w-[440px] overflow-y-auto pt-20 md:pt-10"
      >
        <SheetHeader>
          <SheetTitle>Filtrar documentos</SheetTitle>
          <p className="text-sm text-gray-500">
            Indique os dados necessários para realizar a filtragem
          </p>
        </SheetHeader>
        <div className="w-full h-px bg-gray-200 my-6" />
        <div className="mt-6 space-y-6">
          <div className="flex items-start gap-2 p-4 rounded-lg border leading-5">
            <AlertCircle className="h-5 w-5  mt-0.5 flex-shrink-0" />
            <span className="text-sm ">
              Selecione o tipo de documento necessário para, a partir dele,
              selecionar os tipos de índice para a filtragem.
            </span>
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">
              Período de criação
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-10"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? formatDate(new Date(date), "dd/MM/yyyy")
                    : "Selecionar período"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date ? new Date(date) : undefined}
                  onSelect={(newDate) => setDate(newDate?.toISOString() || "")}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full h-px bg-gray-200 my-6" />
          <div>
            <label className="text-sm font-bold mb-2 block">
              Tipo de documento
            </label>
            <Select
              value={documentType}
              onValueChange={setDocumentType}
              defaultValue="all"
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="relatorio">Relatório</SelectItem>
                <SelectItem value="contrato">Contrato</SelectItem>
                <SelectItem value="nota-fiscal">Nota fiscal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div>
              <label className="text-sm font-bold mb-2 block">Emitente</label>
              <Input
                className="h-10 placeholder:text-[#9CA3AF]"
                placeholder="Razão social do emitente"
                value={emitter}
                onChange={(e) => setEmitter(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-bold mb-2 block">
                Valor total dos tributos
              </label>
              <Input
                className="h-10 placeholder:text-[#9CA3AF]"
                placeholder="R$ 0,00"
                value={displayTributeValue}
                onChange={(e) => handleValueChange(e, "tributeValue")}
                onKeyPress={(e) => {
                  if (!/[\d\b]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>

            <div>
              <label className="text-sm font-bold mb-2 block">
                Valor líquido
              </label>
              <Input
                className="h-10 placeholder:text-[#9CA3AF]"
                placeholder="R$ 0,00"
                value={displayLiquidValue}
                onChange={(e) => handleValueChange(e, "liquidValue")}
                onKeyPress={(e) => {
                  if (!/[\d\b]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <SheetClose asChild>
              <Button variant="outline" onClick={clearFilters}>
                Limpar
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
                Aplicar filtro
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
