import { Router } from "express";
import { signup, login } from "../controller/auth.js";
import { authenticate } from "../middleware/common/auth.js";
import { getCurrentUser } from "../controller/auth.js";
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: password123
 *         username:
 *           type: string
 *           example: comicfan2024
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: password123
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 username:
 *                   type: string
 *                   example: comicfan2024
 *         message:
 *           type: string
 *           example: "User created successfully"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: "Invalid credentials"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T00:00:00.000Z"
 */
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user account
 *     description: Register a new user for the NerdWork comic platform
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/signup", signup);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to user account
 *     description: Authenticate user credentials and return JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", login);
router.get("/me", authenticate, getCurrentUser);
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRoLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV2RCxNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUV4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkVHO0FBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NHO0FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NHO0FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRWhELGVBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgc2lnbnVwLCBsb2dpbiB9IGZyb20gXCIuLi9jb250cm9sbGVyL2F1dGguanNcIjtcclxuaW1wb3J0IHsgYXV0aGVudGljYXRlIH0gZnJvbSBcIi4uL21pZGRsZXdhcmUvY29tbW9uL2F1dGguanNcIjtcclxuaW1wb3J0IHsgZ2V0Q3VycmVudFVzZXIgfSBmcm9tIFwiLi4vY29udHJvbGxlci9hdXRoLmpzXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBjb21wb25lbnRzOlxyXG4gKiAgIHNjaGVtYXM6XHJcbiAqICAgICBTaWdudXBSZXF1ZXN0OlxyXG4gKiAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgLSBlbWFpbFxyXG4gKiAgICAgICAgIC0gcGFzc3dvcmRcclxuICogICAgICAgICAtIHVzZXJuYW1lXHJcbiAqICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgZW1haWw6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgIGZvcm1hdDogZW1haWxcclxuICogICAgICAgICAgIGV4YW1wbGU6IHVzZXJAZXhhbXBsZS5jb21cclxuICogICAgICAgICBwYXNzd29yZDpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgbWluTGVuZ3RoOiA2XHJcbiAqICAgICAgICAgICBleGFtcGxlOiBwYXNzd29yZDEyM1xyXG4gKiAgICAgICAgIHVzZXJuYW1lOlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICBleGFtcGxlOiBjb21pY2ZhbjIwMjRcclxuICogICAgIExvZ2luUmVxdWVzdDpcclxuICogICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgIHJlcXVpcmVkOlxyXG4gKiAgICAgICAgIC0gZW1haWxcclxuICogICAgICAgICAtIHBhc3N3b3JkXHJcbiAqICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgZW1haWw6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgIGZvcm1hdDogZW1haWxcclxuICogICAgICAgICAgIGV4YW1wbGU6IHVzZXJAZXhhbXBsZS5jb21cclxuICogICAgICAgICBwYXNzd29yZDpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZXhhbXBsZTogcGFzc3dvcmQxMjNcclxuICogICAgIEF1dGhSZXNwb25zZTpcclxuICogICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgc3VjY2VzczpcclxuICogICAgICAgICAgIHR5cGU6IGJvb2xlYW5cclxuICogICAgICAgICAgIGV4YW1wbGU6IHRydWVcclxuICogICAgICAgICBkYXRhOlxyXG4gKiAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICAgICB0b2tlbjpcclxuICogICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgICBleGFtcGxlOiBcImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS4uLlwiXHJcbiAqICAgICAgICAgICAgIHVzZXI6XHJcbiAqICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgICAgICAgIGlkOlxyXG4gKiAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgICAgICAgZXhhbXBsZTogXCIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDBcIlxyXG4gKiAgICAgICAgICAgICAgICAgZW1haWw6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgICBleGFtcGxlOiB1c2VyQGV4YW1wbGUuY29tXHJcbiAqICAgICAgICAgICAgICAgICB1c2VybmFtZTpcclxuICogICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICAgIGV4YW1wbGU6IGNvbWljZmFuMjAyNFxyXG4gKiAgICAgICAgIG1lc3NhZ2U6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgIGV4YW1wbGU6IFwiVXNlciBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiXHJcbiAqICAgICBFcnJvclJlc3BvbnNlOlxyXG4gKiAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICBzdWNjZXNzOlxyXG4gKiAgICAgICAgICAgdHlwZTogYm9vbGVhblxyXG4gKiAgICAgICAgICAgZXhhbXBsZTogZmFsc2VcclxuICogICAgICAgICBlcnJvcjpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZXhhbXBsZTogXCJJbnZhbGlkIGNyZWRlbnRpYWxzXCJcclxuICogICAgICAgICB0aW1lc3RhbXA6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgIGZvcm1hdDogZGF0ZS10aW1lXHJcbiAqICAgICAgICAgICBleGFtcGxlOiBcIjIwMjQtMDEtMDFUMDA6MDA6MDAuMDAwWlwiXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIC9hdXRoL3NpZ251cDpcclxuICogICBwb3N0OlxyXG4gKiAgICAgc3VtbWFyeTogQ3JlYXRlIGEgbmV3IHVzZXIgYWNjb3VudFxyXG4gKiAgICAgZGVzY3JpcHRpb246IFJlZ2lzdGVyIGEgbmV3IHVzZXIgZm9yIHRoZSBOZXJkV29yayBjb21pYyBwbGF0Zm9ybVxyXG4gKiAgICAgdGFnczogW0F1dGhlbnRpY2F0aW9uXVxyXG4gKiAgICAgcmVxdWVzdEJvZHk6XHJcbiAqICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAqICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgYXBwbGljYXRpb24vanNvbjpcclxuICogICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgJHJlZjogJyMvY29tcG9uZW50cy9zY2hlbWFzL1NpZ251cFJlcXVlc3QnXHJcbiAqICAgICByZXNwb25zZXM6XHJcbiAqICAgICAgIDIwMTpcclxuICogICAgICAgICBkZXNjcmlwdGlvbjogVXNlciBhY2NvdW50IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICAkcmVmOiAnIy9jb21wb25lbnRzL3NjaGVtYXMvQXV0aFJlc3BvbnNlJ1xyXG4gKiAgICAgICA0MDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IEludmFsaWQgaW5wdXQgZGF0YVxyXG4gKiAgICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgICAgJHJlZjogJyMvY29tcG9uZW50cy9zY2hlbWFzL0Vycm9yUmVzcG9uc2UnXHJcbiAqICAgICAgIDQwOTpcclxuICogICAgICAgICBkZXNjcmlwdGlvbjogVXNlciBhbHJlYWR5IGV4aXN0c1xyXG4gKiAgICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgICAgJHJlZjogJyMvY29tcG9uZW50cy9zY2hlbWFzL0Vycm9yUmVzcG9uc2UnXHJcbiAqICAgICAgIDUwMDpcclxuICogICAgICAgICBkZXNjcmlwdGlvbjogSW50ZXJuYWwgc2VydmVyIGVycm9yXHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICAkcmVmOiAnIy9jb21wb25lbnRzL3NjaGVtYXMvRXJyb3JSZXNwb25zZSdcclxuICovXHJcbnJvdXRlci5wb3N0KFwiL3NpZ251cFwiLCBzaWdudXApO1xyXG5cclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIC9hdXRoL2xvZ2luOlxyXG4gKiAgIHBvc3Q6XHJcbiAqICAgICBzdW1tYXJ5OiBMb2dpbiB0byB1c2VyIGFjY291bnRcclxuICogICAgIGRlc2NyaXB0aW9uOiBBdXRoZW50aWNhdGUgdXNlciBjcmVkZW50aWFscyBhbmQgcmV0dXJuIEpXVCB0b2tlblxyXG4gKiAgICAgdGFnczogW0F1dGhlbnRpY2F0aW9uXVxyXG4gKiAgICAgcmVxdWVzdEJvZHk6XHJcbiAqICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAqICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgYXBwbGljYXRpb24vanNvbjpcclxuICogICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgJHJlZjogJyMvY29tcG9uZW50cy9zY2hlbWFzL0xvZ2luUmVxdWVzdCdcclxuICogICAgIHJlc3BvbnNlczpcclxuICogICAgICAgMjAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBMb2dpbiBzdWNjZXNzZnVsXHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICAkcmVmOiAnIy9jb21wb25lbnRzL3NjaGVtYXMvQXV0aFJlc3BvbnNlJ1xyXG4gKiAgICAgICA0MDE6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IEludmFsaWQgZW1haWwgb3IgcGFzc3dvcmRcclxuICogICAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgICAgYXBwbGljYXRpb24vanNvbjpcclxuICogICAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICAgICRyZWY6ICcjL2NvbXBvbmVudHMvc2NoZW1hcy9FcnJvclJlc3BvbnNlJ1xyXG4gKiAgICAgICA0MDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IE1pc3NpbmcgcmVxdWlyZWQgZmllbGRzXHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICAkcmVmOiAnIy9jb21wb25lbnRzL3NjaGVtYXMvRXJyb3JSZXNwb25zZSdcclxuICogICAgICAgNTAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcclxuICogICAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgICAgYXBwbGljYXRpb24vanNvbjpcclxuICogICAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICAgICRyZWY6ICcjL2NvbXBvbmVudHMvc2NoZW1hcy9FcnJvclJlc3BvbnNlJ1xyXG4gKi9cclxucm91dGVyLnBvc3QoXCIvbG9naW5cIiwgbG9naW4pO1xyXG5cclxucm91dGVyLmdldChcIi9tZVwiLCBhdXRoZW50aWNhdGUsIGdldEN1cnJlbnRVc2VyKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIl19