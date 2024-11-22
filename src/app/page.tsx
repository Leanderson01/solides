"use client";

import { useState, useEffect } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { useTablet } from "@/hooks/use-tablet";
import { Document } from "@prisma/client";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Filters from "./components/Filters";
import Table from "./components/Table";
import Footer from "./components/Footer";
import SearchDocuments from "./components/SearchDocuments";
import { AddNewDocument } from "./components/AddNewDocument";
import { useFilterStore } from "@/store/use-filter-store";
import { useMutationStore } from "@/store/use-mutation-store";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [origin, setOrigin] = useState("all");
  const [type, setType] = useState("all");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { date, documentType, emitter, tributeValue, liquidValue } =
    useFilterStore();

  const { shouldRefetch, setShouldRefetch } = useMutationStore();

  const isMobile = useMobile();
  const isTablet = useTablet();

  useEffect(() => {
    const fetchDocuments = async (page: number) => {
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams({
          page: page.toString(),
          limit: "10",
        });

        if (searchValue) {
          searchParams.append("search", searchValue);
        }
        if (origin && origin !== "all") {
          searchParams.append("origin", origin);
        }
        if (type && type !== "all") {
          searchParams.append("type", type);
        }
        if (date) {
          searchParams.append("date", date);
        }
        if (documentType !== "all") {
          searchParams.append("documentType", documentType);
        }
        if (emitter) {
          searchParams.append("emitter", emitter);
        }
        if (tributeValue) {
          searchParams.append("tributeValue", tributeValue);
        }
        if (liquidValue) {
          searchParams.append("liquidValue", liquidValue);
        }

        const response = await fetch(
          `/api/documents?${searchParams.toString()}`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar documentos");
        }

        const data = await response.json();
        setDocuments(data.documents);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);

        if (shouldRefetch) {
          setShouldRefetch(false);
        }
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments(currentPage);
  }, [
    currentPage,
    searchValue,
    origin,
    type,
    date,
    documentType,
    emitter,
    tributeValue,
    liquidValue,
    shouldRefetch,
    setShouldRefetch,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setCurrentPage(1);
  };

  const handleDeleteDocument = (deletedId: string) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((doc) => doc.id !== deletedId)
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 pt-14">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen && !isMobile && !isTablet ? "ml-64" : ""
          } ${isMobile || isTablet ? "p-0" : "ml-16 p-6"}`}
        >
          <div className="p-2 md:p-6">
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between mb-6 gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Documentos</h1>
                  <p className="text-sm text-gray-500">
                    Crie, gerencie e visualize os documentos
                  </p>
                </div>
                <SearchDocuments
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  handleClearSearch={handleClearSearch}
                />
              </div>
              <div className="w-full h-px bg-gray-200 my-6" />
              <Filters
                origin={origin}
                type={type}
                onOriginChange={setOrigin}
                onTypeChange={setType}
                isLoading={isLoading}
              />
              <Table
                documents={documents}
                onDeleteDocument={handleDeleteDocument}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <AddNewDocument />
    </div>
  );
}
