import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const origin = searchParams.get("origin");

    const whereClause: Prisma.DocumentWhereInput = {
      AND: [
        {
          name: { not: "" },
          origin: { not: "" },
          type: { not: "" },
        },
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { origin: { contains: search, mode: "insensitive" } },
                { type: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        type ? { type } : {},
        origin ? { origin } : {},
      ],
    };

    let documents = await prisma.document.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        origin: true,
        type: true,
        tributeValue: true,
        liquidValue: true,
        fileUrl: true,
        fileSize: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (documents.length === 0 && !search && !type && !origin) {
      const sampleDocuments = [
        {
          name: "Contrato de Serviço",
          origin: "interno",
          type: "contrato",
          tributeValue: "R$ 500,00",
          liquidValue: "R$ 5.000,00",
          fileUrl: "/files/contrato.pdf",
          fileSize: 1024 * 1024,
        },
        {
          name: "Nota Fiscal 001",
          origin: "externo",
          type: "nota-fiscal",
          tributeValue: "R$ 200,00",
          liquidValue: "R$ 2.000,00",
          fileUrl: "/files/nf001.pdf",
          fileSize: 512 * 1024,
        },
      ];

      try {
        await prisma.$transaction(async (tx) => {
          for (const doc of sampleDocuments) {
            await tx.document.create({
              data: doc,
            });
          }
        });

        documents = await prisma.document.findMany({
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            name: true,
            origin: true,
            type: true,
            tributeValue: true,
            liquidValue: true,
            fileUrl: true,
            fileSize: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      } catch (createError) {
        console.error("Erro ao criar documentos de exemplo:", createError);
        throw createError;
      }
    }

    const serializedDocuments = documents.map((doc) => ({
      ...doc,
      createdAt:
        doc.createdAt instanceof Date
          ? doc.createdAt.toISOString()
          : new Date(doc.createdAt).toISOString(),
      updatedAt:
        doc.updatedAt instanceof Date
          ? doc.updatedAt.toISOString()
          : new Date(doc.updatedAt).toISOString(),
    }));

    return NextResponse.json(serializedDocuments);
  } catch (error: unknown) {
    console.error("Erro completo:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";

    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
