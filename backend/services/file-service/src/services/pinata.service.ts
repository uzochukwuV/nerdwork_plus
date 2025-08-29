import axios from 'axios';
import FormData from 'form-data';

interface PinataConfig {
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
}

interface PinataUploadResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

interface PinataFileResponse extends PinataUploadResponse {
  originalname: string;
  mimetype: string;
}

interface PinataJsonResponse extends PinataUploadResponse {
  metadata: any;
}

class PinataService {
  private config: PinataConfig;

  constructor(config: PinataConfig) {
    this.config = config;
  }

  async uploadFile(
    fileBuffer: Buffer, 
    filename: string, 
    options?: {
      metadata?: any;
      pinataOptions?: {
        cidVersion?: 0 | 1;
        wrapWithDirectory?: boolean;
      };
    }
  ): Promise<PinataFileResponse> {
    try {
      const formData = new FormData();
      formData.append('file', fileBuffer, {
        filename,
        contentType: this.getMimeType(filename),
      });

      if (options?.metadata) {
        formData.append('pinataMetadata', JSON.stringify({
          name: filename,
          ...options.metadata
        }));
      }

      if (options?.pinataOptions) {
        formData.append('pinataOptions', JSON.stringify(options.pinataOptions));
      }

      const response = await axios.post(
        `${this.config.baseUrl}/pinning/pinFileToIPFS`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            ...formData.getHeaders(),
          },
        }
      );

      return {
        ...response.data,
        originalname: filename,
        mimetype: this.getMimeType(filename),
      };
    } catch (error: any) {
      console.error('Pinata upload file error:', error.response?.data || error.message);
      throw new Error(`Failed to upload file to IPFS: ${error.response?.data?.message || error.message}`);
    }
  }

  async uploadJson(
    jsonObject: any, 
    options?: {
      metadata?: any;
      pinataOptions?: {
        cidVersion?: 0 | 1;
        wrapWithDirectory?: boolean;
      };
    }
  ): Promise<PinataJsonResponse> {
    try {
      const data = {
        pinataContent: jsonObject,
        pinataMetadata: options?.metadata || {},
        pinataOptions: options?.pinataOptions || {}
      };

      const response = await axios.post(
        `${this.config.baseUrl}/pinning/pinJSONToIPFS`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        ...response.data,
        metadata: jsonObject,
      };
    } catch (error: any) {
      console.error('Pinata upload JSON error:', error.response?.data || error.message);
      throw new Error(`Failed to upload JSON to IPFS: ${error.response?.data?.message || error.message}`);
    }
  }

  async unpinFile(ipfsHash: string): Promise<void> {
    try {
      await axios.delete(
        `${this.config.baseUrl}/pinning/unpin/${ipfsHash}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
        }
      );
    } catch (error: any) {
      console.error('Pinata unpin error:', error.response?.data || error.message);
      throw new Error(`Failed to unpin file from IPFS: ${error.response?.data?.message || error.message}`);
    }
  }

  async getPinnedFiles(
    options?: {
      status?: 'pinned' | 'unpinned';
      pageLimit?: number;
      pageOffset?: number;
      metadata?: any;
    }
  ): Promise<any> {
    try {
      const params = new URLSearchParams();
      
      if (options?.status) params.append('status', options.status);
      if (options?.pageLimit) params.append('pageLimit', options.pageLimit.toString());
      if (options?.pageOffset) params.append('pageOffset', options.pageOffset.toString());
      if (options?.metadata) {
        Object.entries(options.metadata).forEach(([key, value]) => {
          params.append(`metadata[${key}]`, value as string);
        });
      }

      const response = await axios.get(
        `${this.config.baseUrl}/data/pinList?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Pinata get pinned files error:', error.response?.data || error.message);
      throw new Error(`Failed to get pinned files: ${error.response?.data?.message || error.message}`);
    }
  }

  getGatewayUrl(ipfsHash: string, isDedicated: boolean = false): string {
    if (isDedicated && process.env.PINATA_DEDICATED_GATEWAY) {
      return `https://${process.env.PINATA_DEDICATED_GATEWAY}/ipfs/${ipfsHash}`;
    }
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  }

  private getMimeType(filename: string): string {
    const ext = filename.toLowerCase().split('.').pop();
    const mimeTypes: { [key: string]: string } = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'pdf': 'application/pdf',
      'json': 'application/json',
      'txt': 'text/plain',
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }
}

export default PinataService;
export type { 
  PinataConfig, 
  PinataUploadResponse, 
  PinataFileResponse, 
  PinataJsonResponse 
};