export declare const googleAuthController: (req: any, res: any) => Promise<any>;
export declare function verifyGoogleToken(idToken: string): Promise<{
    email: string;
    fullName: string;
    picture: string;
    googleId: string;
}>;
