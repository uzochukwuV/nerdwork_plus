import serverless from 'serverless-http';
import { app } from './index.js';

export const handler = serverless(app, {
  request: (request: any, event: any, context: any) => {
    console.log('Wallet Service Request:', {
      method: request.method,
      path: request.path,
      headers: request.headers,
    });
  },
  response: (response: any, request: any, event: any, context: any) => {
    console.log('Wallet Service Response:', {
      statusCode: response.statusCode,
      headers: response.headers,
    });
  },
});