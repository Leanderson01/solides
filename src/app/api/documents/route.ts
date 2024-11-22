import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { documentSchema } from "@/lib/validations/document";
import { cloudinary } from "@/lib/cloudinary";

// Interface para o resultado do Cloudinary
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const origin = searchParams.get("origin");
    const date = searchParams.get("date");
    const documentType = searchParams.get("documentType");
    const emitter = searchParams.get("emitter");
    const tributeValue = searchParams.get("tributeValue");
    const liquidValue = searchParams.get("liquidValue");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

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
        type && type !== "all" ? { type } : {},
        origin && origin !== "all" ? { origin } : {},
        date
          ? {
              createdAt: {
                gte: new Date(date),
                lt: new Date(
                  new Date(date).setDate(new Date(date).getDate() + 1)
                ),
              },
            }
          : {},
        documentType && documentType !== "all" ? { type: documentType } : {},
        emitter ? { emitter: { contains: emitter, mode: "insensitive" } } : {},
        tributeValue
          ? { tributeValue: { contains: tributeValue, mode: "insensitive" } }
          : {},
        liquidValue
          ? { liquidValue: { contains: liquidValue, mode: "insensitive" } }
          : {},
      ],
    };

    // Buscar total de documentos
    const totalDocuments = await prisma.document.count({
      where: whereClause,
    });

    // Buscar documentos com paginação
    let documents = await prisma.document.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    if (
      documents.length === 0 &&
      !search &&
      !type &&
      !origin &&
      !date &&
      !documentType &&
      !emitter &&
      !tributeValue &&
      !liquidValue
    ) {
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

    return NextResponse.json({
      documents: safeDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page,
      totalDocuments,
    });
  } catch (error) {
    console.error("Erro na rota:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    console.log("Arquivo recebido:", file.name, file.size);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw",
              folder: "solides-documents",
              upload_preset: "ml_default",
              access_mode: "public",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as CloudinaryUploadResult);
            }
          )
          .end(buffer);
      }
    );

    console.log("Upload Cloudinary bem sucedido:", result.secure_url);

    const data = JSON.parse(formData.get("data") as string);

    const validatedData = documentSchema.parse({
      ...data,
      fileUrl: result.secure_url,
      fileSize: file.size,
    });

    const document = await prisma.document.create({
      data: validatedData,
    });

    console.log("Documento salvo com URL:", document.fileUrl);

    return NextResponse.json(document);
  } catch (error) {
    console.error("Erro detalhado:", error);
    return NextResponse.json(
      { error: "Erro ao criar documento" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "ID do documento não fornecido" },
      { status: 400 }
    );
  }
  await prisma.document.delete({ where: { id } });
  return NextResponse.json({ message: "Documento deletado com sucesso" });
}
