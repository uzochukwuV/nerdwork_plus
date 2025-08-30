import jwt from 'jsonwebtoken';

export const authenticate = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Access token required',
        timestamp: new Date().toISOString()
      });
    }

    const token = authHeader.substring(7);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;
    
    req.userId = decoded.userId || decoded.id;
    req.user = decoded;
    
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      error: 'Invalid access token',
      timestamp: new Date().toISOString()
    });
  }
};