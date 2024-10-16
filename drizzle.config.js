/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:v3zAVOys9DBh@ep-hidden-mud-a1l73z7f.ap-southeast-1.aws.neon.tech/car-markey?sslmode=require',
    }
  };