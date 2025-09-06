import { Router } from "express";
import { createComic, fetchAllComicByJwt, fetchAllComics, fetchComicBySlug, } from "../controller/comic.controller";
const router = Router();
router.post("/create", createComic);
router.get("/mine", fetchAllComicByJwt);
router.get("/all-comics", fetchAllComics);
router.get("/:slug", fetchComicBySlug);
/**
 * @swagger
 * tags:
 *   name: Comics
 *   description: Comic creation and retrieval endpoints
 */
/**
 * @swagger
 * /comics/create:
 *   post:
 *     summary: Create a new comic
 *     tags: [Comics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - language
 *               - ageRating
 *               - description
 *               - image
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My Epic Adventure"
 *               language:
 *                 type: string
 *                 example: "English"
 *               ageRating:
 *                 type: string
 *                 example: "13+"
 *               description:
 *                 type: string
 *                 example: "A thrilling adventure story."
 *               image:
 *                 type: string
 *                 example: "https://cdn.example.com/comic-cover.jpg"
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["adventure", "fantasy"]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["magic", "hero", "journey"]
 *     responses:
 *       200:
 *         description: Comic successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comic:
 *                   $ref: '#/components/schemas/Comic'
 *                 slug:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Failed to create comic
 */
/**
 * @swagger
 * /comics/mine:
 *   get:
 *     summary: Fetch all comics created by the logged-in creator
 *     tags: [Comics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of creator's comics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comics:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comic'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Creator not found
 */
/**
 * @swagger
 * /comics/{slug}:
 *   get:
 *     summary: Fetch a comic by its slug
 *     tags: [Comics]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The slug of the comic
 *     responses:
 *       200:
 *         description: Comic found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comic:
 *                   $ref: '#/components/schemas/Comic'
 *       404:
 *         description: Comic not found
 *       400:
 *         description: Failed to fetch comic
 */
/**
 * @swagger
 * /comics/all-comics:
 *   get:
 *     summary: Fetch all comics (reader view)
 *     tags: [Comics]
 *     responses:
 *       200:
 *         description: List of all comics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comics:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comic'
 *       400:
 *         description: Failed to fetch comics
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Comic:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         language:
 *           type: string
 *         ageRating:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         slug:
 *           type: string
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         creatorId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29taWMucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29taWMucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxFQUNMLFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLGdCQUFnQixHQUNqQixNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUV2Qzs7Ozs7R0FLRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErREc7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFFSCxlQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlQ29taWMsXHJcbiAgZmV0Y2hBbGxDb21pY0J5Snd0LFxyXG4gIGZldGNoQWxsQ29taWNzLFxyXG4gIGZldGNoQ29taWNCeVNsdWcsXHJcbn0gZnJvbSBcIi4uL2NvbnRyb2xsZXIvY29taWMuY29udHJvbGxlclwiO1xyXG5cclxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIucG9zdChcIi9jcmVhdGVcIiwgY3JlYXRlQ29taWMpO1xyXG5yb3V0ZXIuZ2V0KFwiL21pbmVcIiwgZmV0Y2hBbGxDb21pY0J5Snd0KTtcclxucm91dGVyLmdldChcIi9hbGwtY29taWNzXCIsIGZldGNoQWxsQ29taWNzKTtcclxucm91dGVyLmdldChcIi86c2x1Z1wiLCBmZXRjaENvbWljQnlTbHVnKTtcclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiB0YWdzOlxyXG4gKiAgIG5hbWU6IENvbWljc1xyXG4gKiAgIGRlc2NyaXB0aW9uOiBDb21pYyBjcmVhdGlvbiBhbmQgcmV0cmlldmFsIGVuZHBvaW50c1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiAvY29taWNzL2NyZWF0ZTpcclxuICogICBwb3N0OlxyXG4gKiAgICAgc3VtbWFyeTogQ3JlYXRlIGEgbmV3IGNvbWljXHJcbiAqICAgICB0YWdzOiBbQ29taWNzXVxyXG4gKiAgICAgc2VjdXJpdHk6XHJcbiAqICAgICAgIC0gYmVhcmVyQXV0aDogW11cclxuICogICAgIHJlcXVlc3RCb2R5OlxyXG4gKiAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gKiAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgICAgICAgICByZXF1aXJlZDpcclxuICogICAgICAgICAgICAgICAtIHRpdGxlXHJcbiAqICAgICAgICAgICAgICAgLSBsYW5ndWFnZVxyXG4gKiAgICAgICAgICAgICAgIC0gYWdlUmF0aW5nXHJcbiAqICAgICAgICAgICAgICAgLSBkZXNjcmlwdGlvblxyXG4gKiAgICAgICAgICAgICAgIC0gaW1hZ2VcclxuICogICAgICAgICAgICAgICAtIGdlbnJlXHJcbiAqICAgICAgICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgICAgICAgdGl0bGU6XHJcbiAqICAgICAgICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICAgICAgICAgIGV4YW1wbGU6IFwiTXkgRXBpYyBBZHZlbnR1cmVcIlxyXG4gKiAgICAgICAgICAgICAgIGxhbmd1YWdlOlxyXG4gKiAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICBleGFtcGxlOiBcIkVuZ2xpc2hcIlxyXG4gKiAgICAgICAgICAgICAgIGFnZVJhdGluZzpcclxuICogICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgZXhhbXBsZTogXCIxMytcIlxyXG4gKiAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gKiAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICBleGFtcGxlOiBcIkEgdGhyaWxsaW5nIGFkdmVudHVyZSBzdG9yeS5cIlxyXG4gKiAgICAgICAgICAgICAgIGltYWdlOlxyXG4gKiAgICAgICAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICAgICAgICBleGFtcGxlOiBcImh0dHBzOi8vY2RuLmV4YW1wbGUuY29tL2NvbWljLWNvdmVyLmpwZ1wiXHJcbiAqICAgICAgICAgICAgICAgZ2VucmU6XHJcbiAqICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gKiAgICAgICAgICAgICAgICAgaXRlbXM6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgZXhhbXBsZTogW1wiYWR2ZW50dXJlXCIsIFwiZmFudGFzeVwiXVxyXG4gKiAgICAgICAgICAgICAgIHRhZ3M6XHJcbiAqICAgICAgICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gKiAgICAgICAgICAgICAgICAgaXRlbXM6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgICAgZXhhbXBsZTogW1wibWFnaWNcIiwgXCJoZXJvXCIsIFwiam91cm5leVwiXVxyXG4gKiAgICAgcmVzcG9uc2VzOlxyXG4gKiAgICAgICAyMDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IENvbWljIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICAgICAgICAgY29taWM6XHJcbiAqICAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2NvbXBvbmVudHMvc2NoZW1hcy9Db21pYydcclxuICogICAgICAgICAgICAgICAgIHNsdWc6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICA0MDE6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IFVuYXV0aG9yaXplZFxyXG4gKiAgICAgICA0MDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IEZhaWxlZCB0byBjcmVhdGUgY29taWNcclxuICovXHJcblxyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogL2NvbWljcy9taW5lOlxyXG4gKiAgIGdldDpcclxuICogICAgIHN1bW1hcnk6IEZldGNoIGFsbCBjb21pY3MgY3JlYXRlZCBieSB0aGUgbG9nZ2VkLWluIGNyZWF0b3JcclxuICogICAgIHRhZ3M6IFtDb21pY3NdXHJcbiAqICAgICBzZWN1cml0eTpcclxuICogICAgICAgLSBiZWFyZXJBdXRoOiBbXVxyXG4gKiAgICAgcmVzcG9uc2VzOlxyXG4gKiAgICAgICAyMDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IExpc3Qgb2YgY3JlYXRvcidzIGNvbWljc1xyXG4gKiAgICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgICAgICAgIGNvbWljczpcclxuICogICAgICAgICAgICAgICAgICAgdHlwZTogYXJyYXlcclxuICogICAgICAgICAgICAgICAgICAgaXRlbXM6XHJcbiAqICAgICAgICAgICAgICAgICAgICAgJHJlZjogJyMvY29tcG9uZW50cy9zY2hlbWFzL0NvbWljJ1xyXG4gKiAgICAgICA0MDE6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IFVuYXV0aG9yaXplZFxyXG4gKiAgICAgICA0MDQ6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IENyZWF0b3Igbm90IGZvdW5kXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIC9jb21pY3Mve3NsdWd9OlxyXG4gKiAgIGdldDpcclxuICogICAgIHN1bW1hcnk6IEZldGNoIGEgY29taWMgYnkgaXRzIHNsdWdcclxuICogICAgIHRhZ3M6IFtDb21pY3NdXHJcbiAqICAgICBwYXJhbWV0ZXJzOlxyXG4gKiAgICAgICAtIGluOiBwYXRoXHJcbiAqICAgICAgICAgbmFtZTogc2x1Z1xyXG4gKiAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IFRoZSBzbHVnIG9mIHRoZSBjb21pY1xyXG4gKiAgICAgcmVzcG9uc2VzOlxyXG4gKiAgICAgICAyMDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IENvbWljIGZvdW5kXHJcbiAqICAgICAgICAgY29udGVudDpcclxuICogICAgICAgICAgIGFwcGxpY2F0aW9uL2pzb246XHJcbiAqICAgICAgICAgICAgIHNjaGVtYTpcclxuICogICAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICAgICAgICAgY29taWM6XHJcbiAqICAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2NvbXBvbmVudHMvc2NoZW1hcy9Db21pYydcclxuICogICAgICAgNDA0OlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBDb21pYyBub3QgZm91bmRcclxuICogICAgICAgNDAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBGYWlsZWQgdG8gZmV0Y2ggY29taWNcclxuICovXHJcblxyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogL2NvbWljcy9hbGwtY29taWNzOlxyXG4gKiAgIGdldDpcclxuICogICAgIHN1bW1hcnk6IEZldGNoIGFsbCBjb21pY3MgKHJlYWRlciB2aWV3KVxyXG4gKiAgICAgdGFnczogW0NvbWljc11cclxuICogICAgIHJlc3BvbnNlczpcclxuICogICAgICAgMjAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBMaXN0IG9mIGFsbCBjb21pY3NcclxuICogICAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgICAgYXBwbGljYXRpb24vanNvbjpcclxuICogICAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgICAgICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgICAgICAgICBjb21pY3M6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IGFycmF5XHJcbiAqICAgICAgICAgICAgICAgICAgIGl0ZW1zOlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICRyZWY6ICcjL2NvbXBvbmVudHMvc2NoZW1hcy9Db21pYydcclxuICogICAgICAgNDAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBGYWlsZWQgdG8gZmV0Y2ggY29taWNzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBzd2FnZ2VyXHJcbiAqIGNvbXBvbmVudHM6XHJcbiAqICAgc2NoZW1hczpcclxuICogICAgIENvbWljOlxyXG4gKiAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICBpZDpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZm9ybWF0OiB1dWlkXHJcbiAqICAgICAgICAgdGl0bGU6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICBsYW5ndWFnZTpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgIGFnZVJhdGluZzpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgaW1hZ2U6XHJcbiAqICAgICAgICAgICB0eXBlOiBzdHJpbmdcclxuICogICAgICAgICBzbHVnOlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgZ2VucmU6XHJcbiAqICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gKiAgICAgICAgICAgaXRlbXM6XHJcbiAqICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgIHRhZ3M6XHJcbiAqICAgICAgICAgICB0eXBlOiBhcnJheVxyXG4gKiAgICAgICAgICAgaXRlbXM6XHJcbiAqICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgIGNyZWF0b3JJZDpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZm9ybWF0OiB1dWlkXHJcbiAqICAgICAgICAgY3JlYXRlZEF0OlxyXG4gKiAgICAgICAgICAgdHlwZTogc3RyaW5nXHJcbiAqICAgICAgICAgICBmb3JtYXQ6IGRhdGUtdGltZVxyXG4gKiAgICAgICAgIHVwZGF0ZWRBdDpcclxuICogICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgZm9ybWF0OiBkYXRlLXRpbWVcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiJdfQ==