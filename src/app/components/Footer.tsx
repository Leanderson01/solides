import Image from "next/image";

export default function Footer() {
  return (
    <div className="py-4 bg-[#F9FAFB] text-center text-sm text-gray-500">
      <div className="flex items-center justify-center gap-2">
        <Image src="/logo-footer.svg" alt="e-paper" width={120} height={12} />
        <p>
          Copyright © 2024 e-paper.{" "}
          <span className="md:block hidden">Todos os direitos reservados</span>
        </p>
      </div>
    </div>
  );
}