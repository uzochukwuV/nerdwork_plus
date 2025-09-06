import swaggerJSDoc from "swagger-jsdoc";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Comic App API",
            version: "1.0.0",
            description: "API documentation for Comic App",
        },
        servers: [{ url: "http://localhost:5000" }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};
export const swaggerSpec = swaggerJSDoc(options);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlckNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN3YWdnZXJDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE1BQU0sT0FBTyxHQUFHO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsT0FBTyxFQUFFLE9BQU87UUFDaEIsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLGVBQWU7WUFDdEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsV0FBVyxFQUFFLGlDQUFpQztTQUMvQztRQUNELE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLHVCQUF1QixFQUFFLENBQUM7UUFDM0MsVUFBVSxFQUFFO1lBQ1YsZUFBZSxFQUFFO2dCQUNmLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsTUFBTTtvQkFDWixNQUFNLEVBQUUsUUFBUTtvQkFDaEIsWUFBWSxFQUFFLEtBQUs7aUJBQ3BCO2FBQ0Y7U0FDRjtRQUNELFFBQVEsRUFBRTtZQUNSO2dCQUNFLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7U0FDRjtLQUNGO0lBQ0QsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7Q0FDNUIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3dhZ2dlckpTRG9jIGZyb20gXCJzd2FnZ2VyLWpzZG9jXCI7XHJcblxyXG5jb25zdCBvcHRpb25zID0ge1xyXG4gIGRlZmluaXRpb246IHtcclxuICAgIG9wZW5hcGk6IFwiMy4wLjBcIixcclxuICAgIGluZm86IHtcclxuICAgICAgdGl0bGU6IFwiQ29taWMgQXBwIEFQSVwiLFxyXG4gICAgICB2ZXJzaW9uOiBcIjEuMC4wXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkFQSSBkb2N1bWVudGF0aW9uIGZvciBDb21pYyBBcHBcIixcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXJzOiBbeyB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwXCIgfV0sXHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgIHNlY3VyaXR5U2NoZW1lczoge1xyXG4gICAgICAgIGJlYXJlckF1dGg6IHtcclxuICAgICAgICAgIHR5cGU6IFwiaHR0cFwiLFxyXG4gICAgICAgICAgc2NoZW1lOiBcImJlYXJlclwiLFxyXG4gICAgICAgICAgYmVhcmVyRm9ybWF0OiBcIkpXVFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2VjdXJpdHk6IFtcclxuICAgICAge1xyXG4gICAgICAgIGJlYXJlckF1dGg6IFtdLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIGFwaXM6IFtcIi4vc3JjL3JvdXRlcy8qLnRzXCJdLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHN3YWdnZXJTcGVjID0gc3dhZ2dlckpTRG9jKG9wdGlvbnMpO1xyXG4iXX0=