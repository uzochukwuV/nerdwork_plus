import multer from "multer";
export declare const upload: multer.Multer;
export declare const createApiCollection: (req: any, res: any) => Promise<any>;
export declare const mintApiNFT: (req: any, res: any) => Promise<any>;
export declare const getAssetData: (req: any, res: any) => Promise<void>;
export declare const getAssetByOwner: (req: any, res: any) => Promise<any>;
export declare const transferNft: (req: any, res: any) => Promise<any>;
export declare const getPlatformNFTs: (req: any, res: any) => Promise<void>;
