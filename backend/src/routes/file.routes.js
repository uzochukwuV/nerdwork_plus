import { Router } from "express";
import multer from "multer";
import { uploadComicFile } from "../controller/file.controller";
const router = Router();
/**
 * @swagger
 * /file-upload/media:
 *   post:
 *     summary: Upload a media file to AWS S3 (served via CloudFront)
 *     description: >
 *       Receives a media file, uploads it to the configured S3 bucket, and returns a public CloudFront URL.
 *       The returned URL is safe to store in your database and can be used to directly serve the media.
 *     tags:
 *       - File Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to be uploaded
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 url:
 *                   type: string
 *                   example: "https://cdn.interspace.africa/media/1234abcd-image.png"
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *       400:
 *         description: Bad request, no file provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: No file uploaded
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
// Multer memory storage (no disk, file kept in buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Endpoint
router.post("/media", upload.single("file"), uploadComicFile);
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFaEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFFeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtFRztBQUVILHVEQUF1RDtBQUN2RCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDdkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUVuQyxXQUFXO0FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUU5RCxlQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCBtdWx0ZXIgZnJvbSBcIm11bHRlclwiO1xyXG5pbXBvcnQgeyB1cGxvYWRDb21pY0ZpbGUgfSBmcm9tIFwiLi4vY29udHJvbGxlci9maWxlLmNvbnRyb2xsZXJcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xyXG5cclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIC9maWxlLXVwbG9hZC9tZWRpYTpcclxuICogICBwb3N0OlxyXG4gKiAgICAgc3VtbWFyeTogVXBsb2FkIGEgbWVkaWEgZmlsZSB0byBBV1MgUzMgKHNlcnZlZCB2aWEgQ2xvdWRGcm9udClcclxuICogICAgIGRlc2NyaXB0aW9uOiA+XHJcbiAqICAgICAgIFJlY2VpdmVzIGEgbWVkaWEgZmlsZSwgdXBsb2FkcyBpdCB0byB0aGUgY29uZmlndXJlZCBTMyBidWNrZXQsIGFuZCByZXR1cm5zIGEgcHVibGljIENsb3VkRnJvbnQgVVJMLlxyXG4gKiAgICAgICBUaGUgcmV0dXJuZWQgVVJMIGlzIHNhZmUgdG8gc3RvcmUgaW4geW91ciBkYXRhYmFzZSBhbmQgY2FuIGJlIHVzZWQgdG8gZGlyZWN0bHkgc2VydmUgdGhlIG1lZGlhLlxyXG4gKiAgICAgdGFnczpcclxuICogICAgICAgLSBGaWxlIFVwbG9hZFxyXG4gKiAgICAgcmVxdWVzdEJvZHk6XHJcbiAqICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAqICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgbXVsdGlwYXJ0L2Zvcm0tZGF0YTpcclxuICogICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgICAgICAgIHJlcXVpcmVkOlxyXG4gKiAgICAgICAgICAgICAgIC0gZmlsZVxyXG4gKiAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICAgICAgIGZpbGU6XHJcbiAqICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgICAgIGZvcm1hdDogYmluYXJ5XHJcbiAqICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogVGhlIGZpbGUgdG8gYmUgdXBsb2FkZWRcclxuICogICAgIHJlc3BvbnNlczpcclxuICogICAgICAgMjAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseVxyXG4gKiAgICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgICAgICAgIHN1Y2Nlc3M6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IGJvb2xlYW5cclxuICogICAgICAgICAgICAgICAgICAgZXhhbXBsZTogdHJ1ZVxyXG4gKiAgICAgICAgICAgICAgICAgdXJsOlxyXG4gKiAgICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgICAgICAgZXhhbXBsZTogXCJodHRwczovL2Nkbi5pbnRlcnNwYWNlLmFmcmljYS9tZWRpYS8xMjM0YWJjZC1pbWFnZS5wbmdcIlxyXG4gKiAgICAgICAgICAgICAgICAgbWVzc2FnZTpcclxuICogICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICAgIGV4YW1wbGU6IEZpbGUgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5XHJcbiAqICAgICAgIDQwMDpcclxuICogICAgICAgICBkZXNjcmlwdGlvbjogQmFkIHJlcXVlc3QsIG5vIGZpbGUgcHJvdmlkZWRcclxuICogICAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgICAgYXBwbGljYXRpb24vanNvbjpcclxuICogICAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgICAgICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgICAgICAgICBzdWNjZXNzOlxyXG4gKiAgICAgICAgICAgICAgICAgICB0eXBlOiBib29sZWFuXHJcbiAqICAgICAgICAgICAgICAgICAgIGV4YW1wbGU6IGZhbHNlXHJcbiAqICAgICAgICAgICAgICAgICBlcnJvcjpcclxuICogICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICAgIGV4YW1wbGU6IE5vIGZpbGUgdXBsb2FkZWRcclxuICogICAgICAgNTAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcclxuICogICAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgICAgYXBwbGljYXRpb24vanNvbjpcclxuICogICAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgICAgICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgICAgICAgICBzdWNjZXNzOlxyXG4gKiAgICAgICAgICAgICAgICAgICB0eXBlOiBib29sZWFuXHJcbiAqICAgICAgICAgICAgICAgICAgIGV4YW1wbGU6IGZhbHNlXHJcbiAqICAgICAgICAgICAgICAgICBlcnJvcjpcclxuICogICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICAgIGV4YW1wbGU6IEludGVybmFsIHNlcnZlciBlcnJvclxyXG4gKi9cclxuXHJcbi8vIE11bHRlciBtZW1vcnkgc3RvcmFnZSAobm8gZGlzaywgZmlsZSBrZXB0IGluIGJ1ZmZlcilcclxuY29uc3Qgc3RvcmFnZSA9IG11bHRlci5tZW1vcnlTdG9yYWdlKCk7XHJcbmNvbnN0IHVwbG9hZCA9IG11bHRlcih7IHN0b3JhZ2UgfSk7XHJcblxyXG4vLyBFbmRwb2ludFxyXG5yb3V0ZXIucG9zdChcIi9tZWRpYVwiLCB1cGxvYWQuc2luZ2xlKFwiZmlsZVwiKSwgdXBsb2FkQ29taWNGaWxlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIl19