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
    });

    if (documents.length === 0 && !search && !type && !origin) {
      const sampleDocuments = [
        {
          name: "Contrato de Serviço",
          origin: "interno",
          type: "contrato",
          emitter: "Solides",
          tributeValue: "R$ 500,00",
          liquidValue: "R$ 5.000,00",
          fileUrl: "/files/contrato.pdf",
          fileSize: 1024 * 1024,
        },
        {
          name: "Nota Fiscal 001",
          origin: "externo",
          type: "nota-fiscal",
          emitter: "Solides",
          tributeValue: "R$ 200,00",
          liquidValue: "R$ 2.000,00",
          fileUrl: "/files/nf001.pdf",
          fileSize: 512 * 1024,
        },
      ];

      try {
        await prisma.document.deleteMany({});

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
        });
      } catch (createError) {
        console.error("Erro ao criar documentos de exemplo:", createError);
        return NextResponse.json(
          { error: "Erro ao criar documentos de exemplo" },
          { status: 500 }
        );
      }
    }

    const safeDocuments = documents.map((doc) => ({
      ...doc,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));

    return NextResponse.json({ documents: safeDocuments });
  } catch (error) {
    console.error("Erro na rota:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
