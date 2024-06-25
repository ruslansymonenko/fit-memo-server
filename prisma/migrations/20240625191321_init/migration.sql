/*
  Warnings:

  - You are about to drop the `Measure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Repeat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Repeat" DROP CONSTRAINT "Repeat_set_id_fkey";

-- DropForeignKey
ALTER TABLE "exercise" DROP CONSTRAINT "exercise_measure_id_fkey";

-- DropTable
DROP TABLE "Measure";

-- DropTable
DROP TABLE "Repeat";

-- CreateTable
CREATE TABLE "repeat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "set_id" INTEGER NOT NULL,

    CONSTRAINT "repeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measure" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" "MeasuresTypes" NOT NULL,

    CONSTRAINT "measure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "measure_type_key" ON "measure"("type");

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_measure_id_fkey" FOREIGN KEY ("measure_id") REFERENCES "measure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repeat" ADD CONSTRAINT "repeat_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
