import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { warmupPrisma } from "./lib/prisma-warmup";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    await warmupPrisma();
  }
  return NextResponse.next();
}
