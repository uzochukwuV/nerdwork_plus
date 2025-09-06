import express from "express";
import { addCreatorProfile, addReaderProfile, getCreatorProfile, getReaderProfile, } from "../controller/profile.controller";
const router = express.Router();
/**
 * @route   POST /profile/creator
 * @desc    Create a Creator Profile
 * @access  Private (after signup)
 */
router.post("/creator", addCreatorProfile);
/**
 * @route   POST /profile/reader
 * @desc    Create a Reader Profile
 * @access  Private (after signup)
 */
router.post("/reader", addReaderProfile);
/**
 * @route   GET /profile/creator
 * @desc    Get Creator Profile
 * @access  Private (Jwt required)
 */
router.get("/creator", getCreatorProfile);
/**
 * @route   GET /profile/reader
 * @desc    Get Reader Profile
 * @access  Private (Jwt required)
 */
router.get("/reader", getReaderProfile);
/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Endpoints for managing user profiles (creator & reader)
 */
/**
 * @swagger
 * /profile/creator:
 *   post:
 *     summary: Create a creator profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - fullName
 *               - creatorName
 *               - genres
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: "2d3f8f2e-45b2-4a90-bc58-bdff26e7e98a"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               creatorName:
 *                 type: string
 *                 example: "JDComics"
 *               phoneNumber:
 *                 type: string
 *                 example: "+2348012345678"
 *               bio:
 *                 type: string
 *                 example: "Comic creator focusing on sci-fi and fantasy"
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["fantasy", "sci-fi"]
 *     responses:
 *       200:
 *         description: Creator profile successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   $ref: '#/components/schemas/CreatorProfile'
 *       400:
 *         description: Failed to create creator profile
 */
/**
 * @swagger
 * /profile/reader:
 *   post:
 *     summary: Create a reader profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - genres
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: "5c2f7df9-1d21-49f3-90d6-65b3e94bbfc2"
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["romance", "adventure", "sci-fi"]
 *     responses:
 *       200:
 *         description: Reader profile successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   $ref: '#/components/schemas/ReaderProfile'
 *       400:
 *         description: Failed to create reader profile
 */
/**
 * @swagger
 * /profile/creator:
 *   get:
 *     summary: Get The authenticated creator's profile
 *     description: Retrieves the profile of the logged-in user (creator) based on the JWT provided in the Authorization header.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *                   example: creator
 *                 profile:
 *                   type: object
 *                   example:
 *                     id: "uuid"
 *                     userId: "uuid"
 *                     fullName: "John Doe"
 *                     creatorName: "JD Comics"
 *                     phoneNumber: "+2348000000000"
 *                     bio: "Comic creator"
 *                     genres: "fantasy, sci-fi"
 *                     walletType: "phantom"
 *                     walletAddress: "0x1234abcd"
 *                     createdAt: "2025-08-29T12:00:00Z"
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Profile not found
 */
/**
 * @swagger
 * /profile/reader:
 *   get:
 *     summary: Get The authenticated reader's profile
 *     description: Retrieves the profile of the logged-in user (reader) based on the JWT provided in the Authorization header.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *                   example: creator
 *                 profile:
 *                   type: object
 *                   example:
 *                     id: "uuid"
 *                     userId: "uuid"
 *                     genres: "fantasy, sci-fi"
 *                     walletId: "0x1234abcd"
 *                     createdAt: "2025-08-29T12:00:00Z"
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Profile not found
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreatorProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         fullName:
 *           type: string
 *         creatorName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         bio:
 *           type: string
 *         genres:
 *           type: string
 *         walletType:
 *           type: string
 *           nullable: true
 *           example: "solana"
 *         walletAddress:
 *           type: string
 *           nullable: true
 *         pinHash:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ReaderProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         genres:
 *           type: string
 *         walletId:
 *           type: string
 *         pinHash:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGdCQUFnQixHQUNqQixNQUFNLGtDQUFrQyxDQUFDO0FBRTFDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUUzQzs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUV6Qzs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUUxQzs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUV4Qzs7Ozs7R0FLRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtREc7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZERztBQUVILGVBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHtcclxuICBhZGRDcmVhdG9yUHJvZmlsZSxcclxuICBhZGRSZWFkZXJQcm9maWxlLFxyXG4gIGdldENyZWF0b3JQcm9maWxlLFxyXG4gIGdldFJlYWRlclByb2ZpbGUsXHJcbn0gZnJvbSBcIi4uL2NvbnRyb2xsZXIvcHJvZmlsZS5jb250cm9sbGVyXCI7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuLyoqXHJcbiAqIEByb3V0ZSAgIFBPU1QgL3Byb2ZpbGUvY3JlYXRvclxyXG4gKiBAZGVzYyAgICBDcmVhdGUgYSBDcmVhdG9yIFByb2ZpbGVcclxuICogQGFjY2VzcyAgUHJpdmF0ZSAoYWZ0ZXIgc2lnbnVwKVxyXG4gKi9cclxucm91dGVyLnBvc3QoXCIvY3JlYXRvclwiLCBhZGRDcmVhdG9yUHJvZmlsZSk7XHJcblxyXG4vKipcclxuICogQHJvdXRlICAgUE9TVCAvcHJvZmlsZS9yZWFkZXJcclxuICogQGRlc2MgICAgQ3JlYXRlIGEgUmVhZGVyIFByb2ZpbGVcclxuICogQGFjY2VzcyAgUHJpdmF0ZSAoYWZ0ZXIgc2lnbnVwKVxyXG4gKi9cclxuXHJcbnJvdXRlci5wb3N0KFwiL3JlYWRlclwiLCBhZGRSZWFkZXJQcm9maWxlKTtcclxuXHJcbi8qKlxyXG4gKiBAcm91dGUgICBHRVQgL3Byb2ZpbGUvY3JlYXRvclxyXG4gKiBAZGVzYyAgICBHZXQgQ3JlYXRvciBQcm9maWxlXHJcbiAqIEBhY2Nlc3MgIFByaXZhdGUgKEp3dCByZXF1aXJlZClcclxuICovXHJcblxyXG5yb3V0ZXIuZ2V0KFwiL2NyZWF0b3JcIiwgZ2V0Q3JlYXRvclByb2ZpbGUpO1xyXG5cclxuLyoqXHJcbiAqIEByb3V0ZSAgIEdFVCAvcHJvZmlsZS9yZWFkZXJcclxuICogQGRlc2MgICAgR2V0IFJlYWRlciBQcm9maWxlXHJcbiAqIEBhY2Nlc3MgIFByaXZhdGUgKEp3dCByZXF1aXJlZClcclxuICovXHJcblxyXG5yb3V0ZXIuZ2V0KFwiL3JlYWRlclwiLCBnZXRSZWFkZXJQcm9maWxlKTtcclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiB0YWdzOlxyXG4gKiAgIG5hbWU6IFByb2ZpbGVzXHJcbiAqICAgZGVzY3JpcHRpb246IEVuZHBvaW50cyBmb3IgbWFuYWdpbmcgdXNlciBwcm9maWxlcyAoY3JlYXRvciAmIHJlYWRlcilcclxuICovXHJcblxyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogL3Byb2ZpbGUvY3JlYXRvcjpcclxuICogICBwb3N0OlxyXG4gKiAgICAgc3VtbWFyeTogQ3JlYXRlIGEgY3JlYXRvciBwcm9maWxlXHJcbiAqICAgICB0YWdzOiBbUHJvZmlsZXNdXHJcbiAqICAgICByZXF1ZXN0Qm9keTpcclxuICogICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICogICAgICAgY29udGVudDpcclxuICogICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgICAgICAgLSB1c2VySWRcclxuICogICAgICAgICAgICAgICAtIGZ1bGxOYW1lXHJcbiAqICAgICAgICAgICAgICAgLSBjcmVhdG9yTmFtZVxyXG4gKiAgICAgICAgICAgICAgIC0gZ2VucmVzXHJcbiAqICAgICAgICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgICAgICAgdXNlcklkOlxyXG4gKiAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICBmb3JtYXQ6IHV1aWRcclxuICogICAgICAgICAgICAgICAgIGV4YW1wbGU6IFwiMmQzZjhmMmUtNDViMi00YTkwLWJjNTgtYmRmZjI2ZTdlOThhXCJcclxuICogICAgICAgICAgICAgICBmdWxsTmFtZTpcclxuICogICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgZXhhbXBsZTogXCJKb2huIERvZVwiXHJcbiAqICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6XHJcbiAqICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgICAgIGV4YW1wbGU6IFwiSkRDb21pY3NcIlxyXG4gKiAgICAgICAgICAgICAgIHBob25lTnVtYmVyOlxyXG4gKiAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICBleGFtcGxlOiBcIisyMzQ4MDEyMzQ1Njc4XCJcclxuICogICAgICAgICAgICAgICBiaW86XHJcbiAqICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgICAgIGV4YW1wbGU6IFwiQ29taWMgY3JlYXRvciBmb2N1c2luZyBvbiBzY2ktZmkgYW5kIGZhbnRhc3lcIlxyXG4gKiAgICAgICAgICAgICAgIGdlbnJlczpcclxuICogICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAqICAgICAgICAgICAgICAgICBpdGVtczpcclxuICogICAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICBleGFtcGxlOiBbXCJmYW50YXN5XCIsIFwic2NpLWZpXCJdXHJcbiAqICAgICByZXNwb25zZXM6XHJcbiAqICAgICAgIDIwMDpcclxuICogICAgICAgICBkZXNjcmlwdGlvbjogQ3JlYXRvciBwcm9maWxlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICAgICAgICAgcHJvZmlsZTpcclxuICogICAgICAgICAgICAgICAgICAgJHJlZjogJyMvY29tcG9uZW50cy9zY2hlbWFzL0NyZWF0b3JQcm9maWxlJ1xyXG4gKiAgICAgICA0MDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IEZhaWxlZCB0byBjcmVhdGUgY3JlYXRvciBwcm9maWxlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIC9wcm9maWxlL3JlYWRlcjpcclxuICogICBwb3N0OlxyXG4gKiAgICAgc3VtbWFyeTogQ3JlYXRlIGEgcmVhZGVyIHByb2ZpbGVcclxuICogICAgIHRhZ3M6IFtQcm9maWxlc11cclxuICogICAgIHJlcXVlc3RCb2R5OlxyXG4gKiAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gKiAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgICAgICAgICByZXF1aXJlZDpcclxuICogICAgICAgICAgICAgICAtIHVzZXJJZFxyXG4gKiAgICAgICAgICAgICAgIC0gZ2VucmVzXHJcbiAqICAgICAgICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgICAgICAgdXNlcklkOlxyXG4gKiAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICBmb3JtYXQ6IHV1aWRcclxuICogICAgICAgICAgICAgICAgIGV4YW1wbGU6IFwiNWMyZjdkZjktMWQyMS00OWYzLTkwZDYtNjViM2U5NGJiZmMyXCJcclxuICogICAgICAgICAgICAgICBnZW5yZXM6XHJcbiAqICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gKiAgICAgICAgICAgICAgICAgaXRlbXM6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgZXhhbXBsZTogW1wicm9tYW5jZVwiLCBcImFkdmVudHVyZVwiLCBcInNjaS1maVwiXVxyXG4gKiAgICAgcmVzcG9uc2VzOlxyXG4gKiAgICAgICAyMDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IFJlYWRlciBwcm9maWxlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICAgICAgICAgcHJvZmlsZTpcclxuICogICAgICAgICAgICAgICAgICAgJHJlZjogJyMvY29tcG9uZW50cy9zY2hlbWFzL1JlYWRlclByb2ZpbGUnXHJcbiAqICAgICAgIDQwMDpcclxuICogICAgICAgICBkZXNjcmlwdGlvbjogRmFpbGVkIHRvIGNyZWF0ZSByZWFkZXIgcHJvZmlsZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiAvcHJvZmlsZS9jcmVhdG9yOlxyXG4gKiAgIGdldDpcclxuICogICAgIHN1bW1hcnk6IEdldCBUaGUgYXV0aGVudGljYXRlZCBjcmVhdG9yJ3MgcHJvZmlsZVxyXG4gKiAgICAgZGVzY3JpcHRpb246IFJldHJpZXZlcyB0aGUgcHJvZmlsZSBvZiB0aGUgbG9nZ2VkLWluIHVzZXIgKGNyZWF0b3IpIGJhc2VkIG9uIHRoZSBKV1QgcHJvdmlkZWQgaW4gdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyLlxyXG4gKiAgICAgdGFnczpcclxuICogICAgICAgLSBQcm9maWxlXHJcbiAqICAgICBzZWN1cml0eTpcclxuICogICAgICAgLSBiZWFyZXJBdXRoOiBbXVxyXG4gKiAgICAgcmVzcG9uc2VzOlxyXG4gKiAgICAgICAyMDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IFN1Y2Nlc3NmdWxseSByZXRyaWV2ZWQgcHJvZmlsZVxyXG4gKiAgICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgICAgICAgIHJvbGU6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgICBleGFtcGxlOiBjcmVhdG9yXHJcbiAqICAgICAgICAgICAgICAgICBwcm9maWxlOlxyXG4gKiAgICAgICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgICAgICAgICAgICAgZXhhbXBsZTpcclxuICogICAgICAgICAgICAgICAgICAgICBpZDogXCJ1dWlkXCJcclxuICogICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IFwidXVpZFwiXHJcbiAqICAgICAgICAgICAgICAgICAgICAgZnVsbE5hbWU6IFwiSm9obiBEb2VcIlxyXG4gKiAgICAgICAgICAgICAgICAgICAgIGNyZWF0b3JOYW1lOiBcIkpEIENvbWljc1wiXHJcbiAqICAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IFwiKzIzNDgwMDAwMDAwMDBcIlxyXG4gKiAgICAgICAgICAgICAgICAgICAgIGJpbzogXCJDb21pYyBjcmVhdG9yXCJcclxuICogICAgICAgICAgICAgICAgICAgICBnZW5yZXM6IFwiZmFudGFzeSwgc2NpLWZpXCJcclxuICogICAgICAgICAgICAgICAgICAgICB3YWxsZXRUeXBlOiBcInBoYW50b21cIlxyXG4gKiAgICAgICAgICAgICAgICAgICAgIHdhbGxldEFkZHJlc3M6IFwiMHgxMjM0YWJjZFwiXHJcbiAqICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBcIjIwMjUtMDgtMjlUMTI6MDA6MDBaXCJcclxuICogICAgICAgNDAxOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBVbmF1dGhvcml6ZWQgKG1pc3Npbmcgb3IgaW52YWxpZCB0b2tlbilcclxuICogICAgICAgNDA0OlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBQcm9maWxlIG5vdCBmb3VuZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiAvcHJvZmlsZS9yZWFkZXI6XHJcbiAqICAgZ2V0OlxyXG4gKiAgICAgc3VtbWFyeTogR2V0IFRoZSBhdXRoZW50aWNhdGVkIHJlYWRlcidzIHByb2ZpbGVcclxuICogICAgIGRlc2NyaXB0aW9uOiBSZXRyaWV2ZXMgdGhlIHByb2ZpbGUgb2YgdGhlIGxvZ2dlZC1pbiB1c2VyIChyZWFkZXIpIGJhc2VkIG9uIHRoZSBKV1QgcHJvdmlkZWQgaW4gdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyLlxyXG4gKiAgICAgdGFnczpcclxuICogICAgICAgLSBQcm9maWxlXHJcbiAqICAgICBzZWN1cml0eTpcclxuICogICAgICAgLSBiZWFyZXJBdXRoOiBbXVxyXG4gKiAgICAgcmVzcG9uc2VzOlxyXG4gKiAgICAgICAyMDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IFN1Y2Nlc3NmdWxseSByZXRyaWV2ZWQgcHJvZmlsZVxyXG4gKiAgICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgICAgICAgIHJvbGU6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgICBleGFtcGxlOiBjcmVhdG9yXHJcbiAqICAgICAgICAgICAgICAgICBwcm9maWxlOlxyXG4gKiAgICAgICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgICAgICAgICAgICAgZXhhbXBsZTpcclxuICogICAgICAgICAgICAgICAgICAgICBpZDogXCJ1dWlkXCJcclxuICogICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IFwidXVpZFwiXHJcbiAqICAgICAgICAgICAgICAgICAgICAgZ2VucmVzOiBcImZhbnRhc3ksIHNjaS1maVwiXHJcbiAqICAgICAgICAgICAgICAgICAgICAgd2FsbGV0SWQ6IFwiMHgxMjM0YWJjZFwiXHJcbiAqICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBcIjIwMjUtMDgtMjlUMTI6MDA6MDBaXCJcclxuICogICAgICAgNDAxOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBVbmF1dGhvcml6ZWQgKG1pc3Npbmcgb3IgaW52YWxpZCB0b2tlbilcclxuICogICAgICAgNDA0OlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBQcm9maWxlIG5vdCBmb3VuZFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiBjb21wb25lbnRzOlxyXG4gKiAgIHNjaGVtYXM6XHJcbiAqICAgICBDcmVhdG9yUHJvZmlsZTpcclxuICogICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgaWQ6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgIGZvcm1hdDogdXVpZFxyXG4gKiAgICAgICAgIHVzZXJJZDpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZm9ybWF0OiB1dWlkXHJcbiAqICAgICAgICAgZnVsbE5hbWU6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICBjcmVhdG9yTmFtZTpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgIHBob25lTnVtYmVyOlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgYmlvOlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgZ2VucmVzOlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgd2FsbGV0VHlwZTpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgbnVsbGFibGU6IHRydWVcclxuICogICAgICAgICAgIGV4YW1wbGU6IFwic29sYW5hXCJcclxuICogICAgICAgICB3YWxsZXRBZGRyZXNzOlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICBudWxsYWJsZTogdHJ1ZVxyXG4gKiAgICAgICAgIHBpbkhhc2g6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgIG51bGxhYmxlOiB0cnVlXHJcbiAqICAgICAgICAgY3JlYXRlZEF0OlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICBmb3JtYXQ6IGRhdGUtdGltZVxyXG4gKiAgICAgICAgIHVwZGF0ZWRBdDpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZm9ybWF0OiBkYXRlLXRpbWVcclxuICpcclxuICogICAgIFJlYWRlclByb2ZpbGU6XHJcbiAqICAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgIGlkOlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICBmb3JtYXQ6IHV1aWRcclxuICogICAgICAgICB1c2VySWQ6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgIGZvcm1hdDogdXVpZFxyXG4gKiAgICAgICAgIGdlbnJlczpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgIHdhbGxldElkOlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgcGluSGFzaDpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgIGNyZWF0ZWRBdDpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZm9ybWF0OiBkYXRlLXRpbWVcclxuICogICAgICAgICB1cGRhdGVkQXQ6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgIGZvcm1hdDogZGF0ZS10aW1lXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xyXG4iXX0=