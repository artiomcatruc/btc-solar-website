import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "products_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "products_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_meta_meta_image_idx" ON "products_locales" USING btree ("meta_image_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_locales" DROP CONSTRAINT "products_locales_meta_image_id_media_id_fk";
  
  DROP INDEX "products_meta_meta_image_idx";
  ALTER TABLE "products_locales" DROP COLUMN "meta_title";
  ALTER TABLE "products_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "products_locales" DROP COLUMN "meta_description";`)
}
