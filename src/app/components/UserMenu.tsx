import { Bell, LogOut } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  return (
    <div className="flex items-center space-x-4">
      <Bell className="w-5 h-5 text-gray-600 cursor-pointer hidden md:block" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 border border-[#E5E6EA] rounded-md">
            <div className="flex items-center gap-2">
              <Image
                src="/user.svg"
                alt="User"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex-col items-start hidden md:flex">
                <span className="text-sm text-gray-700 font-bold">
                  Nome do usuário
                </span>
                <span className="text-xs text-gray-400">Organização</span>
              </div>
            </div>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
