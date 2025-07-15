import swaggerJSDoc from "swagger-jsdoc";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation for my Comic app",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API files
};
export const swaggerSpec = swaggerJSDoc(options);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlckNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN3YWdnZXJDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE1BQU0sT0FBTyxHQUFHO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsT0FBTyxFQUFFLE9BQU87UUFDaEIsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLFFBQVE7WUFDZixPQUFPLEVBQUUsT0FBTztZQUNoQixXQUFXLEVBQUUsb0NBQW9DO1NBQ2xEO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsR0FBRyxFQUFFLHVCQUF1QjthQUM3QjtTQUNGO0tBQ0Y7SUFDRCxJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLHdCQUF3QjtDQUV0RCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzd2FnZ2VySlNEb2MgZnJvbSBcInN3YWdnZXItanNkb2NcIjtcclxuXHJcbmNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgZGVmaW5pdGlvbjoge1xyXG4gICAgb3BlbmFwaTogXCIzLjAuMFwiLFxyXG4gICAgaW5mbzoge1xyXG4gICAgICB0aXRsZTogXCJNeSBBUElcIixcclxuICAgICAgdmVyc2lvbjogXCIxLjAuMFwiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJBUEkgZG9jdW1lbnRhdGlvbiBmb3IgbXkgQ29taWMgYXBwXCIsXHJcbiAgICB9LFxyXG4gICAgc2VydmVyczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMFwiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIGFwaXM6IFsnLi9zcmMvcm91dGVzLyoudHMnXSwgLy8gUGF0aCB0byB0aGUgQVBJIGZpbGVzXHJcbiAgXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc3dhZ2dlclNwZWMgPSBzd2FnZ2VySlNEb2Mob3B0aW9ucyk7Il19