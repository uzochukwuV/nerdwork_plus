declare class AWSS3Service {
    private s3;
    private bucketName;
    private cloudFrontDomain?;
    constructor();
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
}
declare const _default: AWSS3Service;
export default _default;
