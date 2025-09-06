export declare const AWS_CONFIG: {
    region: string;
    credentials: {
        accessKeyId: string;
        secretAccessKey: string;
    };
};
export declare const S3_CONFIG: {
    bucketName: string;
    region: string;
};
export declare const CLOUDFRONT_CONFIG: {
    domain: string;
    distributionId: string | undefined;
    url: string;
};
export declare const FILE_CONFIG: {
    maxFileSize: number;
    maxFilesPerUpload: number;
    allowedFileTypes: string[];
};
export declare const validateAWSConfig: () => void;
