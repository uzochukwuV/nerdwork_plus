import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

export const setupMiddleware = (app: any) => {
  // Security middleware
  app.use(helmet());
  
  // CORS configuration
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  }));
  
  // Compression
  app.use(compression());
  
  // Logging
  app.use(morgan('combined'));
  
  // Parse JSON bodies
  app.use('/api', (req: any, res: any, next: any) => {
    // Skip JSON parsing for file uploads
    if (req.path.includes('/upload') && req.method === 'POST') {
      return next();
    }
    return require('express').json({ limit: '10mb' })(req, res, next);
  });
  
  // Parse URL-encoded bodies
  app.use('/api', require('express').urlencoded({ extended: true, limit: '10mb' }));
};