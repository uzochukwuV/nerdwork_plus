import { Response } from "express";
import { AuthRequest } from "../middleware/common/auth";
export declare const purchaseTicket: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
