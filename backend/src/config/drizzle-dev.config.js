// import { config } from "dotenv";
// import { defineConfig } from "drizzle-kit";
// config({ path: ".env.local" });
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env.local" });
export default defineConfig({
    schema: "./src/model/schema.ts",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
// export default defineConfig({
//   schema: "./src/model/schema.ts",
//   out: "./migrations",
//   driver: "pg", // ✅ pg driver for PostgreSQL
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpenpsZS1kZXYuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHJpenpsZS1kZXYuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQyw4Q0FBOEM7QUFFOUMsa0NBQWtDO0FBSWxDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUzQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUUvQixlQUFlLFlBQVksQ0FBQztJQUMxQixNQUFNLEVBQUUsdUJBQXVCO0lBQy9CLEdBQUcsRUFBRSxjQUFjO0lBQ25CLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLGFBQWEsRUFBRTtRQUNiLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQWE7S0FDL0I7Q0FDRixDQUFDLENBQUM7QUFFSCxnQ0FBZ0M7QUFDaEMscUNBQXFDO0FBQ3JDLHlCQUF5QjtBQUN6QixnREFBZ0Q7QUFDaEQscUJBQXFCO0FBQ3JCLG1EQUFtRDtBQUNuRCxPQUFPO0FBQ1AsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCJkb3RlbnZcIjtcclxuLy8gaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcImRyaXp6bGUta2l0XCI7XHJcblxyXG4vLyBjb25maWcoeyBwYXRoOiBcIi5lbnYubG9jYWxcIiB9KTtcclxuXHJcblxyXG5cclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcImRvdGVudlwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwiZHJpenpsZS1raXRcIjtcclxuXHJcbmNvbmZpZyh7IHBhdGg6IFwiLmVudi5sb2NhbFwiIH0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBzY2hlbWE6IFwiLi9zcmMvbW9kZWwvc2NoZW1hLnRzXCIsXHJcbiAgb3V0OiBcIi4vbWlncmF0aW9uc1wiLFxyXG4gIGRpYWxlY3Q6IFwicG9zdGdyZXNxbFwiLFxyXG4gIGRiQ3JlZGVudGlhbHM6IHtcclxuICAgIHVybDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMISxcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbi8vICAgc2NoZW1hOiBcIi4vc3JjL21vZGVsL3NjaGVtYS50c1wiLFxyXG4vLyAgIG91dDogXCIuL21pZ3JhdGlvbnNcIixcclxuLy8gICBkcml2ZXI6IFwicGdcIiwgLy8g4pyFIHBnIGRyaXZlciBmb3IgUG9zdGdyZVNRTFxyXG4vLyAgIGRiQ3JlZGVudGlhbHM6IHtcclxuLy8gICAgIGNvbm5lY3Rpb25TdHJpbmc6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCEsXHJcbi8vICAgfSxcclxuLy8gfSk7XHJcbiJdfQ==