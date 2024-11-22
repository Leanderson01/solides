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

type FilterDrawerProps = {
  children: React.ReactNode;
};

export function FilterDrawer({ children }: FilterDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent overlay className="w-full md:max-w-[440px] z-[999]">
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
                  Selecionar período
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" locale={ptBR} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full h-px bg-gray-200 my-6" />
          <div>
            <label className="text-sm font-bold mb-2 block">
              Tipo de documento
            </label>
            <Select>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Nota fiscal de serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="h-10" value="nfs">
                  Nota fiscal de serviço
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div>
              <label className="text-sm font-bold mb-2 block">Emitente</label>
              <Input
                className="h-10 placeholder:text-[#9CA3AF]"
                placeholder="Razão social do emitente"
              />
            </div>

            <div>
              <label className="text-sm font-bold mb-2 block">
                Valor total dos tributos
              </label>
              <Input
                className="h-10 placeholder:text-[#9CA3AF]"
                placeholder="Valor em R$"
              />
            </div>

            <div>
              <label className="text-sm font-bold mb-2 block">
                Valor líquido
              </label>
              <Input
                className="h-10 placeholder:text-[#9CA3AF]"
                placeholder="Valor em R$"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <SheetClose asChild>
              <Button variant="outline">Limpar</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white"
                disabled
              >
                Aplicar filtro
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
