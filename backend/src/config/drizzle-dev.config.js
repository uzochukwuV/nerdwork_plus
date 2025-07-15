// import { config } from "dotenv";
// import { defineConfig } from "drizzle-kit";
// config({ path: ".env.local" });
// export default defineConfig({
//   schema: "./src/model/schema.ts",
//   out: "./migrations",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: process.env.DATABASE_URL!,
//   },
// });
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env.local" });
export default defineConfig({
    schema: "./src/model/schema.ts",
    out: "./migrations",
    driver: "pg", // ✅ pg driver for PostgreSQL
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpenpsZS1kZXYuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHJpenpsZS1kZXYuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQyw4Q0FBOEM7QUFFOUMsa0NBQWtDO0FBRWxDLGdDQUFnQztBQUNoQyxxQ0FBcUM7QUFDckMseUJBQXlCO0FBQ3pCLDJCQUEyQjtBQUMzQixxQkFBcUI7QUFDckIsc0NBQXNDO0FBQ3RDLE9BQU87QUFDUCxNQUFNO0FBRU4sT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTNDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBRS9CLGVBQWUsWUFBWSxDQUFDO0lBQzFCLE1BQU0sRUFBRSx1QkFBdUI7SUFDL0IsR0FBRyxFQUFFLGNBQWM7SUFDbkIsTUFBTSxFQUFFLElBQUksRUFBRSw2QkFBNkI7SUFDM0MsYUFBYSxFQUFFO1FBQ2IsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFhO0tBQzVDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcImRvdGVudlwiO1xyXG4vLyBpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwiZHJpenpsZS1raXRcIjtcclxuXHJcbi8vIGNvbmZpZyh7IHBhdGg6IFwiLmVudi5sb2NhbFwiIH0pO1xyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuLy8gICBzY2hlbWE6IFwiLi9zcmMvbW9kZWwvc2NoZW1hLnRzXCIsXHJcbi8vICAgb3V0OiBcIi4vbWlncmF0aW9uc1wiLFxyXG4vLyAgIGRpYWxlY3Q6IFwicG9zdGdyZXNxbFwiLFxyXG4vLyAgIGRiQ3JlZGVudGlhbHM6IHtcclxuLy8gICAgIHVybDogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMISxcclxuLy8gICB9LFxyXG4vLyB9KTtcclxuXHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCJkb3RlbnZcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcImRyaXp6bGUta2l0XCI7XHJcblxyXG5jb25maWcoeyBwYXRoOiBcIi5lbnYubG9jYWxcIiB9KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2NoZW1hOiBcIi4vc3JjL21vZGVsL3NjaGVtYS50c1wiLFxyXG4gIG91dDogXCIuL21pZ3JhdGlvbnNcIixcclxuICBkcml2ZXI6IFwicGdcIiwgLy8g4pyFIHBnIGRyaXZlciBmb3IgUG9zdGdyZVNRTFxyXG4gIGRiQ3JlZGVudGlhbHM6IHtcclxuICAgIGNvbm5lY3Rpb25TdHJpbmc6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCEsXHJcbiAgfSxcclxufSk7XHJcbiJdfQ==