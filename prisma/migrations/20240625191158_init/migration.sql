-- CreateEnum
CREATE TYPE "MeasuresTypes" AS ENUM ('KILOGRAM', 'KILOMETERS', 'REPEATS', 'METERS', 'HOURS', 'MINUTES', 'SECONDS', 'CALORIES');

-- CreateEnum
CREATE TYPE "WorkoutStatus" AS ENUM ('NEW', 'IN_PROGGRES', 'DONE');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT DEFAULT 'User',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_data" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "age" INTEGER,
    "user_avatar" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "user_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_photos" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "photo" TEXT NOT NULL,
    "user_data_id" INTEGER NOT NULL,

    CONSTRAINT "user_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "WorkoutStatus" NOT NULL,
    "duration" INTEGER,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "type_id" INTEGER NOT NULL,

    CONSTRAINT "workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_type" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "icon_id" INTEGER NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "workout_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_type_icons" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "workout_type_icons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "workout_id" INTEGER,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "workout_id" INTEGER,
    "measure_id" INTEGER,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "set" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "exercise_id" INTEGER,

    CONSTRAINT "set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repeat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "set_id" INTEGER NOT NULL,

    CONSTRAINT "Repeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measure" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" "MeasuresTypes" NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_data_user_id_key" ON "user_data"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "workout_type_id_key" ON "workout"("type_id");

-- CreateIndex
CREATE UNIQUE INDEX "workout_type_name_key" ON "workout_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "workout_type_icon_id_key" ON "workout_type"("icon_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_name_key" ON "exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_type_key" ON "Measure"("type");

-- AddForeignKey
ALTER TABLE "user_data" ADD CONSTRAINT "user_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_photos" ADD CONSTRAINT "user_photos_user_data_id_fkey" FOREIGN KEY ("user_data_id") REFERENCES "user_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout" ADD CONSTRAINT "workout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout" ADD CONSTRAINT "workout_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "workout_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_type" ADD CONSTRAINT "workout_type_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "workout_type_icons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_type" ADD CONSTRAINT "workout_type_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_measure_id_fkey" FOREIGN KEY ("measure_id") REFERENCES "Measure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "set" ADD CONSTRAINT "set_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repeat" ADD CONSTRAINT "Repeat_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
