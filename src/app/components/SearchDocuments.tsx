import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Filter } from "lucide-react";
import { FilterDrawer } from "./FilterDrawer";

type SearchDocumentsProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleClearSearch: () => void;
};

export default function SearchDocuments({
  searchValue,
  setSearchValue,
  handleClearSearch,
}: SearchDocumentsProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-4">
      <div className="relative w-full lg:w-80">
        <Input
          className="w-full lg:w-80 h-10 text-sm pr-10 border-[#D0D5DA]"
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
      <FilterDrawer>
        <Button
          variant="outline"
          size="icon"
          className="flex gap-2 items-center w-full px-0 h-10 lg:w-32 lg:px-2 font-bold"
        >
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </FilterDrawer>
    </div>
  );
}
