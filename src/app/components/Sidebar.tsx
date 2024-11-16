"use client";

import * as React from "react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-14 left-0 bottom-0 bg-[hsl(var(--sidebar-background))] border-r z-30 
          transition-all duration-300 ease-in-out overflow-y-auto
          ${isOpen ? "w-64" : "w-0"}
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
    </>
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
        w-full flex items-center gap-3 px-3 py-1 rounded-md
        transition-colors
        ${
          isActive
            ? "bg-green-100 text-black hover:bg-green-200"
            : "hover:bg-gray-200"
        }
        ${!isOpen && "justify-center"}
      `}
    >
      <div
        className={`
          flex items-center justify-center
          ${isActive ? "text-black" : "text-gray-500"}
          ${!isOpen ? "w-8 h-8" : "w-10 h-10"}
        `}
      >
        <Image src={icon} alt={title} width={24} height={24} />
      </div>
      {isOpen && <span className="text-sm font-medium">{title}</span>}
    </button>
  );
}
