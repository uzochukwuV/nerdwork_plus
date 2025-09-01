import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import axios from 'axios';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3000';

describe('🔐 Auth Service Tests', () => {
  let testUserToken: string;
  let testUserId: string;
  
  const testUser = {
    email: `test-auth-${Date.now()}@nerdwork.com`,
    password: 'SecureTestPassword123!',
    username: `testuser${Date.now()}`
  };

  describe('User Registration Flow', () => {
    
    it('should register a new user successfully', async () => {
      const response = await axios.post(`${API_GATEWAY_URL}/auth/signup`, testUser);
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.data.user.email).toBe(testUser.email);
      expect(response.data.data.user.username).toBe(testUser.username);
      expect(response.data.data.token).toBeDefined();
      expect(response.data.data.user.password).toBeUndefined(); // Password should not be returned
      
      testUserToken = response.data.data.token;
      testUserId = response.data.data.user.id;
      
      console.log('✅ User registration successful');
    });

    it('should reject duplicate email registration', async () => {
      try {
        await axios.post(`${API_GATEWAY_URL}/auth/signup`, testUser);
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.success).toBe(false);
        expect(error.response.data.error).toContain('already exists');
      }
      
      console.log('✅ Duplicate email properly rejected');
    });

    it('should reject invalid email format', async () => {
      try {
        await axios.post(`${API_GATEWAY_URL}/auth/signup`, {
          ...testUser,
          email: 'invalid-email-format'
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Invalid email format properly rejected');
    });

    it('should reject weak passwords', async () => {
      try {
        await axios.post(`${API_GATEWAY_URL}/auth/signup`, {
          email: 'weakpass@test.com',
          username: 'weakpassuser',
          password: '123' // Too weak
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Weak password properly rejected');
    });
  });

  describe('User Login Flow', () => {
    
    it('should login user with correct credentials', async () => {
      const response = await axios.post(`${API_GATEWAY_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.user.email).toBe(testUser.email);
      expect(response.data.data.token).toBeDefined();
      expect(response.data.data.user.password).toBeUndefined();
      
      console.log('✅ User login successful');
    });

    it('should reject login with wrong password', async () => {
      try {
        await axios.post(`${API_GATEWAY_URL}/auth/login`, {
          email: testUser.email,
          password: 'WrongPassword123!'
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Wrong password properly rejected');
    });

    it('should reject login with non-existent email', async () => {
      try {
        await axios.post(`${API_GATEWAY_URL}/auth/login`, {
          email: 'nonexistent@nerdwork.com',
          password: testUser.password
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Non-existent user properly rejected');
    });
  });

  describe('Token Validation Flow', () => {
    
    it('should get current user with valid token', async () => {
      const response = await axios.get(`${API_GATEWAY_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${testUserToken}` }
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data.user.id).toBe(testUserId);
      expect(response.data.data.user.email).toBe(testUser.email);
      
      console.log('✅ Token validation successful');
    });

    it('should reject invalid token', async () => {
      try {
        await axios.get(`${API_GATEWAY_URL}/auth/me`, {
          headers: { Authorization: 'Bearer invalid_token_here' }
        });
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Invalid token properly rejected');
    });

    it('should reject missing authorization header', async () => {
      try {
        await axios.get(`${API_GATEWAY_URL}/auth/me`);
        throw new Error('Should have failed');
      } catch (error: any) {
        expect(error.response.status).toBe(401);
        expect(error.response.data.success).toBe(false);
      }
      
      console.log('✅ Missing auth header properly rejected');
    });
  });

  describe('Password Reset Flow', () => {
    
    it('should initiate password reset for valid email', async () => {
      const response = await axios.post(`${API_GATEWAY_URL}/auth/forgot-password`, {
        email: testUser.email
      });
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.message).toContain('reset');
      
      console.log('✅ Password reset initiated');
    });

    it('should handle password reset for non-existent email gracefully', async () => {
      const response = await axios.post(`${API_GATEWAY_URL}/auth/forgot-password`, {
        email: 'nonexistent@nerdwork.com'
      });
      
      // Should return success for security reasons (don't reveal if email exists)
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      
      console.log('✅ Non-existent email reset handled gracefully');
    });
  });

  describe('Service Health & Performance', () => {
    
    it('should respond to health check', async () => {
      const response = await axios.get(`${AUTH_SERVICE_URL}/health`);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.service).toBe('auth-service');
      
      console.log('✅ Auth service health check passed');
    });

    it('should handle multiple concurrent requests', async () => {
      const promises = Array.from({ length: 5 }, (_, i) =>
        axios.post(`${API_GATEWAY_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        })
      );
      
      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
      });
      
      console.log('✅ Concurrent request handling successful');
    });

    it('should maintain reasonable response times', async () => {
      const startTime = Date.now();
      
      await axios.post(`${API_GATEWAY_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(2000); // Should respond within 2 seconds
      
      console.log(`✅ Response time: ${responseTime}ms (acceptable)`);
    });
  });

  describe('Security Tests', () => {
    
    it('should not expose sensitive information in responses', async () => {
      const response = await axios.post(`${API_GATEWAY_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      
      expect(response.data.data.user.password).toBeUndefined();
      expect(response.data.data.user.passwordHash).toBeUndefined();
      expect(response.data.data.user.salt).toBeUndefined();
      
      console.log('✅ Sensitive information properly hidden');
    });

    it('should handle SQL injection attempts safely', async () => {
      try {
        await axios.post(`${API_GATEWAY_URL}/auth/login`, {
          email: "test@test.com'; DROP TABLE auth_users; --",
          password: testUser.password
        });
      } catch (error: any) {
        expect(error.response.status).toBe(401);
      }
      
      // Service should still be healthy after injection attempt
      const healthResponse = await axios.get(`${AUTH_SERVICE_URL}/health`);
      expect(healthResponse.status).toBe(200);
      
      console.log('✅ SQL injection attempt handled safely');
    });

    it('should implement rate limiting', async () => {
      // Attempt multiple rapid login requests
      const rapidRequests = Array.from({ length: 20 }, () =>
        axios.post(`${API_GATEWAY_URL}/auth/login`, {
          email: 'nonexistent@test.com',
          password: 'wrongpassword'
        }).catch(error => error.response)
      );
      
      const responses = await Promise.all(rapidRequests);
      
      // Some requests should be rate limited (429 status)
      const rateLimitedResponses = responses.filter(r => r?.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
      
      console.log(`✅ Rate limiting active (${rateLimitedResponses.length}/20 requests rate limited)`);
    });
  });
});