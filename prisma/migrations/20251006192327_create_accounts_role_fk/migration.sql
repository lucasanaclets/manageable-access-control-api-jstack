/*
  Warnings:

  - Added the required column `role_id` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."accounts" ADD COLUMN     "role_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
