import { Router } from "express";
import { authenticate } from "../middleware/common/auth";
import { creditWalletController, debitWalletController, getWalletBalance, } from "../controller/wallet.controller";
const router = Router();
/**
 * @swagger
 * /wallet/credit:
 *   post:
 *     summary: Credit user wallet
 *     description: Credits the authenticated user's wallet with the specified amount.
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Wallet credited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 newBalance:
 *                   type: number
 *                   example: 500
 *       400:
 *         description: Invalid request (e.g., negative or missing amount)
 *       500:
 *         description: Internal server error
 */
router.post("/wallet/credit", authenticate, creditWalletController);
/**
 * @swagger
 * /wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     description: Retrieve the current balance of the authenticated user's wallet.
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved wallet balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   example: 1500
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.get("/wallet/balance", authenticate, getWalletBalance);
/**
 * @swagger
 * /wallet/debit:
 *   post:
 *     summary: Debit user wallet
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Wallet debited successfully
 */
router.post("/wallet/debit", authenticate, debitWalletController);
export default router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LnJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhbGxldC5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUNMLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsZ0JBQWdCLEdBQ2pCLE1BQU0saUNBQWlDLENBQUM7QUFFekMsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NHO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUVwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFFbEUsZUFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBhdXRoZW50aWNhdGUgfSBmcm9tIFwiLi4vbWlkZGxld2FyZS9jb21tb24vYXV0aFwiO1xyXG5pbXBvcnQge1xyXG4gIGNyZWRpdFdhbGxldENvbnRyb2xsZXIsXHJcbiAgZGViaXRXYWxsZXRDb250cm9sbGVyLFxyXG4gIGdldFdhbGxldEJhbGFuY2UsXHJcbn0gZnJvbSBcIi4uL2NvbnRyb2xsZXIvd2FsbGV0LmNvbnRyb2xsZXJcIjtcclxuXHJcbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogL3dhbGxldC9jcmVkaXQ6XHJcbiAqICAgcG9zdDpcclxuICogICAgIHN1bW1hcnk6IENyZWRpdCB1c2VyIHdhbGxldFxyXG4gKiAgICAgZGVzY3JpcHRpb246IENyZWRpdHMgdGhlIGF1dGhlbnRpY2F0ZWQgdXNlcidzIHdhbGxldCB3aXRoIHRoZSBzcGVjaWZpZWQgYW1vdW50LlxyXG4gKiAgICAgdGFnczpcclxuICogICAgICAgLSBXYWxsZXRcclxuICogICAgIHNlY3VyaXR5OlxyXG4gKiAgICAgICAtIGJlYXJlckF1dGg6IFtdXHJcbiAqICAgICByZXF1ZXN0Qm9keTpcclxuICogICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICogICAgICAgY29udGVudDpcclxuICogICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgICAgICBhbW91bnQ6XHJcbiAqICAgICAgICAgICAgICAgICB0eXBlOiBudW1iZXJcclxuICogICAgICAgICAgICAgICAgIGV4YW1wbGU6IDEwMFxyXG4gKiAgICAgcmVzcG9uc2VzOlxyXG4gKiAgICAgICAyMDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IFdhbGxldCBjcmVkaXRlZCBzdWNjZXNzZnVsbHlcclxuICogICAgICAgICBjb250ZW50OlxyXG4gKiAgICAgICAgICAgYXBwbGljYXRpb24vanNvbjpcclxuICogICAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICAgIHR5cGU6IG9iamVjdFxyXG4gKiAgICAgICAgICAgICAgIHByb3BlcnRpZXM6XHJcbiAqICAgICAgICAgICAgICAgICBzdWNjZXNzOlxyXG4gKiAgICAgICAgICAgICAgICAgICB0eXBlOiBib29sZWFuXHJcbiAqICAgICAgICAgICAgICAgICAgIGV4YW1wbGU6IHRydWVcclxuICogICAgICAgICAgICAgICAgIG5ld0JhbGFuY2U6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IG51bWJlclxyXG4gKiAgICAgICAgICAgICAgICAgICBleGFtcGxlOiA1MDBcclxuICogICAgICAgNDAwOlxyXG4gKiAgICAgICAgIGRlc2NyaXB0aW9uOiBJbnZhbGlkIHJlcXVlc3QgKGUuZy4sIG5lZ2F0aXZlIG9yIG1pc3NpbmcgYW1vdW50KVxyXG4gKiAgICAgICA1MDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IEludGVybmFsIHNlcnZlciBlcnJvclxyXG4gKi9cclxuXHJcbnJvdXRlci5wb3N0KFwiL3dhbGxldC9jcmVkaXRcIiwgYXV0aGVudGljYXRlLCBjcmVkaXRXYWxsZXRDb250cm9sbGVyKTtcclxuXHJcbi8qKlxyXG4gKiBAc3dhZ2dlclxyXG4gKiAvd2FsbGV0L2JhbGFuY2U6XHJcbiAqICAgZ2V0OlxyXG4gKiAgICAgc3VtbWFyeTogR2V0IHdhbGxldCBiYWxhbmNlXHJcbiAqICAgICBkZXNjcmlwdGlvbjogUmV0cmlldmUgdGhlIGN1cnJlbnQgYmFsYW5jZSBvZiB0aGUgYXV0aGVudGljYXRlZCB1c2VyJ3Mgd2FsbGV0LlxyXG4gKiAgICAgdGFnczpcclxuICogICAgICAgLSBXYWxsZXRcclxuICogICAgIHNlY3VyaXR5OlxyXG4gKiAgICAgICAtIGJlYXJlckF1dGg6IFtdXHJcbiAqICAgICByZXNwb25zZXM6XHJcbiAqICAgICAgIDIwMDpcclxuICogICAgICAgICBkZXNjcmlwdGlvbjogU3VjY2Vzc2Z1bGx5IHJldHJpZXZlZCB3YWxsZXQgYmFsYW5jZVxyXG4gKiAgICAgICAgIGNvbnRlbnQ6XHJcbiAqICAgICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgICBzY2hlbWE6XHJcbiAqICAgICAgICAgICAgICAgdHlwZTogb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgcHJvcGVydGllczpcclxuICogICAgICAgICAgICAgICAgIGJhbGFuY2U6XHJcbiAqICAgICAgICAgICAgICAgICAgIHR5cGU6IG51bWJlclxyXG4gKiAgICAgICAgICAgICAgICAgICBleGFtcGxlOiAxNTAwXHJcbiAqICAgICAgIDQwMTpcclxuICogICAgICAgICBkZXNjcmlwdGlvbjogVW5hdXRob3JpemVkIC0gTWlzc2luZyBvciBpbnZhbGlkIHRva2VuXHJcbiAqICAgICAgIDUwMDpcclxuICogICAgICAgICBkZXNjcmlwdGlvbjogSW50ZXJuYWwgc2VydmVyIGVycm9yXHJcbiAqL1xyXG5yb3V0ZXIuZ2V0KFwiL3dhbGxldC9iYWxhbmNlXCIsIGF1dGhlbnRpY2F0ZSwgZ2V0V2FsbGV0QmFsYW5jZSk7XHJcblxyXG4vKipcclxuICogQHN3YWdnZXJcclxuICogL3dhbGxldC9kZWJpdDpcclxuICogICBwb3N0OlxyXG4gKiAgICAgc3VtbWFyeTogRGViaXQgdXNlciB3YWxsZXRcclxuICogICAgIHRhZ3M6IFtXYWxsZXRdXHJcbiAqICAgICByZXF1ZXN0Qm9keTpcclxuICogICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICogICAgICAgY29udGVudDpcclxuICogICAgICAgICBhcHBsaWNhdGlvbi9qc29uOlxyXG4gKiAgICAgICAgICAgc2NoZW1hOlxyXG4gKiAgICAgICAgICAgICB0eXBlOiBvYmplY3RcclxuICogICAgICAgICAgICAgcmVxdWlyZWQ6XHJcbiAqICAgICAgICAgICAgICAgLSB1c2VySWRcclxuICogICAgICAgICAgICAgICAtIGFtb3VudFxyXG4gKiAgICAgICAgICAgICBwcm9wZXJ0aWVzOlxyXG4gKiAgICAgICAgICAgICAgIHVzZXJJZDpcclxuICogICAgICAgICAgICAgICAgIHR5cGU6IHN0cmluZ1xyXG4gKiAgICAgICAgICAgICAgIGFtb3VudDpcclxuICogICAgICAgICAgICAgICAgIHR5cGU6IG51bWJlclxyXG4gKiAgICAgcmVzcG9uc2VzOlxyXG4gKiAgICAgICAyMDA6XHJcbiAqICAgICAgICAgZGVzY3JpcHRpb246IFdhbGxldCBkZWJpdGVkIHN1Y2Nlc3NmdWxseVxyXG4gKi9cclxucm91dGVyLnBvc3QoXCIvd2FsbGV0L2RlYml0XCIsIGF1dGhlbnRpY2F0ZSwgZGViaXRXYWxsZXRDb250cm9sbGVyKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIl19