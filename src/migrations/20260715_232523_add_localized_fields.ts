import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Split into chunks so Postgres errors are not truncated by CI logs (~84KB single query).
  // Phase 1
  await db.execute(sql`

   CREATE TABLE "pages_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_hero_locales" (
  	"badge" varchar,
  	"headline" varchar,
  	"headline_accent" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_about_hero_highlights_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_about_hero_locales" (
  	"eyebrow" varchar DEFAULT 'About BTC Solar',
  	"headline" varchar DEFAULT 'Powering Moldova''s',
  	"headline_accent" varchar DEFAULT 'Sustainable Future',
  	"lead" varchar DEFAULT 'We are Moldova''s trusted leader in solar energy solutions, committed to making clean energy accessible, affordable, and efficient for every home and business.',
  	"card_title" varchar DEFAULT '10 MW',
  	"card_subtitle" varchar DEFAULT 'Installed Capacity',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_section_intro_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_benefits_split_benefits_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_benefits_split_locales" (
  	"eyebrow" varchar DEFAULT 'Why Solar?',
  	"heading" varchar DEFAULT 'Benefits of Going Solar',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_process_steps_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_process_steps_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Our Installation Process',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_stats_row_stats_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_testimonials_grid_locales" (
  	"eyebrow" varchar DEFAULT 'Testimonials',
  	"title" varchar DEFAULT 'What Our Clients Say',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_faq_accordion_locales" (
  	"eyebrow" varchar DEFAULT 'FAQ',
  	"title" varchar DEFAULT 'Frequently Asked Questions',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_cta_banner_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_cta_banner_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_gallery_filter_locales" (
  	"all_label" varchar DEFAULT 'All Projects',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_difference_cards_locales" (
  	"badge" varchar DEFAULT 'After Installation',
  	"title" varchar,
  	"description" varchar,
  	"meta_label" varchar,
  	"meta_value" varchar,
  	"highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_difference_locales" (
  	"eyebrow" varchar DEFAULT 'Transformation',
  	"heading" varchar DEFAULT 'See the Difference',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_btc_contact_section_locales" (
  	"info_title" varchar DEFAULT 'Contact Information',
  	"social_title" varchar DEFAULT 'Follow Us',
  	"form_title" varchar DEFAULT 'Request a Free Consultation',
  	"form_lead" varchar DEFAULT 'Fill out the form below and our team will contact you within 24 hours.',
  	"privacy_policy_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_form_block_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_hero_buttons_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_hero_locales" (
  	"badge" varchar,
  	"headline" varchar,
  	"headline_accent" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_about_hero_highlights_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_about_hero_locales" (
  	"eyebrow" varchar DEFAULT 'About BTC Solar',
  	"headline" varchar DEFAULT 'Powering Moldova''s',
  	"headline_accent" varchar DEFAULT 'Sustainable Future',
  	"lead" varchar DEFAULT 'We are Moldova''s trusted leader in solar energy solutions, committed to making clean energy accessible, affordable, and efficient for every home and business.',
  	"card_title" varchar DEFAULT '10 MW',
  	"card_subtitle" varchar DEFAULT 'Installed Capacity',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_section_intro_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_benefits_split_benefits_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_benefits_split_locales" (
  	"eyebrow" varchar DEFAULT 'Why Solar?',
  	"heading" varchar DEFAULT 'Benefits of Going Solar',
  	"card_title" varchar,
  	"card_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_process_steps_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"badge" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_process_steps_locales" (
  	"eyebrow" varchar,
  	"title" varchar DEFAULT 'Our Installation Process',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_stats_row_stats_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_testimonials_grid_locales" (
  	"eyebrow" varchar DEFAULT 'Testimonials',
  	"title" varchar DEFAULT 'What Our Clients Say',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_faq_accordion_locales" (
  	"eyebrow" varchar DEFAULT 'FAQ',
  	"title" varchar DEFAULT 'Frequently Asked Questions',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_cta_banner_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_cta_banner_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_gallery_filter_locales" (
  	"all_label" varchar DEFAULT 'All Projects',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_difference_cards_locales" (
  	"badge" varchar DEFAULT 'After Installation',
  	"title" varchar,
  	"description" varchar,
  	"meta_label" varchar,
  	"meta_value" varchar,
  	"highlight" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_difference_locales" (
  	"eyebrow" varchar DEFAULT 'Transformation',
  	"heading" varchar DEFAULT 'See the Difference',
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_btc_contact_section_locales" (
  	"info_title" varchar DEFAULT 'Contact Information',
  	"social_title" varchar DEFAULT 'Follow Us',
  	"form_title" varchar DEFAULT 'Request a Free Consultation',
  	"form_lead" varchar DEFAULT 'Fill out the form below and our team will contact you within 24 hours.',
  	"privacy_policy_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_form_block_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"caption" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  -- tags was historically created only via local drizzle push, never in 20260708.
  -- Prod (migrate-only) therefore has no tags table — create it before tags_locales / FKs.
  CREATE TABLE IF NOT EXISTS "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  DO $mig$ BEGIN
    ALTER TABLE "tags" ADD COLUMN "title" varchar;
  EXCEPTION WHEN duplicate_column THEN NULL; END $mig$;
  CREATE UNIQUE INDEX IF NOT EXISTS "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tags_created_at_idx" ON "tags" USING btree ("created_at");

  CREATE TABLE "tags_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery_items_locales" (
  	"title" varchar,
  	"caption" varchar,
  	"badge_label" varchar,
  	"location" varchar,
  	"system_size" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_locales" (
  	"site_name" varchar DEFAULT 'BTC Solar',
  	"default_title" varchar,
  	"default_description" varchar,
  	"address" varchar,
  	"working_hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_stats_stats_locales" (
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_locales" (
  	"tagline" varchar,
  	"cta_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"brand_description" varchar DEFAULT 'Premium solar energy solutions for homes and businesses across Moldova. Your trusted partner in renewable energy.',
  	"copyright_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DO $mig$ BEGIN
    ALTER TABLE "posts_populated_authors" DISABLE ROW LEVEL SECURITY;
  EXCEPTION WHEN undefined_table THEN NULL; END $mig$;
  DO $mig$ BEGIN
    ALTER TABLE "_posts_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  EXCEPTION WHEN undefined_table THEN NULL; END $mig$;
  DROP TABLE IF EXISTS "posts_populated_authors" CASCADE;
  DROP TABLE IF EXISTS "_posts_v_version_populated_authors" CASCADE;
  DO $mig$ BEGIN
    ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_users_fk";
  EXCEPTION WHEN undefined_object THEN NULL; END $mig$;
  
  DO $mig$ BEGIN
    ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_users_fk";
  EXCEPTION WHEN undefined_object THEN NULL; END $mig$;
  
  DROP INDEX IF EXISTS "posts_rels_users_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_users_id_idx";
  ALTER TABLE "pages_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "posts_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_content" jsonb;
  `)

  // Phase 2
  await db.execute(sql`
-- tags_id columns may already exist from push; add only if missing
  DO $mig$ BEGIN
    ALTER TABLE "posts_rels" ADD COLUMN "tags_id" integer;
  EXCEPTION WHEN duplicate_column THEN NULL; END $mig$;
  DO $mig$ BEGIN
    ALTER TABLE "_posts_v_rels" ADD COLUMN "tags_id" integer;
  EXCEPTION WHEN duplicate_column THEN NULL; END $mig$;
  DO $mig$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tags_id" integer;
  EXCEPTION WHEN duplicate_column THEN NULL; END $mig$;
  ALTER TABLE "pages_hero_links_locales" ADD CONSTRAINT "pages_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_hero_buttons_locales" ADD CONSTRAINT "pages_blocks_btc_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_hero_locales" ADD CONSTRAINT "pages_blocks_btc_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_about_hero_highlights_locales" ADD CONSTRAINT "pages_blocks_btc_about_hero_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_about_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_about_hero_locales" ADD CONSTRAINT "pages_blocks_btc_about_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_section_intro_locales" ADD CONSTRAINT "pages_blocks_btc_section_intro_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_section_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_benefits_split_benefits_locales" ADD CONSTRAINT "pages_blocks_btc_benefits_split_benefits_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_benefits_split_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_benefits_split_locales" ADD CONSTRAINT "pages_blocks_btc_benefits_split_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_benefits_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_process_steps_steps_locales" ADD CONSTRAINT "pages_blocks_btc_process_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_process_steps_locales" ADD CONSTRAINT "pages_blocks_btc_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_stats_row_stats_locales" ADD CONSTRAINT "pages_blocks_btc_stats_row_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_stats_row_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_testimonials_grid_locales" ADD CONSTRAINT "pages_blocks_btc_testimonials_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_testimonials_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_faq_accordion_locales" ADD CONSTRAINT "pages_blocks_btc_faq_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_cta_banner_links_locales" ADD CONSTRAINT "pages_blocks_btc_cta_banner_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_cta_banner_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_cta_banner_locales" ADD CONSTRAINT "pages_blocks_btc_cta_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_gallery_filter_locales" ADD CONSTRAINT "pages_blocks_btc_gallery_filter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_gallery_filter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_difference_cards_locales" ADD CONSTRAINT "pages_blocks_btc_difference_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_difference_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_difference_locales" ADD CONSTRAINT "pages_blocks_btc_difference_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_btc_contact_section_locales" ADD CONSTRAINT "pages_blocks_btc_contact_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_btc_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns_locales" ADD CONSTRAINT "pages_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive_locales" ADD CONSTRAINT "pages_blocks_archive_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block_locales" ADD CONSTRAINT "pages_blocks_form_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links_locales" ADD CONSTRAINT "_pages_v_version_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_hero_buttons_locales" ADD CONSTRAINT "_pages_v_blocks_btc_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_hero_locales" ADD CONSTRAINT "_pages_v_blocks_btc_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_about_hero_highlights_locales" ADD CONSTRAINT "_pages_v_blocks_btc_about_hero_highlights_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_about_hero_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_about_hero_locales" ADD CONSTRAINT "_pages_v_blocks_btc_about_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_section_intro_locales" ADD CONSTRAINT "_pages_v_blocks_btc_section_intro_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_section_intro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_benefits_split_benefits_locales" ADD CONSTRAINT "_pages_v_blocks_btc_benefits_split_benefits_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_benefits_split_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_benefits_split_locales" ADD CONSTRAINT "_pages_v_blocks_btc_benefits_split_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_benefits_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_process_steps_steps_locales" ADD CONSTRAINT "_pages_v_blocks_btc_process_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_process_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_process_steps_locales" ADD CONSTRAINT "_pages_v_blocks_btc_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_stats_row_stats_locales" ADD CONSTRAINT "_pages_v_blocks_btc_stats_row_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_stats_row_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_testimonials_grid_locales" ADD CONSTRAINT "_pages_v_blocks_btc_testimonials_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_testimonials_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_faq_accordion_locales" ADD CONSTRAINT "_pages_v_blocks_btc_faq_accordion_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_cta_banner_links_locales" ADD CONSTRAINT "_pages_v_blocks_btc_cta_banner_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_cta_banner_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_cta_banner_locales" ADD CONSTRAINT "_pages_v_blocks_btc_cta_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_gallery_filter_locales" ADD CONSTRAINT "_pages_v_blocks_btc_gallery_filter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_gallery_filter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_difference_cards_locales" ADD CONSTRAINT "_pages_v_blocks_btc_difference_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_difference_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_difference_locales" ADD CONSTRAINT "_pages_v_blocks_btc_difference_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_difference"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_btc_contact_section_locales" ADD CONSTRAINT "_pages_v_blocks_btc_contact_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_btc_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links_locales" ADD CONSTRAINT "_pages_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_locales" ADD CONSTRAINT "_pages_v_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive_locales" ADD CONSTRAINT "_pages_v_blocks_archive_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block_locales" ADD CONSTRAINT "_pages_v_blocks_form_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_items_locales" ADD CONSTRAINT "gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_social_links_locales" ADD CONSTRAINT "site_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_locales" ADD CONSTRAINT "site_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_stats_stats_locales" ADD CONSTRAINT "home_stats_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_stats_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_hero_links_locales_locale_parent_id_unique" ON "pages_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_hero_buttons_locales_locale_parent_id_uniqu" ON "pages_blocks_btc_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_hero_locales_locale_parent_id_unique" ON "pages_blocks_btc_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_about_hero_highlights_locales_locale_parent" ON "pages_blocks_btc_about_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_about_hero_locales_locale_parent_id_unique" ON "pages_blocks_btc_about_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_section_intro_locales_locale_parent_id_uniq" ON "pages_blocks_btc_section_intro_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_benefits_split_benefits_locales_locale_pare" ON "pages_blocks_btc_benefits_split_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_benefits_split_locales_locale_parent_id_uni" ON "pages_blocks_btc_benefits_split_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_process_steps_steps_locales_locale_parent_i" ON "pages_blocks_btc_process_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_process_steps_locales_locale_parent_id_uniq" ON "pages_blocks_btc_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_stats_row_stats_locales_locale_parent_id_un" ON "pages_blocks_btc_stats_row_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_testimonials_grid_locales_locale_parent_id_" ON "pages_blocks_btc_testimonials_grid_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_faq_accordion_locales_locale_parent_id_uniq" ON "pages_blocks_btc_faq_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_cta_banner_links_locales_locale_parent_id_u" ON "pages_blocks_btc_cta_banner_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_cta_banner_locales_locale_parent_id_unique" ON "pages_blocks_btc_cta_banner_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_gallery_filter_locales_locale_parent_id_uni" ON "pages_blocks_btc_gallery_filter_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_difference_cards_locales_locale_parent_id_u" ON "pages_blocks_btc_difference_cards_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_difference_locales_locale_parent_id_unique" ON "pages_blocks_btc_difference_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_btc_contact_section_locales_locale_parent_id_un" ON "pages_blocks_btc_contact_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_links_locales_locale_parent_id_unique" ON "pages_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_content_columns_locales_locale_parent_id_unique" ON "pages_blocks_content_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_archive_locales_locale_parent_id_unique" ON "pages_blocks_archive_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_form_block_locales_locale_parent_id_unique" ON "pages_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_hero_links_locales_locale_parent_id_unique" ON "_pages_v_version_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_hero_buttons_locales_locale_parent_id_un" ON "_pages_v_blocks_btc_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_btc_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_about_hero_highlights_locales_locale_par" ON "_pages_v_blocks_btc_about_hero_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_about_hero_locales_locale_parent_id_uniq" ON "_pages_v_blocks_btc_about_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_section_intro_locales_locale_parent_id_u" ON "_pages_v_blocks_btc_section_intro_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_benefits_split_benefits_locales_locale_p" ON "_pages_v_blocks_btc_benefits_split_benefits_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_benefits_split_locales_locale_parent_id_" ON "_pages_v_blocks_btc_benefits_split_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_process_steps_steps_locales_locale_paren" ON "_pages_v_blocks_btc_process_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_process_steps_locales_locale_parent_id_u" ON "_pages_v_blocks_btc_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_stats_row_stats_locales_locale_parent_id" ON "_pages_v_blocks_btc_stats_row_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_testimonials_grid_locales_locale_parent_" ON "_pages_v_blocks_btc_testimonials_grid_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_faq_accordion_locales_locale_parent_id_u" ON "_pages_v_blocks_btc_faq_accordion_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_cta_banner_links_locales_locale_parent_i" ON "_pages_v_blocks_btc_cta_banner_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_cta_banner_locales_locale_parent_id_uniq" ON "_pages_v_blocks_btc_cta_banner_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_gallery_filter_locales_locale_parent_id_" ON "_pages_v_blocks_btc_gallery_filter_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_difference_cards_locales_locale_parent_i" ON "_pages_v_blocks_btc_difference_cards_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_difference_locales_locale_parent_id_uniq" ON "_pages_v_blocks_btc_difference_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_btc_contact_section_locales_locale_parent_id" ON "_pages_v_blocks_btc_contact_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_content_columns_locales_locale_parent_id_uni" ON "_pages_v_blocks_content_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_archive_locales_locale_parent_id_unique" ON "_pages_v_blocks_archive_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_form_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  -- tags indexes may already exist
  CREATE UNIQUE INDEX "tags_locales_locale_parent_id_unique" ON "tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "gallery_items_locales_locale_parent_id_unique" ON "gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_social_links_locales_locale_parent_id_unique" ON "site_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_locales_locale_parent_id_unique" ON "site_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_stats_stats_locales_locale_parent_id_unique" ON "home_stats_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  DO $mig$ BEGIN
    ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $mig$;
  DO $mig$ BEGIN
    ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $mig$;
  DO $mig$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $mig$;
  CREATE INDEX IF NOT EXISTS "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_tags_id_idx" ON "_posts_v_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  `)

  // Phase 3
  await db.execute(sql`
-- Copy existing content into default locale (en) BEFORE dropping source columns

  INSERT INTO "pages_hero_links_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "pages_hero_links"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "pages_hero_links_locales"."link_label");

  INSERT INTO "pages_blocks_btc_hero_buttons_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "pages_blocks_btc_hero_buttons"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "pages_blocks_btc_hero_buttons_locales"."link_label");

  INSERT INTO "pages_blocks_btc_hero_locales" ("_parent_id", "_locale", "badge", "headline", "headline_accent", "description")
  SELECT id, 'en', "badge", "headline", "headline_accent", "description"
  FROM "pages_blocks_btc_hero"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "badge" = COALESCE(EXCLUDED."badge", "pages_blocks_btc_hero_locales"."badge"),
    "headline" = COALESCE(EXCLUDED."headline", "pages_blocks_btc_hero_locales"."headline"),
    "headline_accent" = COALESCE(EXCLUDED."headline_accent", "pages_blocks_btc_hero_locales"."headline_accent"),
    "description" = COALESCE(EXCLUDED."description", "pages_blocks_btc_hero_locales"."description");

  INSERT INTO "pages_blocks_btc_about_hero_highlights_locales" ("_parent_id", "_locale", "value", "label")
  SELECT id, 'en', "value", "label"
  FROM "pages_blocks_btc_about_hero_highlights"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "value" = COALESCE(EXCLUDED."value", "pages_blocks_btc_about_hero_highlights_locales"."value"),
    "label" = COALESCE(EXCLUDED."label", "pages_blocks_btc_about_hero_highlights_locales"."label");

  INSERT INTO "pages_blocks_btc_about_hero_locales" ("_parent_id", "_locale", "eyebrow", "headline", "headline_accent", "lead", "card_title", "card_subtitle")
  SELECT id, 'en', "eyebrow", "headline", "headline_accent", "lead", "card_title", "card_subtitle"
  FROM "pages_blocks_btc_about_hero"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "pages_blocks_btc_about_hero_locales"."eyebrow"),
    "headline" = COALESCE(EXCLUDED."headline", "pages_blocks_btc_about_hero_locales"."headline"),
    "headline_accent" = COALESCE(EXCLUDED."headline_accent", "pages_blocks_btc_about_hero_locales"."headline_accent"),
    "lead" = COALESCE(EXCLUDED."lead", "pages_blocks_btc_about_hero_locales"."lead"),
    "card_title" = COALESCE(EXCLUDED."card_title", "pages_blocks_btc_about_hero_locales"."card_title"),
    "card_subtitle" = COALESCE(EXCLUDED."card_subtitle", "pages_blocks_btc_about_hero_locales"."card_subtitle");

  INSERT INTO "pages_blocks_btc_section_intro_locales" ("_parent_id", "_locale", "eyebrow", "heading", "lead")
  SELECT id, 'en', "eyebrow", "heading", "lead"
  FROM "pages_blocks_btc_section_intro"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "pages_blocks_btc_section_intro_locales"."eyebrow"),
    "heading" = COALESCE(EXCLUDED."heading", "pages_blocks_btc_section_intro_locales"."heading"),
    "lead" = COALESCE(EXCLUDED."lead", "pages_blocks_btc_section_intro_locales"."lead");

  INSERT INTO "pages_blocks_btc_benefits_split_benefits_locales" ("_parent_id", "_locale", "title", "description")
  SELECT id, 'en', "title", "description"
  FROM "pages_blocks_btc_benefits_split_benefits"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "pages_blocks_btc_benefits_split_benefits_locales"."title"),
    "description" = COALESCE(EXCLUDED."description", "pages_blocks_btc_benefits_split_benefits_locales"."description");

  INSERT INTO "pages_blocks_btc_benefits_split_locales" ("_parent_id", "_locale", "eyebrow", "heading", "card_title", "card_subtitle")
  SELECT id, 'en', "eyebrow", "heading", "card_title", "card_subtitle"
  FROM "pages_blocks_btc_benefits_split"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "pages_blocks_btc_benefits_split_locales"."eyebrow"),
    "heading" = COALESCE(EXCLUDED."heading", "pages_blocks_btc_benefits_split_locales"."heading"),
    "card_title" = COALESCE(EXCLUDED."card_title", "pages_blocks_btc_benefits_split_locales"."card_title"),
    "card_subtitle" = COALESCE(EXCLUDED."card_subtitle", "pages_blocks_btc_benefits_split_locales"."card_subtitle");

  INSERT INTO "pages_blocks_btc_process_steps_steps_locales" ("_parent_id", "_locale", "title", "description", "badge")
  SELECT id, 'en', "title", "description", "badge"
  FROM "pages_blocks_btc_process_steps_steps"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "pages_blocks_btc_process_steps_steps_locales"."title"),
    "description" = COALESCE(EXCLUDED."description", "pages_blocks_btc_process_steps_steps_locales"."description"),
    "badge" = COALESCE(EXCLUDED."badge", "pages_blocks_btc_process_steps_steps_locales"."badge");

  INSERT INTO "pages_blocks_btc_process_steps_locales" ("_parent_id", "_locale", "eyebrow", "title", "intro")
  SELECT id, 'en', "eyebrow", "title", "intro"
  FROM "pages_blocks_btc_process_steps"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "pages_blocks_btc_process_steps_locales"."eyebrow"),
    "title" = COALESCE(EXCLUDED."title", "pages_blocks_btc_process_steps_locales"."title"),
    "intro" = COALESCE(EXCLUDED."intro", "pages_blocks_btc_process_steps_locales"."intro");

  INSERT INTO "pages_blocks_btc_stats_row_stats_locales" ("_parent_id", "_locale", "value", "label")
  SELECT id, 'en', "value", "label"
  FROM "pages_blocks_btc_stats_row_stats"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "value" = COALESCE(EXCLUDED."value", "pages_blocks_btc_stats_row_stats_locales"."value"),
    "label" = COALESCE(EXCLUDED."label", "pages_blocks_btc_stats_row_stats_locales"."label");

  INSERT INTO "pages_blocks_btc_testimonials_grid_locales" ("_parent_id", "_locale", "eyebrow", "title")
  SELECT id, 'en', "eyebrow", "title"
  FROM "pages_blocks_btc_testimonials_grid"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "pages_blocks_btc_testimonials_grid_locales"."eyebrow"),
    "title" = COALESCE(EXCLUDED."title", "pages_blocks_btc_testimonials_grid_locales"."title");

  INSERT INTO "pages_blocks_btc_faq_accordion_locales" ("_parent_id", "_locale", "eyebrow", "title")
  SELECT id, 'en', "eyebrow", "title"
  FROM "pages_blocks_btc_faq_accordion"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "pages_blocks_btc_faq_accordion_locales"."eyebrow"),
    "title" = COALESCE(EXCLUDED."title", "pages_blocks_btc_faq_accordion_locales"."title");

  INSERT INTO "pages_blocks_btc_cta_banner_links_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "pages_blocks_btc_cta_banner_links"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "pages_blocks_btc_cta_banner_links_locales"."link_label");

  INSERT INTO "pages_blocks_btc_cta_banner_locales" ("_parent_id", "_locale", "title", "description")
  SELECT id, 'en', "title", "description"
  FROM "pages_blocks_btc_cta_banner"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "pages_blocks_btc_cta_banner_locales"."title"),
    "description" = COALESCE(EXCLUDED."description", "pages_blocks_btc_cta_banner_locales"."description");

  INSERT INTO "pages_blocks_btc_gallery_filter_locales" ("_parent_id", "_locale", "all_label")
  SELECT id, 'en', "all_label"
  FROM "pages_blocks_btc_gallery_filter"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "all_label" = COALESCE(EXCLUDED."all_label", "pages_blocks_btc_gallery_filter_locales"."all_label");

  INSERT INTO "pages_blocks_btc_difference_cards_locales" ("_parent_id", "_locale", "badge", "title", "description", "meta_label", "meta_value", "highlight")
  SELECT id, 'en', "badge", "title", "description", "meta_label", "meta_value", "highlight"
  FROM "pages_blocks_btc_difference_cards"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "badge" = COALESCE(EXCLUDED."badge", "pages_blocks_btc_difference_cards_locales"."badge"),
    "title" = COALESCE(EXCLUDED."title", "pages_blocks_btc_difference_cards_locales"."title"),
    "description" = COALESCE(EXCLUDED."description", "pages_blocks_btc_difference_cards_locales"."description"),
    "meta_label" = COALESCE(EXCLUDED."meta_label", "pages_blocks_btc_difference_cards_locales"."meta_label"),
    "meta_value" = COALESCE(EXCLUDED."meta_value", "pages_blocks_btc_difference_cards_locales"."meta_value"),
    "highlight" = COALESCE(EXCLUDED."highlight", "pages_blocks_btc_difference_cards_locales"."highlight");

  INSERT INTO "pages_blocks_btc_difference_locales" ("_parent_id", "_locale", "eyebrow", "heading", "intro")
  SELECT id, 'en', "eyebrow", "heading", "intro"
  FROM "pages_blocks_btc_difference"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "pages_blocks_btc_difference_locales"."eyebrow"),
    "heading" = COALESCE(EXCLUDED."heading", "pages_blocks_btc_difference_locales"."heading"),
    "intro" = COALESCE(EXCLUDED."intro", "pages_blocks_btc_difference_locales"."intro");

  INSERT INTO "pages_blocks_btc_contact_section_locales" ("_parent_id", "_locale", "info_title", "social_title", "form_title", "form_lead", "privacy_policy_url")
  SELECT id, 'en', "info_title", "social_title", "form_title", "form_lead", "privacy_policy_url"
  FROM "pages_blocks_btc_contact_section"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "info_title" = COALESCE(EXCLUDED."info_title", "pages_blocks_btc_contact_section_locales"."info_title"),
    "social_title" = COALESCE(EXCLUDED."social_title", "pages_blocks_btc_contact_section_locales"."social_title"),
    "form_title" = COALESCE(EXCLUDED."form_title", "pages_blocks_btc_contact_section_locales"."form_title"),
    "form_lead" = COALESCE(EXCLUDED."form_lead", "pages_blocks_btc_contact_section_locales"."form_lead"),
    "privacy_policy_url" = COALESCE(EXCLUDED."privacy_policy_url", "pages_blocks_btc_contact_section_locales"."privacy_policy_url");

  INSERT INTO "pages_blocks_cta_links_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "pages_blocks_cta_links"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "pages_blocks_cta_links_locales"."link_label");

  INSERT INTO "pages_blocks_cta_locales" ("_parent_id", "_locale", "rich_text")
  SELECT id, 'en', "rich_text"
  FROM "pages_blocks_cta"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "rich_text" = COALESCE(EXCLUDED."rich_text", "pages_blocks_cta_locales"."rich_text");

  INSERT INTO "pages_blocks_content_columns_locales" ("_parent_id", "_locale", "rich_text", "link_label")
  SELECT id, 'en', "rich_text", "link_label"
  FROM "pages_blocks_content_columns"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "rich_text" = COALESCE(EXCLUDED."rich_text", "pages_blocks_content_columns_locales"."rich_text"),
    "link_label" = COALESCE(EXCLUDED."link_label", "pages_blocks_content_columns_locales"."link_label");

  INSERT INTO "pages_blocks_archive_locales" ("_parent_id", "_locale", "intro_content")
  SELECT id, 'en', "intro_content"
  FROM "pages_blocks_archive"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "intro_content" = COALESCE(EXCLUDED."intro_content", "pages_blocks_archive_locales"."intro_content");

  INSERT INTO "pages_blocks_form_block_locales" ("_parent_id", "_locale", "intro_content")
  SELECT id, 'en', "intro_content"
  FROM "pages_blocks_form_block"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "intro_content" = COALESCE(EXCLUDED."intro_content", "pages_blocks_form_block_locales"."intro_content");

  INSERT INTO "_pages_v_version_hero_links_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "_pages_v_version_hero_links"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "_pages_v_version_hero_links_locales"."link_label");

  INSERT INTO "_pages_v_blocks_btc_hero_buttons_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "_pages_v_blocks_btc_hero_buttons"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "_pages_v_blocks_btc_hero_buttons_locales"."link_label");

  INSERT INTO "_pages_v_blocks_btc_hero_locales" ("_parent_id", "_locale", "badge", "headline", "headline_accent", "description")
  SELECT id, 'en', "badge", "headline", "headline_accent", "description"
  FROM "_pages_v_blocks_btc_hero"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "badge" = COALESCE(EXCLUDED."badge", "_pages_v_blocks_btc_hero_locales"."badge"),
    "headline" = COALESCE(EXCLUDED."headline", "_pages_v_blocks_btc_hero_locales"."headline"),
    "headline_accent" = COALESCE(EXCLUDED."headline_accent", "_pages_v_blocks_btc_hero_locales"."headline_accent"),
    "description" = COALESCE(EXCLUDED."description", "_pages_v_blocks_btc_hero_locales"."description");

  INSERT INTO "_pages_v_blocks_btc_about_hero_highlights_locales" ("_parent_id", "_locale", "value", "label")
  SELECT id, 'en', "value", "label"
  FROM "_pages_v_blocks_btc_about_hero_highlights"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "value" = COALESCE(EXCLUDED."value", "_pages_v_blocks_btc_about_hero_highlights_locales"."value"),
    "label" = COALESCE(EXCLUDED."label", "_pages_v_blocks_btc_about_hero_highlights_locales"."label");

  INSERT INTO "_pages_v_blocks_btc_about_hero_locales" ("_parent_id", "_locale", "eyebrow", "headline", "headline_accent", "lead", "card_title", "card_subtitle")
  SELECT id, 'en', "eyebrow", "headline", "headline_accent", "lead", "card_title", "card_subtitle"
  FROM "_pages_v_blocks_btc_about_hero"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "_pages_v_blocks_btc_about_hero_locales"."eyebrow"),
    "headline" = COALESCE(EXCLUDED."headline", "_pages_v_blocks_btc_about_hero_locales"."headline"),
    "headline_accent" = COALESCE(EXCLUDED."headline_accent", "_pages_v_blocks_btc_about_hero_locales"."headline_accent"),
    "lead" = COALESCE(EXCLUDED."lead", "_pages_v_blocks_btc_about_hero_locales"."lead"),
    "card_title" = COALESCE(EXCLUDED."card_title", "_pages_v_blocks_btc_about_hero_locales"."card_title"),
    "card_subtitle" = COALESCE(EXCLUDED."card_subtitle", "_pages_v_blocks_btc_about_hero_locales"."card_subtitle");

  INSERT INTO "_pages_v_blocks_btc_section_intro_locales" ("_parent_id", "_locale", "eyebrow", "heading", "lead")
  SELECT id, 'en', "eyebrow", "heading", "lead"
  FROM "_pages_v_blocks_btc_section_intro"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "_pages_v_blocks_btc_section_intro_locales"."eyebrow"),
    "heading" = COALESCE(EXCLUDED."heading", "_pages_v_blocks_btc_section_intro_locales"."heading"),
    "lead" = COALESCE(EXCLUDED."lead", "_pages_v_blocks_btc_section_intro_locales"."lead");

  INSERT INTO "_pages_v_blocks_btc_benefits_split_benefits_locales" ("_parent_id", "_locale", "title", "description")
  SELECT id, 'en', "title", "description"
  FROM "_pages_v_blocks_btc_benefits_split_benefits"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "_pages_v_blocks_btc_benefits_split_benefits_locales"."title"),
    "description" = COALESCE(EXCLUDED."description", "_pages_v_blocks_btc_benefits_split_benefits_locales"."description");

  INSERT INTO "_pages_v_blocks_btc_benefits_split_locales" ("_parent_id", "_locale", "eyebrow", "heading", "card_title", "card_subtitle")
  SELECT id, 'en', "eyebrow", "heading", "card_title", "card_subtitle"
  FROM "_pages_v_blocks_btc_benefits_split"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "_pages_v_blocks_btc_benefits_split_locales"."eyebrow"),
    "heading" = COALESCE(EXCLUDED."heading", "_pages_v_blocks_btc_benefits_split_locales"."heading"),
    "card_title" = COALESCE(EXCLUDED."card_title", "_pages_v_blocks_btc_benefits_split_locales"."card_title"),
    "card_subtitle" = COALESCE(EXCLUDED."card_subtitle", "_pages_v_blocks_btc_benefits_split_locales"."card_subtitle");

  INSERT INTO "_pages_v_blocks_btc_process_steps_steps_locales" ("_parent_id", "_locale", "title", "description", "badge")
  SELECT id, 'en', "title", "description", "badge"
  FROM "_pages_v_blocks_btc_process_steps_steps"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "_pages_v_blocks_btc_process_steps_steps_locales"."title"),
    "description" = COALESCE(EXCLUDED."description", "_pages_v_blocks_btc_process_steps_steps_locales"."description"),
    "badge" = COALESCE(EXCLUDED."badge", "_pages_v_blocks_btc_process_steps_steps_locales"."badge");

  INSERT INTO "_pages_v_blocks_btc_process_steps_locales" ("_parent_id", "_locale", "eyebrow", "title", "intro")
  SELECT id, 'en', "eyebrow", "title", "intro"
  FROM "_pages_v_blocks_btc_process_steps"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "_pages_v_blocks_btc_process_steps_locales"."eyebrow"),
    "title" = COALESCE(EXCLUDED."title", "_pages_v_blocks_btc_process_steps_locales"."title"),
    "intro" = COALESCE(EXCLUDED."intro", "_pages_v_blocks_btc_process_steps_locales"."intro");

  INSERT INTO "_pages_v_blocks_btc_stats_row_stats_locales" ("_parent_id", "_locale", "value", "label")
  SELECT id, 'en', "value", "label"
  FROM "_pages_v_blocks_btc_stats_row_stats"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "value" = COALESCE(EXCLUDED."value", "_pages_v_blocks_btc_stats_row_stats_locales"."value"),
    "label" = COALESCE(EXCLUDED."label", "_pages_v_blocks_btc_stats_row_stats_locales"."label");

  INSERT INTO "_pages_v_blocks_btc_testimonials_grid_locales" ("_parent_id", "_locale", "eyebrow", "title")
  SELECT id, 'en', "eyebrow", "title"
  FROM "_pages_v_blocks_btc_testimonials_grid"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "_pages_v_blocks_btc_testimonials_grid_locales"."eyebrow"),
    "title" = COALESCE(EXCLUDED."title", "_pages_v_blocks_btc_testimonials_grid_locales"."title");

  INSERT INTO "_pages_v_blocks_btc_faq_accordion_locales" ("_parent_id", "_locale", "eyebrow", "title")
  SELECT id, 'en', "eyebrow", "title"
  FROM "_pages_v_blocks_btc_faq_accordion"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "_pages_v_blocks_btc_faq_accordion_locales"."eyebrow"),
    "title" = COALESCE(EXCLUDED."title", "_pages_v_blocks_btc_faq_accordion_locales"."title");

  INSERT INTO "_pages_v_blocks_btc_cta_banner_links_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "_pages_v_blocks_btc_cta_banner_links"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "_pages_v_blocks_btc_cta_banner_links_locales"."link_label");

  INSERT INTO "_pages_v_blocks_btc_cta_banner_locales" ("_parent_id", "_locale", "title", "description")
  SELECT id, 'en', "title", "description"
  FROM "_pages_v_blocks_btc_cta_banner"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "_pages_v_blocks_btc_cta_banner_locales"."title"),
    "description" = COALESCE(EXCLUDED."description", "_pages_v_blocks_btc_cta_banner_locales"."description");

  INSERT INTO "_pages_v_blocks_btc_gallery_filter_locales" ("_parent_id", "_locale", "all_label")
  SELECT id, 'en', "all_label"
  FROM "_pages_v_blocks_btc_gallery_filter"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "all_label" = COALESCE(EXCLUDED."all_label", "_pages_v_blocks_btc_gallery_filter_locales"."all_label");

  INSERT INTO "_pages_v_blocks_btc_difference_cards_locales" ("_parent_id", "_locale", "badge", "title", "description", "meta_label", "meta_value", "highlight")
  SELECT id, 'en', "badge", "title", "description", "meta_label", "meta_value", "highlight"
  FROM "_pages_v_blocks_btc_difference_cards"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "badge" = COALESCE(EXCLUDED."badge", "_pages_v_blocks_btc_difference_cards_locales"."badge"),
    "title" = COALESCE(EXCLUDED."title", "_pages_v_blocks_btc_difference_cards_locales"."title"),
    "description" = COALESCE(EXCLUDED."description", "_pages_v_blocks_btc_difference_cards_locales"."description"),
    "meta_label" = COALESCE(EXCLUDED."meta_label", "_pages_v_blocks_btc_difference_cards_locales"."meta_label"),
    "meta_value" = COALESCE(EXCLUDED."meta_value", "_pages_v_blocks_btc_difference_cards_locales"."meta_value"),
    "highlight" = COALESCE(EXCLUDED."highlight", "_pages_v_blocks_btc_difference_cards_locales"."highlight");

  INSERT INTO "_pages_v_blocks_btc_difference_locales" ("_parent_id", "_locale", "eyebrow", "heading", "intro")
  SELECT id, 'en', "eyebrow", "heading", "intro"
  FROM "_pages_v_blocks_btc_difference"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "eyebrow" = COALESCE(EXCLUDED."eyebrow", "_pages_v_blocks_btc_difference_locales"."eyebrow"),
    "heading" = COALESCE(EXCLUDED."heading", "_pages_v_blocks_btc_difference_locales"."heading"),
    "intro" = COALESCE(EXCLUDED."intro", "_pages_v_blocks_btc_difference_locales"."intro");

  INSERT INTO "_pages_v_blocks_btc_contact_section_locales" ("_parent_id", "_locale", "info_title", "social_title", "form_title", "form_lead", "privacy_policy_url")
  SELECT id, 'en', "info_title", "social_title", "form_title", "form_lead", "privacy_policy_url"
  FROM "_pages_v_blocks_btc_contact_section"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "info_title" = COALESCE(EXCLUDED."info_title", "_pages_v_blocks_btc_contact_section_locales"."info_title"),
    "social_title" = COALESCE(EXCLUDED."social_title", "_pages_v_blocks_btc_contact_section_locales"."social_title"),
    "form_title" = COALESCE(EXCLUDED."form_title", "_pages_v_blocks_btc_contact_section_locales"."form_title"),
    "form_lead" = COALESCE(EXCLUDED."form_lead", "_pages_v_blocks_btc_contact_section_locales"."form_lead"),
    "privacy_policy_url" = COALESCE(EXCLUDED."privacy_policy_url", "_pages_v_blocks_btc_contact_section_locales"."privacy_policy_url");

  INSERT INTO "_pages_v_blocks_cta_links_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "_pages_v_blocks_cta_links"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "_pages_v_blocks_cta_links_locales"."link_label");

  INSERT INTO "_pages_v_blocks_cta_locales" ("_parent_id", "_locale", "rich_text")
  SELECT id, 'en', "rich_text"
  FROM "_pages_v_blocks_cta"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "rich_text" = COALESCE(EXCLUDED."rich_text", "_pages_v_blocks_cta_locales"."rich_text");

  INSERT INTO "_pages_v_blocks_content_columns_locales" ("_parent_id", "_locale", "rich_text", "link_label")
  SELECT id, 'en', "rich_text", "link_label"
  FROM "_pages_v_blocks_content_columns"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "rich_text" = COALESCE(EXCLUDED."rich_text", "_pages_v_blocks_content_columns_locales"."rich_text"),
    "link_label" = COALESCE(EXCLUDED."link_label", "_pages_v_blocks_content_columns_locales"."link_label");

  INSERT INTO "_pages_v_blocks_archive_locales" ("_parent_id", "_locale", "intro_content")
  SELECT id, 'en', "intro_content"
  FROM "_pages_v_blocks_archive"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "intro_content" = COALESCE(EXCLUDED."intro_content", "_pages_v_blocks_archive_locales"."intro_content");

  INSERT INTO "_pages_v_blocks_form_block_locales" ("_parent_id", "_locale", "intro_content")
  SELECT id, 'en', "intro_content"
  FROM "_pages_v_blocks_form_block"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "intro_content" = COALESCE(EXCLUDED."intro_content", "_pages_v_blocks_form_block_locales"."intro_content");

  INSERT INTO "media_locales" ("_parent_id", "_locale", "alt", "caption")
  SELECT id, 'en', "alt", "caption"
  FROM "media"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "alt" = COALESCE(EXCLUDED."alt", "media_locales"."alt"),
    "caption" = COALESCE(EXCLUDED."caption", "media_locales"."caption");

  INSERT INTO "categories_locales" ("_parent_id", "_locale", "title")
  SELECT id, 'en', "title"
  FROM "categories"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "categories_locales"."title");

  INSERT INTO "tags_locales" ("_parent_id", "_locale", "title")
  SELECT id, 'en', "title"
  FROM "tags"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "tags_locales"."title");

  INSERT INTO "services_locales" ("_parent_id", "_locale", "title", "summary")
  SELECT id, 'en', "title", "summary"
  FROM "services"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "services_locales"."title"),
    "summary" = COALESCE(EXCLUDED."summary", "services_locales"."summary");

  INSERT INTO "testimonials_locales" ("_parent_id", "_locale", "quote", "name", "subtitle")
  SELECT id, 'en', "quote", "name", "subtitle"
  FROM "testimonials"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "quote" = COALESCE(EXCLUDED."quote", "testimonials_locales"."quote"),
    "name" = COALESCE(EXCLUDED."name", "testimonials_locales"."name"),
    "subtitle" = COALESCE(EXCLUDED."subtitle", "testimonials_locales"."subtitle");

  INSERT INTO "faqs_locales" ("_parent_id", "_locale", "question", "answer")
  SELECT id, 'en', "question", "answer"
  FROM "faqs"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "question" = COALESCE(EXCLUDED."question", "faqs_locales"."question"),
    "answer" = COALESCE(EXCLUDED."answer", "faqs_locales"."answer");

  INSERT INTO "gallery_items_locales" ("_parent_id", "_locale", "title", "caption", "badge_label", "location", "system_size")
  SELECT id, 'en', "title", "caption", "badge_label", "location", "system_size"
  FROM "gallery_items"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "title" = COALESCE(EXCLUDED."title", "gallery_items_locales"."title"),
    "caption" = COALESCE(EXCLUDED."caption", "gallery_items_locales"."caption"),
    "badge_label" = COALESCE(EXCLUDED."badge_label", "gallery_items_locales"."badge_label"),
    "location" = COALESCE(EXCLUDED."location", "gallery_items_locales"."location"),
    "system_size" = COALESCE(EXCLUDED."system_size", "gallery_items_locales"."system_size");

  INSERT INTO "site_social_links_locales" ("_parent_id", "_locale", "label")
  SELECT id, 'en', "label"
  FROM "site_social_links"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "label" = COALESCE(EXCLUDED."label", "site_social_links_locales"."label");

  INSERT INTO "site_locales" ("_parent_id", "_locale", "site_name", "default_title", "default_description", "address", "working_hours")
  SELECT id, 'en', "site_name", "default_title", "default_description", "address", "working_hours"
  FROM "site"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "site_name" = COALESCE(EXCLUDED."site_name", "site_locales"."site_name"),
    "default_title" = COALESCE(EXCLUDED."default_title", "site_locales"."default_title"),
    "default_description" = COALESCE(EXCLUDED."default_description", "site_locales"."default_description"),
    "address" = COALESCE(EXCLUDED."address", "site_locales"."address"),
    "working_hours" = COALESCE(EXCLUDED."working_hours", "site_locales"."working_hours");

  INSERT INTO "home_stats_stats_locales" ("_parent_id", "_locale", "value", "label")
  SELECT id, 'en', "value", "label"
  FROM "home_stats_stats"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "value" = COALESCE(EXCLUDED."value", "home_stats_stats_locales"."value"),
    "label" = COALESCE(EXCLUDED."label", "home_stats_stats_locales"."label");

  INSERT INTO "header_nav_items_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "header_nav_items"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "header_nav_items_locales"."link_label");

  INSERT INTO "header_locales" ("_parent_id", "_locale", "tagline", "cta_label")
  SELECT id, 'en', "tagline", "cta_label"
  FROM "header"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "tagline" = COALESCE(EXCLUDED."tagline", "header_locales"."tagline"),
    "cta_label" = COALESCE(EXCLUDED."cta_label", "header_locales"."cta_label");

  INSERT INTO "footer_columns_links_locales" ("_parent_id", "_locale", "link_label")
  SELECT id, 'en', "link_label"
  FROM "footer_columns_links"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "link_label" = COALESCE(EXCLUDED."link_label", "footer_columns_links_locales"."link_label");

  INSERT INTO "footer_columns_locales" ("_parent_id", "_locale", "heading")
  SELECT id, 'en', "heading"
  FROM "footer_columns"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "heading" = COALESCE(EXCLUDED."heading", "footer_columns_locales"."heading");

  INSERT INTO "footer_locales" ("_parent_id", "_locale", "brand_description", "copyright_text")
  SELECT id, 'en', "brand_description", "copyright_text"
  FROM "footer"
  ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET
    "brand_description" = COALESCE(EXCLUDED."brand_description", "footer_locales"."brand_description"),
    "copyright_text" = COALESCE(EXCLUDED."copyright_text", "footer_locales"."copyright_text");

  ALTER TABLE "pages_hero_links" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_btc_hero_buttons" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_btc_hero" DROP COLUMN "badge";
  ALTER TABLE "pages_blocks_btc_hero" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_btc_hero" DROP COLUMN "headline_accent";
  ALTER TABLE "pages_blocks_btc_hero" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_btc_about_hero_highlights" DROP COLUMN "value";
  ALTER TABLE "pages_blocks_btc_about_hero_highlights" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_btc_about_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_btc_about_hero" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_btc_about_hero" DROP COLUMN "headline_accent";
  ALTER TABLE "pages_blocks_btc_about_hero" DROP COLUMN "lead";
  ALTER TABLE "pages_blocks_btc_about_hero" DROP COLUMN "card_title";
  ALTER TABLE "pages_blocks_btc_about_hero" DROP COLUMN "card_subtitle";
  ALTER TABLE "pages_blocks_btc_section_intro" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_btc_section_intro" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_btc_section_intro" DROP COLUMN "lead";
  ALTER TABLE "pages_blocks_btc_benefits_split_benefits" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_btc_benefits_split_benefits" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_btc_benefits_split" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_btc_benefits_split" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_btc_benefits_split" DROP COLUMN "card_title";
  ALTER TABLE "pages_blocks_btc_benefits_split" DROP COLUMN "card_subtitle";
  ALTER TABLE "pages_blocks_btc_process_steps_steps" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_btc_process_steps_steps" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_btc_process_steps_steps" DROP COLUMN "badge";
  ALTER TABLE "pages_blocks_btc_process_steps" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_btc_process_steps" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_btc_process_steps" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_btc_stats_row_stats" DROP COLUMN "value";
  ALTER TABLE "pages_blocks_btc_stats_row_stats" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_btc_testimonials_grid" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_btc_testimonials_grid" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_btc_faq_accordion" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_btc_faq_accordion" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_btc_cta_banner_links" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_btc_cta_banner" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_btc_cta_banner" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_btc_gallery_filter" DROP COLUMN "all_label";
  ALTER TABLE "pages_blocks_btc_difference_cards" DROP COLUMN "badge";
  ALTER TABLE "pages_blocks_btc_difference_cards" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_btc_difference_cards" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_btc_difference_cards" DROP COLUMN "meta_label";
  ALTER TABLE "pages_blocks_btc_difference_cards" DROP COLUMN "meta_value";
  ALTER TABLE "pages_blocks_btc_difference_cards" DROP COLUMN "highlight";
  ALTER TABLE "pages_blocks_btc_difference" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_btc_difference" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_btc_difference" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_btc_contact_section" DROP COLUMN "info_title";
  ALTER TABLE "pages_blocks_btc_contact_section" DROP COLUMN "social_title";
  ALTER TABLE "pages_blocks_btc_contact_section" DROP COLUMN "form_title";
  ALTER TABLE "pages_blocks_btc_contact_section" DROP COLUMN "form_lead";
  ALTER TABLE "pages_blocks_btc_contact_section" DROP COLUMN "privacy_policy_url";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "rich_text";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "rich_text";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "intro_content";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "intro_content";
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "hero_rich_text";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_btc_hero_buttons" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_btc_hero" DROP COLUMN "badge";
  ALTER TABLE "_pages_v_blocks_btc_hero" DROP COLUMN "headline";
  ALTER TABLE "_pages_v_blocks_btc_hero" DROP COLUMN "headline_accent";
  ALTER TABLE "_pages_v_blocks_btc_hero" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_btc_about_hero_highlights" DROP COLUMN "value";
  ALTER TABLE "_pages_v_blocks_btc_about_hero_highlights" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_btc_about_hero" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_btc_about_hero" DROP COLUMN "headline";
  ALTER TABLE "_pages_v_blocks_btc_about_hero" DROP COLUMN "headline_accent";
  ALTER TABLE "_pages_v_blocks_btc_about_hero" DROP COLUMN "lead";
  ALTER TABLE "_pages_v_blocks_btc_about_hero" DROP COLUMN "card_title";
  ALTER TABLE "_pages_v_blocks_btc_about_hero" DROP COLUMN "card_subtitle";
  ALTER TABLE "_pages_v_blocks_btc_section_intro" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_btc_section_intro" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_btc_section_intro" DROP COLUMN "lead";
  ALTER TABLE "_pages_v_blocks_btc_benefits_split_benefits" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_btc_benefits_split_benefits" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_btc_benefits_split" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_btc_benefits_split" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_btc_benefits_split" DROP COLUMN "card_title";
  ALTER TABLE "_pages_v_blocks_btc_benefits_split" DROP COLUMN "card_subtitle";
  ALTER TABLE "_pages_v_blocks_btc_process_steps_steps" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_btc_process_steps_steps" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_btc_process_steps_steps" DROP COLUMN "badge";
  ALTER TABLE "_pages_v_blocks_btc_process_steps" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_btc_process_steps" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_btc_process_steps" DROP COLUMN "intro";
  ALTER TABLE "_pages_v_blocks_btc_stats_row_stats" DROP COLUMN "value";
  ALTER TABLE "_pages_v_blocks_btc_stats_row_stats" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_btc_testimonials_grid" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_btc_testimonials_grid" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_btc_faq_accordion" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_btc_faq_accordion" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_btc_cta_banner_links" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_btc_cta_banner" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_btc_cta_banner" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_btc_gallery_filter" DROP COLUMN "all_label";
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" DROP COLUMN "badge";
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" DROP COLUMN "meta_label";
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" DROP COLUMN "meta_value";
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" DROP COLUMN "highlight";
  ALTER TABLE "_pages_v_blocks_btc_difference" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_blocks_btc_difference" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_btc_difference" DROP COLUMN "intro";
  ALTER TABLE "_pages_v_blocks_btc_contact_section" DROP COLUMN "info_title";
  ALTER TABLE "_pages_v_blocks_btc_contact_section" DROP COLUMN "social_title";
  ALTER TABLE "_pages_v_blocks_btc_contact_section" DROP COLUMN "form_title";
  ALTER TABLE "_pages_v_blocks_btc_contact_section" DROP COLUMN "form_lead";
  ALTER TABLE "_pages_v_blocks_btc_contact_section" DROP COLUMN "privacy_policy_url";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "rich_text";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "rich_text";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "intro_content";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "intro_content";
  ALTER TABLE "_pages_v" DROP COLUMN "version_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "content";
  DO $mig$ BEGIN
    ALTER TABLE "posts_rels" DROP COLUMN "users_id";
  EXCEPTION WHEN undefined_column THEN NULL; END $mig$;
  ALTER TABLE "_posts_v" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_content";
  DO $mig$ BEGIN
    ALTER TABLE "_posts_v_rels" DROP COLUMN "users_id";
  EXCEPTION WHEN undefined_column THEN NULL; END $mig$;
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "categories" DROP COLUMN "title";
  DO $mig$ BEGIN
    ALTER TABLE "tags" DROP COLUMN "title";
  EXCEPTION WHEN undefined_column THEN NULL; END $mig$;
  ALTER TABLE "services" DROP COLUMN "title";
  ALTER TABLE "services" DROP COLUMN "summary";
  ALTER TABLE "testimonials" DROP COLUMN "quote";
  ALTER TABLE "testimonials" DROP COLUMN "name";
  ALTER TABLE "testimonials" DROP COLUMN "subtitle";
  ALTER TABLE "faqs" DROP COLUMN "question";
  ALTER TABLE "faqs" DROP COLUMN "answer";
  ALTER TABLE "gallery_items" DROP COLUMN "title";
  ALTER TABLE "gallery_items" DROP COLUMN "caption";
  ALTER TABLE "gallery_items" DROP COLUMN "badge_label";
  ALTER TABLE "gallery_items" DROP COLUMN "location";
  ALTER TABLE "gallery_items" DROP COLUMN "system_size";
  ALTER TABLE "site_social_links" DROP COLUMN "label";
  ALTER TABLE "site" DROP COLUMN "site_name";
  ALTER TABLE "site" DROP COLUMN "default_title";
  ALTER TABLE "site" DROP COLUMN "default_description";
  ALTER TABLE "site" DROP COLUMN "address";
  ALTER TABLE "site" DROP COLUMN "working_hours";
  ALTER TABLE "home_stats_stats" DROP COLUMN "value";
  ALTER TABLE "home_stats_stats" DROP COLUMN "label";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_label";
  ALTER TABLE "header" DROP COLUMN "tagline";
  ALTER TABLE "header" DROP COLUMN "cta_label";
  ALTER TABLE "footer_columns_links" DROP COLUMN "link_label";
  ALTER TABLE "footer_columns" DROP COLUMN "heading";
  ALTER TABLE "footer" DROP COLUMN "brand_description";
  ALTER TABLE "footer" DROP COLUMN "copyright_text";
  `)

}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  ALTER TABLE "pages_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_about_hero_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_about_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_section_intro_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_benefits_split_benefits_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_benefits_split_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_process_steps_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_process_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_stats_row_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_testimonials_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_faq_accordion_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_cta_banner_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_cta_banner_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_gallery_filter_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_difference_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_difference_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_btc_contact_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_archive_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_form_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_hero_buttons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_about_hero_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_about_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_section_intro_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_benefits_split_benefits_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_benefits_split_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_process_steps_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_process_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_stats_row_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_testimonials_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_faq_accordion_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_cta_banner_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_cta_banner_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_gallery_filter_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_difference_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_difference_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_btc_contact_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_archive_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_social_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_stats_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_hero_buttons_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_about_hero_highlights_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_about_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_section_intro_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_benefits_split_benefits_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_benefits_split_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_process_steps_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_process_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_stats_row_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_testimonials_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_faq_accordion_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_cta_banner_links_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_cta_banner_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_gallery_filter_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_difference_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_difference_locales" CASCADE;
  DROP TABLE "pages_blocks_btc_contact_section_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_content_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_archive_locales" CASCADE;
  DROP TABLE "pages_blocks_form_block_locales" CASCADE;
  DROP TABLE "_pages_v_version_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_hero_buttons_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_about_hero_highlights_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_about_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_section_intro_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_benefits_split_benefits_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_benefits_split_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_process_steps_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_process_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_stats_row_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_testimonials_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_faq_accordion_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_cta_banner_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_cta_banner_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_gallery_filter_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_difference_cards_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_difference_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_btc_contact_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_archive_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block_locales" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "tags_locales" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "gallery_items_locales" CASCADE;
  DROP TABLE "site_social_links_locales" CASCADE;
  DROP TABLE "site_locales" CASCADE;
  DROP TABLE "home_stats_stats_locales" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_tags_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_tags_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tags_fk";
  
  DROP INDEX "posts_rels_tags_id_idx";
  DROP INDEX "_posts_v_rels_tags_id_idx";
  DROP INDEX "payload_locked_documents_rels_tags_id_idx";
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_btc_hero_buttons" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_btc_hero" ADD COLUMN "badge" varchar;
  ALTER TABLE "pages_blocks_btc_hero" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_btc_hero" ADD COLUMN "headline_accent" varchar;
  ALTER TABLE "pages_blocks_btc_hero" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_btc_about_hero_highlights" ADD COLUMN "value" varchar;
  ALTER TABLE "pages_blocks_btc_about_hero_highlights" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_btc_about_hero" ADD COLUMN "eyebrow" varchar DEFAULT 'About BTC Solar';
  ALTER TABLE "pages_blocks_btc_about_hero" ADD COLUMN "headline" varchar DEFAULT 'Powering Moldova''s';
  ALTER TABLE "pages_blocks_btc_about_hero" ADD COLUMN "headline_accent" varchar DEFAULT 'Sustainable Future';
  ALTER TABLE "pages_blocks_btc_about_hero" ADD COLUMN "lead" varchar DEFAULT 'We are Moldova''s trusted leader in solar energy solutions, committed to making clean energy accessible, affordable, and efficient for every home and business.';
  ALTER TABLE "pages_blocks_btc_about_hero" ADD COLUMN "card_title" varchar DEFAULT '10 MW';
  ALTER TABLE "pages_blocks_btc_about_hero" ADD COLUMN "card_subtitle" varchar DEFAULT 'Installed Capacity';
  ALTER TABLE "pages_blocks_btc_section_intro" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_btc_section_intro" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_btc_section_intro" ADD COLUMN "lead" varchar;
  ALTER TABLE "pages_blocks_btc_benefits_split_benefits" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_btc_benefits_split_benefits" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_btc_benefits_split" ADD COLUMN "eyebrow" varchar DEFAULT 'Why Solar?';
  ALTER TABLE "pages_blocks_btc_benefits_split" ADD COLUMN "heading" varchar DEFAULT 'Benefits of Going Solar';
  ALTER TABLE "pages_blocks_btc_benefits_split" ADD COLUMN "card_title" varchar;
  ALTER TABLE "pages_blocks_btc_benefits_split" ADD COLUMN "card_subtitle" varchar;
  ALTER TABLE "pages_blocks_btc_process_steps_steps" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_btc_process_steps_steps" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_btc_process_steps_steps" ADD COLUMN "badge" varchar;
  ALTER TABLE "pages_blocks_btc_process_steps" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_btc_process_steps" ADD COLUMN "title" varchar DEFAULT 'Our Installation Process';
  ALTER TABLE "pages_blocks_btc_process_steps" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_btc_stats_row_stats" ADD COLUMN "value" varchar;
  ALTER TABLE "pages_blocks_btc_stats_row_stats" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_btc_testimonials_grid" ADD COLUMN "eyebrow" varchar DEFAULT 'Testimonials';
  ALTER TABLE "pages_blocks_btc_testimonials_grid" ADD COLUMN "title" varchar DEFAULT 'What Our Clients Say';
  ALTER TABLE "pages_blocks_btc_faq_accordion" ADD COLUMN "eyebrow" varchar DEFAULT 'FAQ';
  ALTER TABLE "pages_blocks_btc_faq_accordion" ADD COLUMN "title" varchar DEFAULT 'Frequently Asked Questions';
  ALTER TABLE "pages_blocks_btc_cta_banner_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_btc_cta_banner" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_btc_cta_banner" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_btc_gallery_filter" ADD COLUMN "all_label" varchar DEFAULT 'All Projects';
  ALTER TABLE "pages_blocks_btc_difference_cards" ADD COLUMN "badge" varchar DEFAULT 'After Installation';
  ALTER TABLE "pages_blocks_btc_difference_cards" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_btc_difference_cards" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_btc_difference_cards" ADD COLUMN "meta_label" varchar;
  ALTER TABLE "pages_blocks_btc_difference_cards" ADD COLUMN "meta_value" varchar;
  ALTER TABLE "pages_blocks_btc_difference_cards" ADD COLUMN "highlight" varchar;
  ALTER TABLE "pages_blocks_btc_difference" ADD COLUMN "eyebrow" varchar DEFAULT 'Transformation';
  ALTER TABLE "pages_blocks_btc_difference" ADD COLUMN "heading" varchar DEFAULT 'See the Difference';
  ALTER TABLE "pages_blocks_btc_difference" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_btc_contact_section" ADD COLUMN "info_title" varchar DEFAULT 'Contact Information';
  ALTER TABLE "pages_blocks_btc_contact_section" ADD COLUMN "social_title" varchar DEFAULT 'Follow Us';
  ALTER TABLE "pages_blocks_btc_contact_section" ADD COLUMN "form_title" varchar DEFAULT 'Request a Free Consultation';
  ALTER TABLE "pages_blocks_btc_contact_section" ADD COLUMN "form_lead" varchar DEFAULT 'Fill out the form below and our team will contact you within 24 hours.';
  ALTER TABLE "pages_blocks_btc_contact_section" ADD COLUMN "privacy_policy_url" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_btc_hero_buttons" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_btc_hero" ADD COLUMN "badge" varchar;
  ALTER TABLE "_pages_v_blocks_btc_hero" ADD COLUMN "headline" varchar;
  ALTER TABLE "_pages_v_blocks_btc_hero" ADD COLUMN "headline_accent" varchar;
  ALTER TABLE "_pages_v_blocks_btc_hero" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_btc_about_hero_highlights" ADD COLUMN "value" varchar;
  ALTER TABLE "_pages_v_blocks_btc_about_hero_highlights" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_btc_about_hero" ADD COLUMN "eyebrow" varchar DEFAULT 'About BTC Solar';
  ALTER TABLE "_pages_v_blocks_btc_about_hero" ADD COLUMN "headline" varchar DEFAULT 'Powering Moldova''s';
  ALTER TABLE "_pages_v_blocks_btc_about_hero" ADD COLUMN "headline_accent" varchar DEFAULT 'Sustainable Future';
  ALTER TABLE "_pages_v_blocks_btc_about_hero" ADD COLUMN "lead" varchar DEFAULT 'We are Moldova''s trusted leader in solar energy solutions, committed to making clean energy accessible, affordable, and efficient for every home and business.';
  ALTER TABLE "_pages_v_blocks_btc_about_hero" ADD COLUMN "card_title" varchar DEFAULT '10 MW';
  ALTER TABLE "_pages_v_blocks_btc_about_hero" ADD COLUMN "card_subtitle" varchar DEFAULT 'Installed Capacity';
  ALTER TABLE "_pages_v_blocks_btc_section_intro" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_btc_section_intro" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_btc_section_intro" ADD COLUMN "lead" varchar;
  ALTER TABLE "_pages_v_blocks_btc_benefits_split_benefits" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_btc_benefits_split_benefits" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_btc_benefits_split" ADD COLUMN "eyebrow" varchar DEFAULT 'Why Solar?';
  ALTER TABLE "_pages_v_blocks_btc_benefits_split" ADD COLUMN "heading" varchar DEFAULT 'Benefits of Going Solar';
  ALTER TABLE "_pages_v_blocks_btc_benefits_split" ADD COLUMN "card_title" varchar;
  ALTER TABLE "_pages_v_blocks_btc_benefits_split" ADD COLUMN "card_subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_btc_process_steps_steps" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_btc_process_steps_steps" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_btc_process_steps_steps" ADD COLUMN "badge" varchar;
  ALTER TABLE "_pages_v_blocks_btc_process_steps" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_btc_process_steps" ADD COLUMN "title" varchar DEFAULT 'Our Installation Process';
  ALTER TABLE "_pages_v_blocks_btc_process_steps" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_btc_stats_row_stats" ADD COLUMN "value" varchar;
  ALTER TABLE "_pages_v_blocks_btc_stats_row_stats" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_btc_testimonials_grid" ADD COLUMN "eyebrow" varchar DEFAULT 'Testimonials';
  ALTER TABLE "_pages_v_blocks_btc_testimonials_grid" ADD COLUMN "title" varchar DEFAULT 'What Our Clients Say';
  ALTER TABLE "_pages_v_blocks_btc_faq_accordion" ADD COLUMN "eyebrow" varchar DEFAULT 'FAQ';
  ALTER TABLE "_pages_v_blocks_btc_faq_accordion" ADD COLUMN "title" varchar DEFAULT 'Frequently Asked Questions';
  ALTER TABLE "_pages_v_blocks_btc_cta_banner_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_btc_cta_banner" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_btc_cta_banner" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_btc_gallery_filter" ADD COLUMN "all_label" varchar DEFAULT 'All Projects';
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" ADD COLUMN "badge" varchar DEFAULT 'After Installation';
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" ADD COLUMN "meta_label" varchar;
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" ADD COLUMN "meta_value" varchar;
  ALTER TABLE "_pages_v_blocks_btc_difference_cards" ADD COLUMN "highlight" varchar;
  ALTER TABLE "_pages_v_blocks_btc_difference" ADD COLUMN "eyebrow" varchar DEFAULT 'Transformation';
  ALTER TABLE "_pages_v_blocks_btc_difference" ADD COLUMN "heading" varchar DEFAULT 'See the Difference';
  ALTER TABLE "_pages_v_blocks_btc_difference" ADD COLUMN "intro" varchar;
  ALTER TABLE "_pages_v_blocks_btc_contact_section" ADD COLUMN "info_title" varchar DEFAULT 'Contact Information';
  ALTER TABLE "_pages_v_blocks_btc_contact_section" ADD COLUMN "social_title" varchar DEFAULT 'Follow Us';
  ALTER TABLE "_pages_v_blocks_btc_contact_section" ADD COLUMN "form_title" varchar DEFAULT 'Request a Free Consultation';
  ALTER TABLE "_pages_v_blocks_btc_contact_section" ADD COLUMN "form_lead" varchar DEFAULT 'Fill out the form below and our team will contact you within 24 hours.';
  ALTER TABLE "_pages_v_blocks_btc_contact_section" ADD COLUMN "privacy_policy_url" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "users_id" integer;
  ALTER TABLE "media" ADD COLUMN "alt" varchar;
  ALTER TABLE "media" ADD COLUMN "caption" jsonb;
  ALTER TABLE "categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "services" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "services" ADD COLUMN "summary" varchar NOT NULL;
  ALTER TABLE "testimonials" ADD COLUMN "quote" varchar NOT NULL;
  ALTER TABLE "testimonials" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "testimonials" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "faqs" ADD COLUMN "question" varchar NOT NULL;
  ALTER TABLE "faqs" ADD COLUMN "answer" varchar NOT NULL;
  ALTER TABLE "gallery_items" ADD COLUMN "title" varchar;
  ALTER TABLE "gallery_items" ADD COLUMN "caption" varchar;
  ALTER TABLE "gallery_items" ADD COLUMN "badge_label" varchar;
  ALTER TABLE "gallery_items" ADD COLUMN "location" varchar;
  ALTER TABLE "gallery_items" ADD COLUMN "system_size" varchar;
  ALTER TABLE "site_social_links" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "site" ADD COLUMN "site_name" varchar DEFAULT 'BTC Solar';
  ALTER TABLE "site" ADD COLUMN "default_title" varchar;
  ALTER TABLE "site" ADD COLUMN "default_description" varchar;
  ALTER TABLE "site" ADD COLUMN "address" varchar;
  ALTER TABLE "site" ADD COLUMN "working_hours" varchar;
  ALTER TABLE "home_stats_stats" ADD COLUMN "value" varchar NOT NULL;
  ALTER TABLE "home_stats_stats" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "header" ADD COLUMN "tagline" varchar;
  ALTER TABLE "header" ADD COLUMN "cta_label" varchar NOT NULL;
  ALTER TABLE "footer_columns_links" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "footer_columns" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "brand_description" varchar DEFAULT 'Premium solar energy solutions for homes and businesses across Moldova. Your trusted partner in renewable energy.';
  ALTER TABLE "footer" ADD COLUMN "copyright_text" varchar;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  ALTER TABLE "pages_locales" DROP COLUMN "title";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_rich_text";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_title";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "posts_locales" DROP COLUMN "title";
  ALTER TABLE "posts_locales" DROP COLUMN "content";
  ALTER TABLE "posts_rels" DROP COLUMN "tags_id";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_content";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "tags_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tags_id";`)
}
