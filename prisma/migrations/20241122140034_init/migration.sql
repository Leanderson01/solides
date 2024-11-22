-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "origin" SET DEFAULT 'interno',
ALTER COLUMN "type" SET DEFAULT 'contrato',
ALTER COLUMN "tributeValue" SET DEFAULT 'R$ 0,00',
ALTER COLUMN "liquidValue" SET DEFAULT 'R$ 0,00',
ALTER COLUMN "fileUrl" SET DEFAULT '/files/default.pdf',
ALTER COLUMN "fileSize" SET DEFAULT 0;
