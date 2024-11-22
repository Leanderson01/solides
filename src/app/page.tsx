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

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [origin, setOrigin] = useState("all");
  const [type, setType] = useState("all");
  const [documents, setDocuments] = useState<Document[]>([]);
  const isMobile = useMobile();
  const isTablet = useTablet();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const searchParams = new URLSearchParams();
        if (searchValue) {
          searchParams.append("search", searchValue);
        }
        if (origin && origin !== "all") {
          searchParams.append("origin", origin);
        }
        if (type && type !== "all") {
          searchParams.append("type", type);
        }

        const response = await fetch(
          `/api/documents?${searchParams.toString()}`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar documentos");
        }

        const data = await response.json();
        setDocuments(data.documents);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      }
    };
    fetchDocuments();
  }, [searchValue, origin, type]);

  const handleClearSearch = () => {
    setSearchValue("");
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
              />
              <Table documents={documents} />
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <AddNewDocument />
    </div>
  );
}
