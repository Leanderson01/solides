"use client";

import { useState } from "react";

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

  const handleClearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="pt-14">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0 p-6"
          }`}
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
              <Filters />
              <Table />
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <AddNewDocument />
    </div>
  );
}
