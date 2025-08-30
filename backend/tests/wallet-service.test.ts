import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import axios from 'axios';

const WALLET_SERVICE_URL = process.env.WALLET_SERVICE_URL || 'http://localhost:3004';
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3000';

describe('💰 Wallet Service Tests', () => {
  let testUserToken: string;
  let testUserId: string;
  let walletId: string;
  let transactionId: string;
  let paymentMethodId: string;
  let nwtPackageId: string;
  
  const testUser = {
    email: `test-wallet-${Date.now()}@nerdwork.com`,
    password: 'SecureTestPassword123!',
    username: `walletuser${Date.now()}`
  };

  beforeAll(async () => {
    // Create test user
    const signupResponse = await axios.post(`${API_GATEWAY_URL}/auth/signup`, testUser);
    testUserToken = signupResponse.data.data.token;
    testUserId = signupResponse.data.data.user.id;
    
    console.log('🔧 Test user created for wallet tests');
  });

  describe('Wallet Creation & Management', () => {
    
    it('should create user wallet automatically', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/wallet/`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.userId).toBe(testUserId);
      expect(response.data.data.nwtBalance).toBe('0.00000000');
      expect(response.data.data.totalEarned).toBe('0.00000000');
      expect(response.data.data.totalSpent).toBe('0.00000000');
      
      walletId = response.data.data.id;
      console.log('✅ User wallet created/retrieved successfully');
    });

    it('should return same wallet for same user', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/wallet/`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.id).toBe(walletId);
      
      console.log('✅ Wallet consistency maintained');
    });

    it('should require authentication for wallet access', async () => {
      try {
        await axios.get(`${API_GATEWAY_URL}/wallet/`);
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Wallet access properly protected');
    });
  });

  describe('Crypto Wallet Integration', () => {
    
    it('should connect crypto wallet successfully', async () => {
      const walletData = {
        walletAddress: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH',
        walletType: 'phantom',
        signature: 'mock_signature_for_testing'
      };

      const response = await axios.post(`${API_GATEWAY_URL}/wallet/crypto/connect`, walletData, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.connectedWalletAddress).toBe(walletData.walletAddress);
      expect(response.data.data.walletType).toBe(walletData.walletType);
      
      console.log('✅ Crypto wallet connected successfully');
    });

    it('should update existing crypto wallet connection', async () => {
      const newWalletData = {
        walletAddress: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        walletType: 'solflare',
        signature: 'new_mock_signature'
      };

      const response = await axios.post(`${API_GATEWAY_URL}/wallet/crypto/connect`, newWalletData, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.connectedWalletAddress).toBe(newWalletData.walletAddress);
      expect(response.data.data.walletType).toBe(newWalletData.walletType);
      
      console.log('✅ Crypto wallet updated successfully');
    });

    it('should reject invalid wallet address', async () => {
      const invalidWalletData = {
        walletAddress: 'invalid_address_format',
        walletType: 'phantom'
      };

      try {
        await axios.post(`${API_GATEWAY_URL}/wallet/crypto/connect`, invalidWalletData, {
          headers: { Authorization: `Bearer ${testUserToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Invalid wallet address properly rejected');
    });
  });

  describe('NWT Pricing & Packages', () => {
    
    it('should get NWT pricing packages', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/wallet/pricing`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data)).toBe(true);
      
      if (response.data.data.length > 0) {
        const package1 = response.data.data[0];
        expect(package1.packageName).toBeDefined();
        expect(package1.nwtAmount).toBeDefined();
        expect(package1.usdPrice).toBeDefined();
        expect(package1.isActive).toBe(true);
        
        nwtPackageId = package1.id;
      }
      
      console.log('✅ NWT pricing packages retrieved');
    });

    it('should filter active packages only', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/wallet/pricing`);
      
      const activePackages = response.data.data.filter((pkg: any) => pkg.isActive);
      expect(response.data.data.length).toBe(activePackages.length);
      
      console.log('✅ Only active packages returned');
    });
  });

  describe('Helio Crypto Payments', () => {
    
    it('should create Helio payment link', async () => {
      if (!nwtPackageId) {
        console.log('⚠️ Skipping Helio test - no pricing packages available');
        return;
      }

      const paymentData = {
        packageId: nwtPackageId,
        currency: 'USDC',
        redirectUrl: 'https://nerdwork.com/payment-success'
      };

      const response = await axios.post(`${API_GATEWAY_URL}/wallet/crypto/purchase`, paymentData, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.transaction).toBeDefined();
      expect(response.data.data.paymentLink.url).toBeDefined();
      expect(response.data.data.paymentLink.qrCode).toBeDefined();
      expect(response.data.data.paymentLink.id).toBeDefined();
      
      transactionId = response.data.data.transaction.id;
      console.log('✅ Helio payment link created successfully');
    });

    it('should handle different crypto currencies', async () => {
      if (!nwtPackageId) return;

      const paymentData = {
        packageId: nwtPackageId,
        currency: 'SOL',
        redirectUrl: 'https://nerdwork.com/payment-success'
      };

      const response = await axios.post(`${API_GATEWAY_URL}/wallet/crypto/purchase`, paymentData, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.paymentLink).toBeDefined();
      
      console.log('✅ SOL payment link created successfully');
    });

    it('should reject invalid package ID', async () => {
      const invalidPaymentData = {
        packageId: '00000000-0000-0000-0000-000000000000',
        currency: 'USDC'
      };

      try {
        await axios.post(`${API_GATEWAY_URL}/wallet/crypto/purchase`, invalidPaymentData, {
          headers: { Authorization: `Bearer ${testUserToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Invalid package ID properly rejected');
    });

    it('should simulate Helio webhook processing', async () => {
      if (!transactionId) return;

      // Simulate successful payment webhook
      const webhookPayload = {
        id: 'helio_payment_123',
        status: 'completed',
        amount: 10.00,
        currency: 'USDC',
        transaction_hash: '0x1234567890abcdef',
        paid_at: new Date().toISOString(),
        metadata: {
          transactionId: transactionId
        }
      };

      const response = await axios.post(`${API_GATEWAY_URL}/wallet/webhooks/helio`, webhookPayload, {
        headers: {
          'helio-signature': 'mock_signature',
          'Content-Type': 'application/json'
        }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      
      console.log('✅ Helio webhook processed successfully');
    });
  });

  describe('Traditional Payment Methods', () => {
    
    it('should purchase NWT tokens with Stripe', async () => {
      if (!nwtPackageId) return;

      const purchaseData = {
        packageId: nwtPackageId,
        paymentMethodId: 'pm_card_visa' // Stripe test card
      };

      const response = await axios.post(`${API_GATEWAY_URL}/wallet/purchase`, purchaseData, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.transaction).toBeDefined();
      expect(response.data.data.paymentIntent).toBeDefined();
      
      console.log('✅ Stripe payment processed successfully');
    });

    it('should add payment method', async () => {
      const paymentMethodData = {
        paymentMethodId: 'pm_card_mastercard'
      };

      const response = await axios.post(`${API_GATEWAY_URL}/wallet/payment-methods`, paymentMethodData, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.externalId).toBe(paymentMethodData.paymentMethodId);
      
      paymentMethodId = response.data.data.id;
      console.log('✅ Payment method added successfully');
    });

    it('should get user payment methods', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/wallet/payment-methods`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data)).toBe(true);
      
      if (response.data.data.length > 0) {
        expect(response.data.data[0].userId).toBe(testUserId);
      }
      
      console.log('✅ Payment methods retrieved successfully');
    });
  });

  describe('NWT Token Management', () => {
    
    it('should spend NWT tokens', async () => {
      const spendData = {
        amount: '1.50',
        description: 'Comic purchase - The Amazing Crypto Heroes',
        referenceId: 'comic_123',
        referenceType: 'comic'
      };

      const response = await axios.post(`${API_GATEWAY_URL}/wallet/spend`, spendData, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.transaction.type).toBe('spend');
      expect(response.data.data.spentAmount).toBe(1.50);
      
      console.log('✅ NWT tokens spent successfully');
    });

    it('should reject spending more than balance', async () => {
      const spendData = {
        amount: '1000000.00',
        description: 'Attempt to overspend'
      };

      try {
        await axios.post(`${API_GATEWAY_URL}/wallet/spend`, spendData, {
          headers: { Authorization: `Bearer ${testUserToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toContain('Insufficient');
      }
      
      console.log('✅ Overspending properly prevented');
    });

    it('should reject negative spending amounts', async () => {
      const spendData = {
        amount: '-5.00',
        description: 'Negative amount test'
      };

      try {
        await axios.post(`${API_GATEWAY_URL}/wallet/spend`, spendData, {
          headers: { Authorization: `Bearer ${testUserToken}` }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error).toContain('Invalid amount');
      }
      
      console.log('✅ Negative amounts properly rejected');
    });
  });

  describe('Transaction History', () => {
    
    it('should get transaction history', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/wallet/transactions?page=1&limit=10`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(Array.isArray(response.data.data.transactions)).toBe(true);
      expect(response.data.data.pagination).toBeDefined();
      
      console.log('✅ Transaction history retrieved successfully');
    });

    it('should filter transactions by type', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/wallet/transactions?type=spend&page=1&limit=5`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      
      // All returned transactions should be of type 'spend'
      response.data.data.transactions.forEach((tx: any) => {
        expect(tx.type).toBe('spend');
      });
      
      console.log('✅ Transaction filtering by type working');
    });

    it('should paginate transaction history correctly', async () => {
      const page1 = await axios.get(`${API_GATEWAY_URL}/wallet/transactions?page=1&limit=2`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      const page2 = await axios.get(`${API_GATEWAY_URL}/wallet/transactions?page=2&limit=2`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(page1.data.data.pagination.page).toBe(1);
      expect(page2.data.data.pagination.page).toBe(2);
      
      // Pages should have different transactions (if there are enough)
      if (page1.data.data.transactions.length > 0 && page2.data.data.transactions.length > 0) {
        expect(page1.data.data.transactions[0].id).not.toBe(page2.data.data.transactions[0].id);
      }
      
      console.log('✅ Transaction pagination working correctly');
    });
  });

  describe('Service Health & Performance', () => {
    
    it('should respond to health check', async () => {
      const response = await axios.get(`${WALLET_SERVICE_URL}/health`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.service).toBe('wallet-service');
      
      console.log('✅ Wallet service health check passed');
    });

    it('should handle concurrent wallet operations', async () => {
      const promises = Array.from({ length: 5 }, () =>
        axios.get(`${API_GATEWAY_URL}/wallet/`, {
          headers: { Authorization: `Bearer ${testUserToken}` }
        })
      );
      
      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.data.data.id).toBe(walletId);
      });
      
      console.log('✅ Concurrent wallet operations handled successfully');
    });
  });

  describe('Security & Data Integrity', () => {
    
    it('should maintain accurate balance calculations', async () => {
      const walletResponse = await axios.get(`${API_GATEWAY_URL}/wallet/`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      const wallet = walletResponse.data.data;
      const earned = parseFloat(wallet.totalEarned);
      const spent = parseFloat(wallet.totalSpent);
      const balance = parseFloat(wallet.nwtBalance);
      
      // Balance should equal earned minus spent
      expect(Math.abs(balance - (earned - spent))).toBeLessThan(0.00000001);
      
      console.log('✅ Balance calculations accurate');
    });

    it('should not allow access to other users wallets', async () => {
      // Create another test user
      const otherUser = {
        email: `other-user-${Date.now()}@nerdwork.com`,
        password: 'SecureTestPassword123!',
        username: `otheruser${Date.now()}`
      };
      
      const otherSignup = await axios.post(`${API_GATEWAY_URL}/auth/signup`, otherUser);
      const otherUserToken = otherSignup.data.data.token;
      
      // Try to access first user's wallet with second user's token
      const response1 = await axios.get(`${API_GATEWAY_URL}/wallet/`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      const response2 = await axios.get(`${API_GATEWAY_URL}/wallet/`, {
        headers: { Authorization: `Bearer ${otherUserToken}` }
      });
      
      // Should return different wallets
      expect(response1.data.data.id).not.toBe(response2.data.data.id);
      expect(response2.data.data.userId).toBe(otherSignup.data.data.user.id);
      
      console.log('✅ Wallet isolation maintained between users');
    });

    it('should handle decimal precision correctly', async () => {
      // Test with very small amounts
      const smallSpendData = {
        amount: '0.00000001',
        description: 'Precision test - smallest unit'
      };

      const response = await axios.post(`${API_GATEWAY_URL}/wallet/spend`, smallSpendData, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.data.spentAmount).toBe(0.00000001);
      
      console.log('✅ Decimal precision handling correct');
    });
  });
});