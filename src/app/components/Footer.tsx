import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto py-4 bg-[#F9FAFB] text-center text-sm text-gray-500">
      <div className="flex items-center justify-center gap-2">
        <Image src="/logo-footer.svg" alt="e-paper" width={120} height={12} />
        <p>Copyright © 2024 e-paper. </p>
      </div>
    </footer>
  );
}
