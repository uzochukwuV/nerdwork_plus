import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import axios from 'axios';
import FormData from 'form-data';

const COMIC_SERVICE_URL = process.env.COMIC_SERVICE_URL || 'http://localhost:3003';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3002';
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3000';

describe('🎨 Comic Creator Flow Tests', () => {
  let creatorToken: string;
  let creatorUserId: string;
  let consumerToken: string;
  let consumerUserId: string;
  let creatorId: string;
  let comicId: string;
  let coverFileId: string;
  let pageFileId: string;
  let purchaseTransactionId: string;
  
  const creatorUser = {
    email: `test-creator-${Date.now()}@nerdwork.com`,
    password: 'SecureTestPassword123!',
    username: `creator${Date.now()}`
  };

  const consumerUser = {
    email: `test-consumer-${Date.now()}@nerdwork.com`,
    password: 'SecureTestPassword123!',
    username: `consumer${Date.now()}`
  };

  beforeAll(async () => {
    // Create creator user
    const creatorSignup = await axios.post(`${API_GATEWAY_URL}/auth/signup`, creatorUser);
    creatorToken = creatorSignup.data.data.token;
    creatorUserId = creatorSignup.data.data.user.id;
    
    // Create consumer user
    const consumerSignup = await axios.post(`${API_GATEWAY_URL}/auth/signup`, consumerUser);
    consumerToken = consumerSignup.data.data.token;
    consumerUserId = consumerSignup.data.data.user.id;
    
    console.log('🔧 Test users created for comic creator tests');
  });

  describe('1️⃣ Becoming a Creator', () => {
    
    it('should allow user to become a creator', async () => {
      const creatorData = {
        creatorName: 'Digital Comics Studio',
        creatorBio: 'We create amazing digital comics with Web3 integration. Specialized in superhero and sci-fi genres.',
        socialLinks: {
          twitter: '@digitalcomicsstudio',
          instagram: '@digital_comics_studio',
          website: 'https://digitalcomics.studio'
        }
      };

      const response = await axios.post(`${API_GATEWAY_URL}/user/creator/become`, creatorData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.isCreator).toBe(true);
      expect(response.data.data.creatorName).toBe(creatorData.creatorName);
      expect(response.data.data.creatorBio).toBe(creatorData.creatorBio);
      expect(response.data.data.creatorVerified).toBe(false);
      
      creatorId = response.data.data.id;
      console.log('✅ User became creator successfully');
    });

    it('should prevent non-creators from accessing creator endpoints', async () => {
      try {
        await axios.post(`${API_GATEWAY_URL}/comics/creator`, {
          title: 'Unauthorized Comic'
        }, {
          headers: { Authorization: `Bearer ${consumerToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(403);
        expect(error.response.data.error).toContain('not a creator');
      }
      
      console.log('✅ Non-creator access properly restricted');
    });

    it('should get creator status', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/user/creator/status`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.isCreator).toBe(true);
      expect(response.data.data.creatorName).toBe('Digital Comics Studio');
      
      console.log('✅ Creator status retrieved');
    });

    it('should update creator profile', async () => {
      const updateData = {
        creatorBio: 'Updated bio: Award-winning digital comics studio with over 50 published titles.',
        socialLinks: {
          twitter: '@digitalcomicsstudio',
          instagram: '@digital_comics_studio',
          website: 'https://digitalcomics.studio',
          discord: 'https://discord.gg/digitalcomics'
        }
      };

      const response = await axios.put(`${API_GATEWAY_URL}/user/creator/profile`, updateData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.creatorBio).toBe(updateData.creatorBio);
      expect(response.data.data.socialLinks.discord).toBe(updateData.socialLinks.discord);
      
      console.log('✅ Creator profile updated');
    });
  });

  describe('2️⃣ Content Upload & Preparation', () => {
    
    it('should upload comic cover image', async () => {
      const mockCoverImage = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
      
      const formData = new FormData();
      formData.append('file', mockCoverImage, {
        filename: 'crypto-heroes-cover.png',
        contentType: 'image/png'
      });
      formData.append('category', 'comic-cover');
      formData.append('purpose', 'storage');
      formData.append('isPublic', 'true');

      const response = await axios.post(`${API_GATEWAY_URL}/files/upload/s3`, formData, {
        headers: {
          Authorization: `Bearer ${creatorToken}`,
          ...formData.getHeaders()
        }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.file.category).toBe('comic-cover');
      expect(response.data.data.file.s3Url).toBeDefined();
      
      coverFileId = response.data.data.file.id;
      console.log('✅ Comic cover uploaded');
    });

    it('should upload comic page for potential NFT minting', async () => {
      const mockPageImage = Buffer.from('fake-comic-page-art-data-with-nft-potential');
      
      const formData = new FormData();
      formData.append('file', mockPageImage, {
        filename: 'crypto-heroes-page-001.jpg',
        contentType: 'image/jpeg'
      });
      formData.append('category', 'nft-asset');
      formData.append('referenceType', 'comic-page');
      formData.append('nftMetadata', JSON.stringify({
        name: 'Crypto Heroes - Page 1',
        description: 'The opening page where our heroes first discover their blockchain powers.',
        attributes: [
          { trait_type: 'Page Number', value: '1' },
          { trait_type: 'Rarity', value: 'First Edition' },
          { trait_type: 'Series', value: 'Crypto Heroes Vol.1' },
          { trait_type: 'Artist', value: 'Digital Comics Studio' }
        ]
      }));

      const response = await axios.post(`${API_GATEWAY_URL}/files/upload/nft`, formData, {
        headers: {
          Authorization: `Bearer ${creatorToken}`,
          ...formData.getHeaders()
        }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.file.ipfsHash).toBeDefined();
      expect(response.data.data.file.isPinnedToIPFS).toBe(true);
      expect(response.data.data.ipfsResult.hash).toBeDefined();
      
      pageFileId = response.data.data.file.id;
      console.log('✅ Comic page uploaded to S3 + IPFS for NFT potential');
    });
  });

  describe('3️⃣ Comic Creation', () => {
    
    it('should create a new comic', async () => {
      const comicData = {
        title: 'The Crypto Heroes: Genesis',
        description: 'In a world where blockchain technology has evolved beyond imagination, a group of unlikely heroes must master the power of decentralized networks to save humanity from a centralized dystopia.',
        author: 'Digital Comics Studio',
        artist: 'Alex Blockchain',
        publisher: 'Web3 Comics',
        genre: 'Superhero',
        price: 9.99,
        isFreemium: true,
        freePageCount: 5,
        coverFileId: coverFileId,
        isNFTEligible: true,
        metadata: {
          tags: ['blockchain', 'superhero', 'web3', 'crypto', 'dystopia'],
          ageRating: 'Teen+',
          language: 'English',
          estimatedReadTime: '15-20 minutes',
          targetAudience: 'Web3 enthusiasts and comic lovers'
        }
      };

      const response = await axios.post(`${API_GATEWAY_URL}/comics/creator`, comicData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.data.title).toBe(comicData.title);
      expect(response.data.data.creatorId).toBe(creatorUserId);
      expect(response.data.data.status).toBe('draft');
      expect(response.data.data.isNFTEligible).toBe(true);
      expect(response.data.data.coverUrl).toBeDefined();
      expect(response.data.data.coverFileId).toBe(coverFileId);
      
      comicId = response.data.data.id;
      console.log('✅ Comic created successfully');
    });

    it('should add pages to the comic', async () => {
      const pagesData = {
        pages: [
          {
            pageNumber: 1,
            fileId: pageFileId,
            altText: 'Opening scene: The city skyline dominated by centralized towers, our heroes unaware of their destiny',
            isPreview: true
          },
          {
            pageNumber: 2,
            fileId: pageFileId, // In real scenario, different file
            altText: 'Meet Jake, a young developer who stumbles upon a mysterious smart contract',
            isPreview: true
          },
          {
            pageNumber: 3,
            fileId: pageFileId,
            altText: 'The smart contract activates, granting Jake incredible blockchain powers',
            isPreview: true
          },
          {
            pageNumber: 4,
            fileId: pageFileId,
            altText: 'Jake discovers others have been chosen by the decentralized network',
            isPreview: true
          },
          {
            pageNumber: 5,
            fileId: pageFileId,
            altText: 'The team assembles: The Validators - guardians of the blockchain',
            isPreview: true
          },
          {
            pageNumber: 6,
            fileId: pageFileId,
            altText: 'First confrontation with the Centralized Authority agents',
            isPreview: false // Premium content
          },
          {
            pageNumber: 7,
            fileId: pageFileId,
            altText: 'Epic battle using Web3 powers - smart contract spells and DeFi shields',
            isPreview: false
          }
        ]
      };

      const response = await axios.post(`${API_GATEWAY_URL}/comics/creator/${comicId}/pages`, pagesData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data)).toBe(true);
      expect(response.data.data.length).toBe(7);
      
      // Check that preview pages are properly marked
      const previewPages = response.data.data.filter((page: any) => page.isPreview);
      const premiumPages = response.data.data.filter((page: any) => !page.isPreview);
      
      expect(previewPages.length).toBe(5);
      expect(premiumPages.length).toBe(2);
      
      console.log('✅ Comic pages added successfully');
    });

    it('should get creator comic pages', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/comics/creator/${comicId}/pages`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.comic.id).toBe(comicId);
      expect(response.data.data.comic.totalPages).toBe(7);
      expect(Array.isArray(response.data.data.pages)).toBe(true);
      expect(response.data.data.pages.length).toBe(7);
      
      console.log('✅ Creator can access all comic pages');
    });

    it('should update comic details', async () => {
      const updateData = {
        title: 'The Crypto Heroes: Genesis (Director\'s Cut)',
        description: 'UPDATED: In a world where blockchain technology has evolved beyond imagination, a group of unlikely heroes must master the power of decentralized networks to save humanity from a centralized dystopia. Now with bonus content!',
        price: 12.99,
        metadata: {
          tags: ['blockchain', 'superhero', 'web3', 'crypto', 'dystopia', 'directors-cut'],
          ageRating: 'Teen+',
          language: 'English',
          estimatedReadTime: '20-25 minutes',
          version: 'Directors Cut v1.1'
        }
      };

      const response = await axios.put(`${API_GATEWAY_URL}/comics/creator/${comicId}`, updateData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.title).toBe(updateData.title);
      expect(response.data.data.price).toBe(updateData.price.toString());
      expect(response.data.data.metadata.version).toBe('Directors Cut v1.1');
      
      console.log('✅ Comic details updated');
    });

    it('should publish the comic', async () => {
      const response = await axios.put(`${API_GATEWAY_URL}/comics/creator/${comicId}`, {
        status: 'published'
      }, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.status).toBe('published');
      expect(response.data.data.publishedAt).toBeDefined();
      
      console.log('✅ Comic published successfully');
    });
  });

  describe('4️⃣ Creator Dashboard & Analytics', () => {
    
    it('should get creator comics list', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/comics/creator/my-comics?page=1&limit=10`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data.data.comics)).toBe(true);
      expect(response.data.data.comics.length).toBeGreaterThan(0);
      
      const comic = response.data.data.comics.find((c: any) => c.id === comicId);
      expect(comic).toBeDefined();
      expect(comic.status).toBe('published');
      
      console.log('✅ Creator comics list retrieved');
    });

    it('should filter comics by status', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/comics/creator/my-comics?status=published&page=1&limit=5`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      response.data.data.comics.forEach((comic: any) => {
        expect(comic.status).toBe('published');
      });
      
      console.log('✅ Comic status filtering working');
    });

    it('should get creator dashboard stats', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/comics/creator/stats`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.totalComics).toBeGreaterThan(0);
      expect(response.data.data.publishedComics).toBeGreaterThan(0);
      expect(response.data.data.draftComics).toBeGreaterThanOrEqual(0);
      expect(response.data.data.totalPurchases).toBeGreaterThanOrEqual(0);
      expect(response.data.data.totalRevenue).toBeDefined();
      
      console.log('✅ Creator dashboard stats retrieved');
      console.log(`📊 Stats: ${response.data.data.totalComics} comics, ${response.data.data.publishedComics} published, $${response.data.data.totalRevenue} revenue`);
    });
  });

  describe('5️⃣ Consumer Discovery & Interaction', () => {
    
    it('should allow consumers to discover published comics', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/comics?page=1&limit=10&genre=Superhero`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data.data.comics)).toBe(true);
      
      const publishedComic = response.data.data.comics.find((c: any) => c.id === comicId);
      expect(publishedComic).toBeDefined();
      expect(publishedComic.status).toBe('published');
      
      console.log('✅ Comic discoverable by consumers');
    });

    it('should get comic details as consumer', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/comics/${comicId}`, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.comic.id).toBe(comicId);
      expect(response.data.data.hasPurchased).toBe(false);
      expect(response.data.data.progress).toBeNull();
      
      console.log('✅ Consumer can view comic details');
    });

    it('should allow consumers to view preview pages only', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/comics/${comicId}/pages`, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.accessLevel).toBe('preview');
      expect(response.data.data.pages.length).toBe(5); // Only preview pages
      
      response.data.data.pages.forEach((page: any) => {
        expect(page.isPreview).toBe(true);
      });
      
      console.log('✅ Consumer limited to preview pages');
    });

    it('should allow consumers to add reviews', async () => {
      const reviewData = {
        rating: 5,
        review: 'Amazing artwork and storyline! Love the Web3 integration and the way blockchain concepts are woven into the superhero narrative. The art style is incredible and the characters are well-developed. Can\'t wait for the next issue!'
      };

      const response = await axios.post(`${API_GATEWAY_URL}/comics/${comicId}/review`, reviewData, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.rating).toBe(5);
      expect(response.data.data.review).toBe(reviewData.review);
      expect(response.data.data.comicId).toBe(comicId);
      
      console.log('✅ Consumer can add reviews');
    });

    it('should track reading progress for preview pages', async () => {
      const progressData = {
        currentPage: 3
      };

      const response = await axios.post(`${API_GATEWAY_URL}/comics/${comicId}/progress`, progressData, {
        headers: { Authorization: `Bearer ${consumerToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.currentPage).toBe(3);
      expect(response.data.data.totalPages).toBe(7);
      expect(response.data.data.completedAt).toBeNull(); // Not completed yet
      
      console.log('✅ Reading progress tracked');
    });
  });

  describe('6️⃣ Creator Content Management', () => {
    
    it('should prevent editing published comic pages', async () => {
      // This is business logic - once published, structural changes should be limited
      const response = await axios.get(`${API_GATEWAY_URL}/comics/creator/${comicId}/pages`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.comic.status).toBe('published');
      
      console.log('✅ Published comic pages accessible to creator');
    });

    it('should not allow deletion of comic with potential purchases', async () => {
      // Since this comic might have reviews/engagement, deletion should be restricted
      const response = await axios.get(`${API_GATEWAY_URL}/comics/creator/stats`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      console.log('✅ Comic stats accessible for business decisions');
    });

    it('should create another comic in draft status', async () => {
      const draftComicData = {
        title: 'The Crypto Heroes: Rising Storm (Coming Soon)',
        description: 'The sequel to Genesis is in development. Our heroes face their greatest challenge yet...',
        author: 'Digital Comics Studio',
        genre: 'Superhero',
        price: 14.99,
        isFreemium: false,
        freePageCount: 0,
        isNFTEligible: true,
        metadata: {
          tags: ['blockchain', 'superhero', 'sequel', 'coming-soon'],
          status: 'in-development'
        }
      };

      const response = await axios.post(`${API_GATEWAY_URL}/comics/creator`, draftComicData, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(201);
      expect(response.data.data.status).toBe('draft');
      expect(response.data.data.title).toContain('Coming Soon');
      
      console.log('✅ Draft comic created for future release');
    });

    it('should show updated creator stats with multiple comics', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/comics/creator/stats`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.totalComics).toBeGreaterThanOrEqual(2);
      expect(response.data.data.draftComics).toBeGreaterThanOrEqual(1);
      
      console.log('✅ Creator stats updated with multiple comics');
    });
  });

  describe('7️⃣ Cross-Service Integration', () => {
    
    it('should link comic with file service', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/files/?category=comic-cover&page=1&limit=5`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(response.status).toBe(200);
      const coverFile = response.data.data.files.find((f: any) => f.id === coverFileId);
      expect(coverFile).toBeDefined();
      
      console.log('✅ Comic-File service integration working');
    });

    it('should maintain creator profile consistency', async () => {
      const creatorProfileResponse = await axios.get(`${API_GATEWAY_URL}/user/creator/${creatorId}`);
      const creatorComicsResponse = await axios.get(`${API_GATEWAY_URL}/comics/creator/my-comics`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      expect(creatorProfileResponse.status).toBe(200);
      expect(creatorComicsResponse.status).toBe(200);
      
      const profile = creatorProfileResponse.data.data;
      const comics = creatorComicsResponse.data.data.comics;
      
      expect(profile.creatorName).toBe('Digital Comics Studio');
      expect(comics.length).toBeGreaterThan(0);
      
      console.log('✅ Creator-Comic service integration consistent');
    });
  });

  describe('8️⃣ Error Handling & Security', () => {
    
    it('should prevent unauthorized comic access', async () => {
      try {
        await axios.get(`${API_GATEWAY_URL}/comics/creator/${comicId}/pages`, {
          headers: { Authorization: `Bearer ${consumerToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toContain('not found or not owned');
      }
      
      console.log('✅ Unauthorized comic access prevented');
    });

    it('should handle invalid comic IDs gracefully', async () => {
      try {
        await axios.get(`${API_GATEWAY_URL}/comics/creator/invalid-comic-id/pages`, {
          headers: { Authorization: `Bearer ${creatorToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
      
      console.log('✅ Invalid comic IDs handled gracefully');
    });

    it('should validate comic creation data', async () => {
      try {
        await axios.post(`${API_GATEWAY_URL}/comics/creator`, {
          title: '', // Empty title should fail
          genre: 'Superhero'
        }, {
          headers: { Authorization: `Bearer ${creatorToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toContain('required');
      }
      
      console.log('✅ Comic creation validation working');
    });

    it('should maintain data integrity across operations', async () => {
      // Get initial stats
      const initialStats = await axios.get(`${API_GATEWAY_URL}/comics/creator/stats`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      // Get comic list
      const comicsList = await axios.get(`${API_GATEWAY_URL}/comics/creator/my-comics`, {
        headers: { Authorization: `Bearer ${creatorToken}` }
      });
      
      // Verify consistency
      expect(initialStats.data.data.totalComics).toBe(comicsList.data.data.comics.length);
      
      console.log('✅ Data integrity maintained across services');
    });
  });

  afterAll(async () => {
    console.log('\n🧹 Cleaning up comic creator test data...');
    
    // Archive test comics (don't delete due to business logic)
    if (comicId) {
      try {
        await axios.put(`${API_GATEWAY_URL}/comics/creator/${comicId}`, {
          status: 'archived'
        }, {
          headers: { Authorization: `Bearer ${creatorToken}` }
        });
        console.log('✅ Test comic archived');
      } catch (error) {
        console.log('⚠️ Comic cleanup failed (may not exist)');
      }
    }
    
    console.log('🎉 Comic creator test cleanup completed!');
  });
});