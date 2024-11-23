"use client";

import * as React from "react";
import Image from "next/image";
import { useMobile } from "@/hooks/use-mobile";
import { useTablet } from "@/hooks/use-tablet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const isMobile = useMobile();
  const isTablet = useTablet();
  const shouldUseSheet = isMobile || isTablet;

  if (shouldUseSheet) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          overlay={false}
          side="left"
          className="w-full p-0 mt-14 border-t"
          hideCloseButton
        >
          <SheetHeader className="px-3 py-2">
            <SheetTitle>
              <SidebarItem
                icon="/file-side.svg"
                title="Documentos"
                isActive={true}
                isOpen={true}
              />
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={`
        fixed top-14 left-0 bottom-0 bg-[hsl(var(--sidebar-background))] border-r z-30 
        transition-all duration-300 ease-in-out overflow-y-auto
        hidden lg:block
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      <div className="flex flex-col h-full py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <SidebarItem
              icon="/file-side.svg"
              title="Documentos"
              isActive={true}
              isOpen={isOpen}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  icon: string;
  title: string;
  isActive?: boolean;
  isOpen: boolean;
}

function SidebarItem({ icon, title, isActive, isOpen }: SidebarItemProps) {
  return (
    <button
      className={`
        w-full flex items-center gap-3 rounded-md
        transition-colors
        ${
          isActive
            ? "bg-green-200 text-black hover:bg-green-300"
            : "hover:bg-gray-200"
        }
        ${!isOpen && "justify-center"}
      `}
    >
      <div
        className={`
          flex items-center justify-center
          ${isActive ? "text-black" : "text-gray-500"}
          ${!isOpen ? "w-8 h-8" : "w-8 h-8"}
        `}
      >
        <Image src={icon} alt={title} width={20} height={20} />
      </div>
      {isOpen && <span className="text-sm font-normal">{title}</span>}
    </button>
  );
}
