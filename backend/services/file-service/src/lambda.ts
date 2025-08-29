import serverless from 'serverless-http';
import app from './index.js';

// Export the serverless handler
export const handler = serverless(app);