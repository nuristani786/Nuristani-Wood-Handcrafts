CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_fa" text NOT NULL,
	"name_en" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_fa" text NOT NULL,
	"name_en" text NOT NULL,
	"price" integer NOT NULL,
	"description_fa" text DEFAULT '' NOT NULL,
	"description_en" text DEFAULT '' NOT NULL,
	"category_id" integer,
	"in_stock" boolean DEFAULT true NOT NULL,
	"dimensions" text,
	"weight" text,
	"image_urls" json DEFAULT '[]'::json NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;