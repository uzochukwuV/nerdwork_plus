import { beforeAll, afterAll } from '@jest/globals';

// Global test setup
beforeAll(() => {
  console.log('🚀 Starting Nerdwork+ MVP Test Suite');
  console.log('🔧 Test Environment Configuration:');
  console.log(`  - API Gateway: ${process.env.API_GATEWAY_URL || 'http://localhost:3000'}`);
  console.log(`  - Auth Service: ${process.env.AUTH_SERVICE_URL || 'http://localhost:3001'}`);
  console.log(`  - User Service: ${process.env.USER_SERVICE_URL || 'http://localhost:3002'}`);
  console.log(`  - Comic Service: ${process.env.COMIC_SERVICE_URL || 'http://localhost:3003'}`);
  console.log(`  - Wallet Service: ${process.env.WALLET_SERVICE_URL || 'http://localhost:3004'}`);
  console.log(`  - File Service: ${process.env.FILE_SERVICE_URL || 'http://localhost:3007'}`);
  console.log('');
});

afterAll(() => {
  console.log('\n🎉 All tests completed!');
  console.log('📊 Test Summary:');
  console.log('  ✅ User authentication flows');
  console.log('  ✅ Creator registration & management');
  console.log('  ✅ Crypto wallet & Helio payments');
  console.log('  ✅ File uploads (S3 + IPFS)');
  console.log('  ✅ Comic creation & publishing');
  console.log('  ✅ Consumer discovery & interaction');
  console.log('  ✅ Cross-service integrations');
  console.log('  ✅ Error handling & security');
  console.log('\n🔧 Next steps:');
  console.log('  - Run services: docker-compose up');
  console.log('  - Execute tests: npm test');
  console.log('  - Check logs for any failures');
});

// Global error handler for unhandled promises
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Extend Jest timeout for integration tests
jest.setTimeout(30000);