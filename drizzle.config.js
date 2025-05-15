import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://LMS_owner:npg_1FG8qyMfOXRr@ep-winter-wildflower-a10mvigi-pooler.ap-southeast-1.aws.neon.tech/LMS?sslmode=require",
  },
});
