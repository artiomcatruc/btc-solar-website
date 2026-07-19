import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_form_submissions_status" AS ENUM('new', 'reviewed');
  ALTER TABLE "form_submissions" ADD COLUMN "status" "enum_form_submissions_status" DEFAULT 'new' NOT NULL;
  ALTER TABLE "form_submissions" ADD COLUMN "name" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "phone" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "email" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "project_type" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "location" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "message" varchar;`)

  // Backfill denormalized summary fields from existing submissionData rows.
  await db.execute(sql`
    UPDATE "form_submissions" AS fs
    SET
      "name" = NULLIF(
        TRIM(
          COALESCE(
            (
              SELECT sd."value"
              FROM "form_submissions_submission_data" AS sd
              WHERE sd."_parent_id" = fs."id" AND lower(sd."field") IN ('name', 'fullname', 'full_name')
              LIMIT 1
            ),
            CONCAT_WS(
              ' ',
              (
                SELECT sd."value"
                FROM "form_submissions_submission_data" AS sd
                WHERE sd."_parent_id" = fs."id" AND lower(sd."field") IN ('firstname', 'first_name')
                LIMIT 1
              ),
              (
                SELECT sd."value"
                FROM "form_submissions_submission_data" AS sd
                WHERE sd."_parent_id" = fs."id" AND lower(sd."field") IN ('lastname', 'last_name')
                LIMIT 1
              )
            )
          )
        ),
        ''
      ),
      "email" = (
        SELECT sd."value"
        FROM "form_submissions_submission_data" AS sd
        WHERE sd."_parent_id" = fs."id" AND lower(sd."field") IN ('email', 'emailaddress', 'email_address')
        LIMIT 1
      ),
      "phone" = (
        SELECT sd."value"
        FROM "form_submissions_submission_data" AS sd
        WHERE sd."_parent_id" = fs."id" AND lower(sd."field") IN ('phone', 'phonenumber', 'phone_number', 'tel')
        LIMIT 1
      ),
      "project_type" = (
        SELECT sd."value"
        FROM "form_submissions_submission_data" AS sd
        WHERE sd."_parent_id" = fs."id" AND lower(sd."field") IN ('projecttype', 'project_type', 'type')
        LIMIT 1
      ),
      "location" = (
        SELECT sd."value"
        FROM "form_submissions_submission_data" AS sd
        WHERE sd."_parent_id" = fs."id" AND lower(sd."field") IN ('location', 'city')
        LIMIT 1
      ),
      "message" = (
        SELECT sd."value"
        FROM "form_submissions_submission_data" AS sd
        WHERE sd."_parent_id" = fs."id" AND lower(sd."field") IN ('message', 'comment', 'notes')
        LIMIT 1
      )
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions" DROP COLUMN "status";
  ALTER TABLE "form_submissions" DROP COLUMN "name";
  ALTER TABLE "form_submissions" DROP COLUMN "phone";
  ALTER TABLE "form_submissions" DROP COLUMN "email";
  ALTER TABLE "form_submissions" DROP COLUMN "project_type";
  ALTER TABLE "form_submissions" DROP COLUMN "location";
  ALTER TABLE "form_submissions" DROP COLUMN "message";
  DROP TYPE "public"."enum_form_submissions_status";`)
}
