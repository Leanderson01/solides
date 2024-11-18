"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserMenu from "./UserMenu";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Header({
  isSidebarOpen,
  setIsSidebarOpen,
}: HeaderProps) {
  return (
    <header className="fixed bg-white border-b z-[998] md:z-50 w-full">
      <div className="flex items-center justify-between px-4 h-14 py-2">
        <div className="flex items-center flex-1">
          <button
            className="p-2 hover:bg-gray-100 rounded-sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Image src="/menu.svg" alt="Menu" width={20} height={20} />
          </button>
          <Image src="/logo.svg" alt="e-paper" width={120} height={12} />
          <div className="w-px h-8 bg-gray-200 mx-4" />
          <div className="flex items-center">
            <Button variant="ghost" className="text-gray-600">
              <Image src="/square.svg" alt="Soluções" width={20} height={20} />
              <p className="md:block hidden">Soluções</p>
            </Button>
          </div>
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
