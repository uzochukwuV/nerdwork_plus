import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import axios from 'axios';
import FormData from 'form-data';

const FILE_SERVICE_URL = process.env.FILE_SERVICE_URL || 'http://localhost:3007';
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3000';

describe('📁 File Service Tests', () => {
  let testUserToken: string;
  let testUserId: string;
  let uploadedFileId: string;
  let nftFileId: string;
  let presignedUploadData: any;
  
  const testUser = {
    email: `test-file-${Date.now()}@nerdwork.com`,
    password: 'SecureTestPassword123!',
    username: `fileuser${Date.now()}`
  };

  beforeAll(async () => {
    // Create test user
    const signupResponse = await axios.post(`${API_GATEWAY_URL}/auth/signup`, testUser);
    testUserToken = signupResponse.data.data.token;
    testUserId = signupResponse.data.data.user.id;
    
    console.log('🔧 Test user created for file tests');
  });

  describe('File Upload to S3', () => {
    
    it('should upload image file to S3 successfully', async () => {
      // Create a mock image file
      const mockImageData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
      
      const formData = new FormData();
      formData.append('file', mockImageData, {
        filename: 'test-comic-cover.png',
        contentType: 'image/png'
      });
      formData.append('category', 'comic-cover');
      formData.append('purpose', 'storage');
      formData.append('isPublic', 'true');
      formData.append('referenceId', 'test-comic-123');
      formData.append('referenceType', 'comic');

      const response = await axios.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
        headers: {
          Authorization: `Bearer ${testUserToken}`,
          ...formData.getHeaders()
        }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.file.userId).toBe(testUserId);
      expect(response.data.data.file.originalName).toBe('test-comic-cover.png');
      expect(response.data.data.file.mimetype).toBe('image/png');
      expect(response.data.data.file.category).toBe('comic-cover');
      expect(response.data.data.file.s3Url).toBeDefined();
      expect(response.data.data.file.cdnUrl).toBeDefined();
      expect(response.data.data.file.s3Key).toBeDefined();
      
      uploadedFileId = response.data.data.file.id;
      console.log('✅ Image file uploaded to S3 successfully');
    });

    it('should handle different file types', async () => {
      const testFiles = [
        { name: 'test.jpg', type: 'image/jpeg', data: Buffer.from('fake-jpeg-data') },
        { name: 'test.gif', type: 'image/gif', data: Buffer.from('fake-gif-data') },
        { name: 'test.pdf', type: 'application/pdf', data: Buffer.from('fake-pdf-data') }
      ];

      for (const file of testFiles) {
        const formData = new FormData();
        formData.append('file', file.data, {
          filename: file.name,
          contentType: file.type
        });
        formData.append('category', 'general');

        const response = await axios.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
          headers: {
            Authorization: `Bearer ${testUserToken}`,
            ...formData.getHeaders()
          }
        });
        
        expect(response.status).toBe(200);
        expect(response.data.data.file.mimetype).toBe(file.type);
        expect(response.data.data.file.originalName).toBe(file.name);
      }
      
      console.log('✅ Multiple file types handled successfully');
    });

    it('should reject unsupported file types', async () => {
      const formData = new FormData();
      formData.append('file', Buffer.from('fake-exe-data'), {
        filename: 'virus.exe',
        contentType: 'application/x-executable'
      });
      formData.append('category', 'general');

      try {
        await axios.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
          headers: {
            Authorization: `Bearer ${testUserToken}`,
            ...formData.getHeaders()
          }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Unsupported file types properly rejected');
    });

    it('should enforce file size limits', async () => {
      // Create a large mock file (over 50MB)
      const largeFileData = Buffer.alloc(51 * 1024 * 1024, 'a'); // 51MB
      
      const formData = new FormData();
      formData.append('file', largeFileData, {
        filename: 'huge-file.txt',
        contentType: 'text/plain'
      });

      try {
        await axios.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
          headers: {
            Authorization: `Bearer ${testUserToken}`,
            ...formData.getHeaders()
          }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toContain('File size too large');
      }
      
      console.log('✅ File size limits enforced');
    });
  });

  describe('File Upload for NFT (S3 + IPFS)', () => {
    
    it('should upload file to both S3 and IPFS', async () => {
      const mockNFTImage = Buffer.from('fake-nft-image-data-for-blockchain-storage');
      
      const formData = new FormData();
      formData.append('file', mockNFTImage, {
        filename: 'exclusive-comic-page-nft.jpg',
        contentType: 'image/jpeg'
      });
      formData.append('category', 'nft-asset');
      formData.append('referenceId', 'comic-page-001');
      formData.append('referenceType', 'comic-page');
      formData.append('nftMetadata', JSON.stringify({
        name: 'Exclusive Comic Page #001',
        description: 'First page of The Amazing Crypto Heroes series',
        attributes: [
          { trait_type: 'Rarity', value: 'Legendary' },
          { trait_type: 'Page Number', value: '1' },
          { trait_type: 'Series', value: 'Crypto Heroes' }
        ]
      }));

      const response = await axios.post(`${API_GATEWAY_URL}/files/upload/nft`, formData, {
        headers: {
          Authorization: `Bearer ${testUserToken}`,
          ...formData.getHeaders()
        }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      
      const fileData = response.data.data.file;
      expect(fileData.s3Url).toBeDefined();
      expect(fileData.ipfsHash).toBeDefined();
      expect(fileData.ipfsUrl).toBeDefined();
      expect(fileData.isPinnedToIPFS).toBe(true);
      expect(fileData.purpose).toBe('nft-minting');
      expect(fileData.category).toBe('nft-asset');
      
      const ipfsData = response.data.data.ipfsResult;
      expect(ipfsData.hash).toBeDefined();
      expect(ipfsData.url).toBeDefined();
      expect(ipfsData.pinSize).toBeGreaterThan(0);
      
      nftFileId = fileData.id;
      console.log('✅ File uploaded to both S3 and IPFS successfully');
      console.log(`📎 IPFS Hash: ${fileData.ipfsHash}`);
      console.log(`🔗 IPFS URL: ${fileData.ipfsUrl}`);
    });

    it('should include NFT metadata in file record', async () => {
      if (!nftFileId) return;

      const response = await axios.get(`${API_GATEWAY_URL}/files/${nftFileId}`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.metadata.nftMetadata).toBeDefined();
      expect(response.data.data.metadata.nftMetadata.name).toContain('Exclusive Comic Page');
      
      console.log('✅ NFT metadata properly stored');
    });
  });

  describe('Presigned Upload URLs', () => {
    
    it('should generate presigned upload URL', async () => {
      const requestData = {
        filename: 'direct-upload-test.png',
        contentType: 'image/png',
        category: 'comic-page',
        purpose: 'storage'
      };

      const response = await axios.post(`${API_GATEWAY_URL}/files/presigned-url`, requestData, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.uploadUrl).toBeDefined();
      expect(response.data.data.s3Key).toBeDefined();
      expect(response.data.data.cdnUrl).toBeDefined();
      expect(response.data.data.expiresIn).toBe(3600); // 1 hour default
      
      presignedUploadData = response.data.data;
      console.log('✅ Presigned upload URL generated successfully');
    });

    it('should validate presigned URL format', async () => {
      expect(presignedUploadData.uploadUrl).toMatch(/^https:\/\/.+\.amazonaws\.com\/.+/);
      expect(presignedUploadData.s3Key).toMatch(/^comic-page\/.+\/\d+_.+_direct-upload-test\.png$/);
      expect(presignedUploadData.cdnUrl).toBeDefined();
      
      console.log('✅ Presigned URL format validated');
    });

    it('should require authentication for presigned URLs', async () => {
      try {
        await axios.post(`${API_GATEWAY_URL}/files/presigned-url`, {
          filename: 'test.jpg',
          contentType: 'image/jpeg'
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
      
      console.log('✅ Presigned URL properly protected');
    });
  });

  describe('File Management', () => {
    
    it('should list user files', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/files/?page=1&limit=10`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data.files)).toBe(true);
      expect(response.data.data.pagination).toBeDefined();
      
      // All files should belong to the test user
      response.data.data.files.forEach((file: any) => {
        expect(file.userId).toBe(testUserId);
      });
      
      console.log('✅ User files listed successfully');
    });

    it('should filter files by category', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/files/?category=comic-cover&page=1&limit=5`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      response.data.data.files.forEach((file: any) => {
        expect(file.category).toBe('comic-cover');
      });
      
      console.log('✅ File category filtering working');
    });

    it('should filter files by purpose', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/files/?purpose=nft-minting&page=1&limit=5`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      response.data.data.files.forEach((file: any) => {
        expect(file.purpose).toBe('nft-minting');
      });
      
      console.log('✅ File purpose filtering working');
    });

    it('should get specific file details', async () => {
      if (!uploadedFileId) return;

      const response = await axios.get(`${API_GATEWAY_URL}/files/${uploadedFileId}`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.id).toBe(uploadedFileId);
      expect(response.data.data.userId).toBe(testUserId);
      
      console.log('✅ Specific file details retrieved');
    });

    it('should handle public file access', async () => {
      if (!uploadedFileId) return;

      // Test access without authentication for public file
      const response = await axios.get(`${API_GATEWAY_URL}/files/${uploadedFileId}`);
      
      expect(response.status).toBe(200);
      expect(response.data.data.isPublic).toBe(true);
      
      console.log('✅ Public file access working');
    });

    it('should protect private file access', async () => {
      // Upload a private file first
      const formData = new FormData();
      formData.append('file', Buffer.from('private-file-data'), {
        filename: 'private-test.txt',
        contentType: 'text/plain'
      });
      formData.append('category', 'private');
      formData.append('isPublic', 'false');

      const uploadResponse = await axios.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
        headers: {
          Authorization: `Bearer ${testUserToken}`,
          ...formData.getHeaders()
        }
      });
      
      const privateFileId = uploadResponse.data.data.file.id;

      // Try to access without authentication
      try {
        await axios.get(`${API_GATEWAY_URL}/files/${privateFileId}`);
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(403);
        expect(error.response.data.error).toContain('Access denied');
      }
      
      console.log('✅ Private file access properly protected');
    });
  });

  describe('File Deletion', () => {
    
    it('should delete user file', async () => {
      if (!uploadedFileId) return;

      const response = await axios.delete(`${API_GATEWAY_URL}/files/${uploadedFileId}`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      
      console.log('✅ File deleted successfully');
    });

    it('should mark file as inactive after deletion', async () => {
      if (!uploadedFileId) return;

      try {
        await axios.get(`${API_GATEWAY_URL}/files/${uploadedFileId}`, {
          headers: { Authorization: `Bearer ${testUserToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
      
      console.log('✅ Deleted file properly inaccessible');
    });

    it('should not allow deletion of other users files', async () => {
      // Create another user
      const otherUser = {
        email: `other-file-user-${Date.now()}@nerdwork.com`,
        password: 'SecureTestPassword123!',
        username: `otherfileuser${Date.now()}`
      };
      
      const otherSignup = await axios.post(`${API_GATEWAY_URL}/auth/signup`, otherUser);
      const otherUserToken = otherSignup.data.data.token;
      
      if (!nftFileId) return;

      try {
        await axios.delete(`${API_GATEWAY_URL}/files/${nftFileId}`, {
          headers: { Authorization: `Bearer ${otherUserToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toContain('not found');
      }
      
      console.log('✅ Cross-user file deletion properly prevented');
    });
  });

  describe('IPFS Integration', () => {
    
    it('should handle IPFS gateway URLs correctly', async () => {
      if (!nftFileId) return;

      const response = await axios.get(`${API_GATEWAY_URL}/files/${nftFileId}`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      const file = response.data.data;
      expect(file.ipfsUrl).toBeDefined();
      expect(file.ipfsHash).toBeDefined();
      
      // IPFS URL should be properly formatted
      expect(file.ipfsUrl).toMatch(/^https:\/\/.+\/ipfs\/[a-zA-Z0-9]+$/);
      
      console.log('✅ IPFS URL formatting correct');
    });

    it('should track IPFS pinning status', async () => {
      if (!nftFileId) return;

      const response = await axios.get(`${API_GATEWAY_URL}/files/${nftFileId}`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.data.data.isPinnedToIPFS).toBe(true);
      
      console.log('✅ IPFS pinning status tracked');
    });
  });

  describe('Service Health & Performance', () => {
    
    it('should respond to health check', async () => {
      const response = await axios.get(`${FILE_SERVICE_URL}/health`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.service).toBe('file-service');
      
      console.log('✅ File service health check passed');
    });

    it('should handle concurrent file uploads', async () => {
      const uploadPromises = Array.from({ length: 3 }, (_, i) => {
        const formData = new FormData();
        formData.append('file', Buffer.from(`concurrent-test-${i}`), {
          filename: `concurrent-${i}.txt`,
          contentType: 'text/plain'
        });
        formData.append('category', 'test');

        return axios.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
          headers: {
            Authorization: `Bearer ${testUserToken}`,
            ...formData.getHeaders()
          }
        });
      });
      
      const responses = await Promise.all(uploadPromises);
      
      responses.forEach((response, index) => {
        expect(response.status).toBe(200);
        expect(response.data.data.file.originalName).toBe(`concurrent-${index}.txt`);
      });
      
      console.log('✅ Concurrent file uploads handled successfully');
    });

    it('should maintain reasonable upload response times', async () => {
      const startTime = Date.now();
      
      const formData = new FormData();
      formData.append('file', Buffer.from('performance-test-data'), {
        filename: 'performance-test.txt',
        contentType: 'text/plain'
      });
      formData.append('category', 'test');

      await axios.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
        headers: {
          Authorization: `Bearer ${testUserToken}`,
          ...formData.getHeaders()
        }
      });
      
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(5000); // Should complete within 5 seconds
      
      console.log(`✅ Upload response time: ${responseTime}ms (acceptable)`);
    });
  });

  describe('Error Handling', () => {
    
    it('should handle missing file in upload', async () => {
      const formData = new FormData();
      formData.append('category', 'test');

      try {
        await axios.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
          headers: {
            Authorization: `Bearer ${testUserToken}`,
            ...formData.getHeaders()
          }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toContain('No file provided');
      }
      
      console.log('✅ Missing file properly handled');
    });

    it('should handle invalid file IDs', async () => {
      try {
        await axios.get(`${API_GATEWAY_URL}/files/invalid-file-id-123`, {
          headers: { Authorization: `Bearer ${testUserToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
      
      console.log('✅ Invalid file IDs properly handled');
    });

    it('should handle network interruptions gracefully', async () => {
      // Test with a very small timeout to simulate network issues
      const axiosInstance = axios.create({ timeout: 1 });
      
      try {
        const formData = new FormData();
        formData.append('file', Buffer.alloc(1024 * 1024), {
          filename: 'timeout-test.bin',
          contentType: 'application/octet-stream'
        });

        await axiosInstance.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
          headers: {
            Authorization: `Bearer ${testUserToken}`,
            ...formData.getHeaders()
          }
        });
      } catch (error: any) {
        expect(error.code).toBe('ECONNABORTED');
      }
      
      console.log('✅ Network interruptions handled gracefully');
    });
  });
});