import { Router } from "express";
import { googleAuthController } from "../controller/auth.controller";
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     GoogleAuthRequest:
 *       type: object
 *       required:
 *         - idToken
 *       properties:
 *         idToken:
 *           type: string
 *           description: Google ID token obtained from the frontend after Google Sign-In
 *           example: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc4OT..."
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             email:
 *               type: string
 *               example: user@example.com
 *             username:
 *               type: string
 *               example: comicfan2024
 *         isNewUser:
 *           type: boolean
 *           description: Whether this is a new signup or an existing login
 *           example: false
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Invalid Google token"
 */
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Authenticate with Google
 *     description: Sign in with Google. If user exists → logs in. If not → signs up and returns JWT, user info, and isNewUser flag.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GoogleAuthRequest'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid Google token or missing fields
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
router.post("/signin", googleAuthController);
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRoLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXJFLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkNHO0FBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztBQUU3QyxlQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IGdvb2dsZUF1dGhDb250cm9sbGVyIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXIvYXV0aC5jb250cm9sbGVyXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIGNvbXBvbmVudHM6XHJcbiAqICAgc2NoZW1hczpcclxuICogICAgIEdvb2dsZUF1dGhSZXF1ZXN0OlxyXG4gKiAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgLSBpZFRva2VuXHJcbiAqICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgaWRUb2tlbjpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZGVzY3JpcHRpb246IEdvb2dsZSBJRCB0b2tlbiBvYnRhaW5lZCBmcm9tIHRoZSBmcm9udGVuZCBhZnRlciBHb29nbGUgU2lnbi1JblxyXG4gKiAgICAgICAgICAgZXhhbXBsZTogXCJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SWpjNE9ULi4uXCJcclxuICpcclxuICogICAgIEF1dGhSZXNwb25zZTpcclxuICogICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgdG9rZW46XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgIGV4YW1wbGU6IFwiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5Li4uXCJcclxuICogICAgICAgICB1c2VyOlxyXG4gKiAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICAgICBpZDpcclxuICogICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgICBleGFtcGxlOiBcIjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMFwiXHJcbiAqICAgICAgICAgICAgIGVtYWlsOlxyXG4gKiAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgIGV4YW1wbGU6IHVzZXJAZXhhbXBsZS5jb21cclxuICogICAgICAgICAgICAgdXNlcm5hbWU6XHJcbiAqICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgZXhhbXBsZTogY29taWNmYW4yMDI0XHJcbiAqICAgICAgICAgaXNOZXdVc2VyOlxyXG4gKiAgICAgICAgICAgdHlwZTogYm9vbGVhblxyXG4gKiAgICAgICAgICAgZGVzY3JpcHRpb246IFdoZXRoZXIgdGhpcyBpcyBhIG5ldyBzaWdudXAgb3IgYW4gZXhpc3RpbmcgbG9naW5cclxuICogICAgICAgICAgIGV4YW1wbGU6IGZhbHNlXHJcbiAqXHJcbiAqICAgICBFcnJvclJlc3BvbnNlOlxyXG4gKiAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICBlcnJvcjpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZXhhbXBsZTogXCJJbnZhbGlkIEdvb2dsZSB0b2tlblwiXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIC9hdXRoL3NpZ25pbjpcclxuICogICBwb3N0OlxyXG4gKiAgICAgc3VtbWFyeTogQXV0aGVudGljYXRlIHdpdGggR29vZ2xlXHJcbiAqICAgICBkZXNjcmlwdGlvbjogU2lnbiBpbiB3aXRoIEdvb2dsZS4gSWYgdXNlciBleGlzdHMg4oaSIGxvZ3MgaW4uIElmIG5vdCDihpIgc2lnbnMgdXAgYW5kIHJldHVybnMgSldULCB1c2VyIGluZm8sIGFuZCBpc05ld1VzZXIgZmxhZy5cclxuICogICAgIHRhZ3M6IFtBdXRoZW50aWNhdGlvbl1cclxuICogICAgIHJlcXVlc3RCb2R5OlxyXG4gKiAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gKiAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgICRyZWY6ICcjL2NvbXBvbmVudHMvc2NoZW1hcy9Hb29nbGVBdXRoUmVxdWVzdCdcclxuICogICAgIHJlc3BvbnNlczpcclxuICogICAgICAgMjAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBBdXRoZW50aWNhdGlvbiBzdWNjZXNzZnVsXHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICAkcmVmOiAnIy9jb21wb25lbnRzL3NjaGVtYXMvQXV0aFJlc3BvbnNlJ1xyXG4gKiAgICAgICA0MDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IEludmFsaWQgR29vZ2xlIHRva2VuIG9yIG1pc3NpbmcgZmllbGRzXHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICAkcmVmOiAnIy9jb21wb25lbnRzL3NjaGVtYXMvRXJyb3JSZXNwb25zZSdcclxuICogICAgICAgNTAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcclxuICogICAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgICAgYXBwbGljYXRpb24vanNvbjpcclxuICogICAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICAgICRyZWY6ICcjL2NvbXBvbmVudHMvc2NoZW1hcy9FcnJvclJlc3BvbnNlJ1xyXG4gKi9cclxucm91dGVyLnBvc3QoXCIvc2lnbmluXCIsIGdvb2dsZUF1dGhDb250cm9sbGVyKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIl19