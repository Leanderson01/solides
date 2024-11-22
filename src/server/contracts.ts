import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const DocumentSchema = z.object({
  id: z.string(),
  name: z.string(),
  origin: z.enum(["interno", "externo"]),
  type: z.enum(["contrato", "nota-fiscal", "relatorio"]),
  fileUrl: z.string(),
  fileSize: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const documentsContract = c.router({
  getDocuments: {
    method: "GET",
    path: "/api/documents",
    query: z.object({
      search: z.string().optional(),
      type: z.string().optional(),
      origin: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
    responses: {
      200: z.array(DocumentSchema),
    },
  },

  createDocument: {
    method: "POST",
    path: "/api/documents",
    body: z.object({
      name: z.string(),
      origin: z.enum(["interno", "externo"]),
      type: z.enum(["contrato", "nota-fiscal", "relatorio"]),
      file: z.any(),
    }),
    responses: {
      201: DocumentSchema,
    },
  },
});
