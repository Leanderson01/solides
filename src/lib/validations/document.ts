import { z } from "zod";

export const documentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  origin: z.enum(["interno", "externo"], {
    required_error: "Origem é obrigatória",
  }),
  type: z.enum(["contrato", "nota-fiscal", "relatorio"], {
    required_error: "Tipo é obrigatório",
  }),
  emitter: z.string().min(1, "Emitente é obrigatório"),
  tributeValue: z.string().min(1, "Valor do tributo é obrigatório"),
  liquidValue: z.string().min(1, "Valor líquido é obrigatório"),
  fileUrl: z.string().optional(),
  fileSize: z.number().optional(),
});

export type DocumentFormData = z.infer<typeof documentSchema>;
