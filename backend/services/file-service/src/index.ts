import express from 'express';
import dotenv from 'dotenv';
import { setupMiddleware } from './middleware/common.js';
import fileRoutes from './routes/file.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;

// Setup middleware
setupMiddleware(app);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'File service is healthy',
    service: 'file-service',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/files', fileRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Unhandled error:', error);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size too large',
      timestamp: new Date().toISOString()
    });
  }
  
  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      error: 'Unexpected file field',
      timestamp: new Date().toISOString()
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`File service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;