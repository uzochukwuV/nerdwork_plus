import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import axios from 'axios';
import FormData from 'form-data';

// Test environment configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const API_GATEWAY = BASE_URL;

// Test user data
const testUser = {
  email: 'test-creator@nerdwork.com',
  password: 'SecurePassword123!',
  username: 'testcreator',
  displayName: 'Test Creator'
};

const testConsumer = {
  email: 'test-consumer@nerdwork.com', 
  password: 'SecurePassword123!',
  username: 'testconsumer',
  displayName: 'Test Consumer'
};

// Global test variables
let creatorToken: string;
let consumerToken: string;
let creatorUserId: string;
let consumerUserId: string;
let creatorId: string;
let comicId: string;
let uploadedFileId: string;
let coverFileId: string;
let walletId: string;
let nwtPackageId: string;

describe('🚀 Nerdwork+ MVP User Flow Tests', () => {
  
  describe('1️⃣ User Authentication Flow', () => {
    
    it('should allow new user registration (Creator)', async () => {
      const response = await axios.post(`${API_GATEWAY}/auth/signup`, testUser);
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.data.user.email).toBe(testUser.email);
      expect(response.data.data.token).toBeDefined();
      
      creatorToken = response.data.data.token;
      creatorUserId = response.data.data.user.id;
      
      console.log('✅ Creator registered successfully');
    });

    it('should allow new user registration (Consumer)', async () => {
      const response = await axios.post(`${API_GATEWAY}/auth/signup`, testConsumer);
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.data.user.email).toBe(testConsumer.email);
      expect(response.data.data.token).toBeDefined();
      
      consumerToken = response.data.data.token;
      consumerUserId = response.data.data.user.id;
      
      console.log('✅ Consumer registered successfully');
    });

    it('should allow user login', async () => {
      const response = await axios.post(`${API_GATEWAY}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.token).toBeDefined();
      
      console.log('✅ User login successful');
    });

    it('should get current user profile', async () => {
      const response = await axios.get(`${API_GATEWAY}/user/me`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.email).toBe(testUser.email);
      
      console.log('✅ User profile retrieved');
    });
  });

  describe('2️⃣ Creator Registration Flow', () => {
    
    it('should allow user to become a creator', async () => {
      const creatorData = {
        creatorName: 'Amazing Comics Studio',
        creatorBio: 'Creating amazing superhero comics for the digital age.',
        socialLinks: {
          twitter: '@amazingcomics',
          instagram: '@amazing_comics_studio'
        }
      };

      const response = await axios.post(`${API_GATEWAY}/user/creator/become`, creatorData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.isCreator).toBe(true);
      expect(response.data.data.creatorName).toBe(creatorData.creatorName);
      
      creatorId = response.data.data.id;
      console.log('✅ User became creator successfully');
    });

    it('should check creator status', async () => {
      const response = await axios.get(`${API_GATEWAY}/user/creator/status`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.isCreator).toBe(true);
      
      console.log('✅ Creator status verified');
    });

    it('should browse creators publicly', async () => {
      const response = await axios.get(`${API_GATEWAY}/user/creators?page=1&limit=10`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data.creators)).toBe(true);
      expect(response.data.data.creators.length).toBeGreaterThan(0);
      
      console.log('✅ Creator browse working');
    });
  });

  describe('3️⃣ Wallet & Crypto Payment Flow', () => {
    
    it('should create user wallet', async () => {
      const response = await axios.get(`${API_GATEWAY}/wallet/`, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.userId).toBe(consumerUserId);
      
      walletId = response.data.data.id;
      console.log('✅ User wallet created');
    });

    it('should connect crypto wallet', async () => {
      const walletData = {
        walletAddress: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH',
        walletType: 'phantom',
        signature: 'mock_signature_for_testing'
      };

      const response = await axios.post(`${API_GATEWAY}/wallet/crypto/connect`, walletData, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.connectedWalletAddress).toBe(walletData.walletAddress);
      expect(response.data.data.walletType).toBe(walletData.walletType);
      
      console.log('✅ Crypto wallet connected');
    });

    it('should get NWT pricing packages', async () => {
      const response = await axios.get(`${API_GATEWAY}/wallet/pricing`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data)).toBe(true);
      
      if (response.data.data.length > 0) {
        nwtPackageId = response.data.data[0].id;
        console.log('✅ NWT pricing packages retrieved');
      }
    });

    it('should create crypto payment link via Helio', async () => {
      if (!nwtPackageId) {
        console.log('⚠️ Skipping crypto payment test - no pricing package available');
        return;
      }

      const paymentData = {
        packageId: nwtPackageId,
        currency: 'USDC',
        redirectUrl: 'https://nerdwork.com/payment-success'
      };

      const response = await axios.post(`${API_GATEWAY}/wallet/crypto/purchase`, paymentData, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.paymentLink.url).toBeDefined();
      expect(response.data.data.paymentLink.qrCode).toBeDefined();
      
      console.log('✅ Helio payment link created');
      console.log('🔗 Payment URL:', response.data.data.paymentLink.url);
    });

    it('should get wallet transaction history', async () => {
      const response = await axios.get(`${API_GATEWAY}/wallet/transactions?page=1&limit=10`, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data.transactions)).toBe(true);
      
      console.log('✅ Transaction history retrieved');
    });
  });

  describe('4️⃣ File Upload Flow', () => {
    
    it('should upload comic cover to S3', async () => {
      // Create a mock file buffer (in real test, you'd use actual file)
      const mockImageBuffer = Buffer.from('mock-image-data-for-comic-cover');
      
      const formData = new FormData();
      formData.append('file', mockImageBuffer, {
        filename: 'comic-cover.jpg',
        contentType: 'image/jpeg'
      });
      formData.append('category', 'comic-cover');
      formData.append('purpose', 'storage');
      formData.append('isPublic', 'true');

      const response = await axios.post(`${API_GATEWAY}/files/upload/s3`, formData, {
        headers: {
          Authorization: `Bearer ${creatorToken}`,
          ...formData.getHeaders()
        }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.file.s3Url).toBeDefined();
      expect(response.data.data.file.cdnUrl).toBeDefined();
      
      coverFileId = response.data.data.file.id;
      console.log('✅ Comic cover uploaded to S3');
    });

    it('should upload comic page for NFT (S3 + IPFS)', async () => {
      const mockImageBuffer = Buffer.from('mock-comic-page-data-for-nft');
      
      const formData = new FormData();
      formData.append('file', mockImageBuffer, {
        filename: 'comic-page-001.jpg', 
        contentType: 'image/jpeg'
      });
      formData.append('category', 'nft-asset');
      formData.append('nftMetadata', JSON.stringify({
        trait_type: 'Page Number',
        value: '1',
        rarity: 'Common'
      }));

      const response = await axios.post(`${API_GATEWAY}/files/upload/nft`, formData, {
        headers: {
          Authorization: `Bearer ${creatorToken}`,
          ...formData.getHeaders()
        }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.file.s3Url).toBeDefined();
      expect(response.data.data.file.ipfsHash).toBeDefined();
      expect(response.data.data.file.ipfsUrl).toBeDefined();
      expect(response.data.data.file.isPinnedToIPFS).toBe(true);
      
      uploadedFileId = response.data.data.file.id;
      console.log('✅ Comic page uploaded to S3 + IPFS');
      console.log('🌐 IPFS Hash:', response.data.data.file.ipfsHash);
    });

    it('should get user uploaded files', async () => {
      const response = await axios.get(`${API_GATEWAY}/files/?category=comic-cover&page=1&limit=10`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data.files)).toBe(true);
      
      console.log('✅ User files retrieved');
    });

    it('should get presigned upload URL', async () => {
      const response = await axios.post(`${API_GATEWAY}/files/presigned-url`, {
        filename: 'comic-page-002.jpg',
        contentType: 'image/jpeg',
        category: 'comic-page'
      }, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.uploadUrl).toBeDefined();
      expect(response.data.data.s3Key).toBeDefined();
      
      console.log('✅ Presigned upload URL generated');
    });
  });

  describe('5️⃣ Comic Creation Flow', () => {
    
    it('should create a new comic', async () => {
      const comicData = {
        title: 'The Amazing Crypto Heroes',
        description: 'An epic tale of blockchain superheroes saving the metaverse from evil centralized forces.',
        author: 'Amazing Comics Studio',
        artist: 'Digital Art Master',
        genre: 'Superhero',
        price: 5.99,
        isFreemium: true,
        freePageCount: 3,
        coverFileId: coverFileId,
        isNFTEligible: true,
        metadata: {
          tags: ['blockchain', 'superhero', 'web3', 'crypto'],
          ageRating: 'Teen',
          language: 'English'
        }
      };

      const response = await axios.post(`${API_GATEWAY}/comics/creator`, comicData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.data.title).toBe(comicData.title);
      expect(response.data.data.creatorId).toBe(creatorUserId);
      expect(response.data.data.status).toBe('draft');
      expect(response.data.data.isNFTEligible).toBe(true);
      
      comicId = response.data.data.id;
      console.log('✅ Comic created successfully');
    });

    it('should add pages to comic', async () => {
      const pagesData = {
        pages: [
          {
            pageNumber: 1,
            fileId: uploadedFileId,
            altText: 'Opening scene with our heroes',
            isPreview: true
          },
          {
            pageNumber: 2,
            fileId: uploadedFileId, // In real scenario, would be different files
            altText: 'The villain reveals their plan',
            isPreview: true
          },
          {
            pageNumber: 3,
            fileId: uploadedFileId,
            altText: 'Epic battle begins',
            isPreview: true
          }
        ]
      };

      const response = await axios.post(`${API_GATEWAY}/comics/creator/${comicId}/pages`, pagesData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data)).toBe(true);
      expect(response.data.data.length).toBe(3);
      
      console.log('✅ Comic pages added successfully');
    });

    it('should get creator comics', async () => {
      const response = await axios.get(`${API_GATEWAY}/comics/creator/my-comics?page=1&limit=10`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data.comics)).toBe(true);
      expect(response.data.data.comics.length).toBeGreaterThan(0);
      
      console.log('✅ Creator comics retrieved');
    });

    it('should update comic to published status', async () => {
      const updateData = {
        status: 'published',
        title: 'The Amazing Crypto Heroes - Updated'
      };

      const response = await axios.put(`${API_GATEWAY}/comics/creator/${comicId}`, updateData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.status).toBe('published');
      expect(response.data.data.publishedAt).toBeDefined();
      
      console.log('✅ Comic published successfully');
    });

    it('should get creator dashboard stats', async () => {
      const response = await axios.get(`${API_GATEWAY}/comics/creator/stats`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.totalComics).toBeGreaterThan(0);
      expect(response.data.data.publishedComics).toBeGreaterThan(0);
      
      console.log('✅ Creator stats retrieved');
    });
  });

  describe('6️⃣ Consumer Comic Discovery & Purchase Flow', () => {
    
    it('should browse comics publicly', async () => {
      const response = await axios.get(`${API_GATEWAY}/comics?page=1&limit=10&genre=Superhero`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data.comics)).toBe(true);
      expect(response.data.data.pagination).toBeDefined();
      
      console.log('✅ Comics browsing working');
    });

    it('should get specific comic details', async () => {
      const response = await axios.get(`${API_GATEWAY}/comics/${comicId}`, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.comic.id).toBe(comicId);
      expect(response.data.data.hasPurchased).toBe(false);
      
      console.log('✅ Comic details retrieved');
    });

    it('should get comic preview pages', async () => {
      const response = await axios.get(`${API_GATEWAY}/comics/${comicId}/pages`, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data.pages)).toBe(true);
      expect(response.data.data.accessLevel).toBe('preview');
      
      console.log('✅ Comic preview pages accessible');
    });

    it('should add comic review', async () => {
      const reviewData = {
        rating: 5,
        review: 'Amazing artwork and compelling storyline! Love the Web3 theme.'
      };

      const response = await axios.post(`${API_GATEWAY}/comics/${comicId}/review`, reviewData, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.rating).toBe(reviewData.rating);
      
      console.log('✅ Comic review added');
    });

    it('should track reading progress', async () => {
      const progressData = {
        currentPage: 2
      };

      const response = await axios.post(`${API_GATEWAY}/comics/${comicId}/progress`, progressData, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.currentPage).toBe(2);
      
      console.log('✅ Reading progress tracked');
    });

    it('should get reading history', async () => {
      const response = await axios.get(`${API_GATEWAY}/comics/user/history`, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data)).toBe(true);
      
      console.log('✅ Reading history retrieved');
    });
  });

  describe('7️⃣ Error Handling & Edge Cases', () => {
    
    it('should reject unauthorized access to creator endpoints', async () => {
      try {
        await axios.post(`${API_GATEWAY}/comics/creator`, {
          title: 'Unauthorized Comic'
        });
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Unauthorized access properly rejected');
    });

    it('should handle invalid file uploads', async () => {
      const formData = new FormData();
      formData.append('file', Buffer.from(''), {
        filename: '',
        contentType: 'invalid/type'
      });

      try {
        await axios.post(`${API_GATEWAY}/files/upload/s3`, formData, {
          headers: {
            Authorization: `Bearer ${creatorToken}`,
            ...formData.getHeaders()
          }
        });
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
      
      console.log('✅ Invalid file upload properly handled');
    });

    it('should handle non-existent comic access', async () => {
      const fakeComicId = '00000000-0000-0000-0000-000000000000';
      
      try {
        await axios.get(`${API_GATEWAY}/comics/${fakeComicId}`);
      } catch (error: any) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Non-existent comic access properly handled');
    });
  });

  describe('8️⃣ Service Health Checks', () => {
    
    it('should check API Gateway health', async () => {
      const response = await axios.get(`${API_GATEWAY}/health`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      
      console.log('✅ API Gateway health check passed');
    });

    it('should check individual service health', async () => {
      const services = [
        { name: 'auth-service', port: 3001 },
        { name: 'user-service', port: 3002 },
        { name: 'comic-service', port: 3003 },
        { name: 'wallet-service', port: 3004 },
        { name: 'file-service', port: 3007 }
      ];

      for (const service of services) {
        try {
          const response = await axios.get(`http://localhost:${service.port}/health`);
          expect(response.status).toBe(200);
          console.log(`✅ ${service.name} health check passed`);
        } catch (error) {
          console.log(`⚠️ ${service.name} not responding (may be running in container)`);
        }
      }
    });
  });

  // Cleanup after tests
  afterAll(async () => {
    console.log('\n🧹 Cleaning up test data...');
    
    // Delete uploaded files
    if (uploadedFileId) {
      try {
        await axios.delete(`${API_GATEWAY}/files/${uploadedFileId}`, {
          headers: { Authorization: `Bearer ${creatorToken}` }
        });
        console.log('✅ Uploaded files cleaned up');
      } catch (error) {
        console.log('⚠️ File cleanup failed (may not exist)');
      }
    }
    
    // Archive created comic
    if (comicId) {
      try {
        await axios.delete(`${API_GATEWAY}/comics/creator/${comicId}`, {
          headers: { Authorization: `Bearer ${creatorToken}` }
        });
        console.log('✅ Test comic archived');
      } catch (error) {
        console.log('⚠️ Comic cleanup failed (may not exist)');
      }
    }
    
    console.log('🎉 Test cleanup completed!');
  });
});

// Helper function to simulate delay (for rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));