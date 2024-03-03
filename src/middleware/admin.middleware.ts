// admin.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
  
    const authorizationHeader = req.headers['authorization'];
    
    const [bearer, token] = authorizationHeader.split(' ');
  
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken['isAdmin'])
    if (decodedToken['isAdmin']) {
      
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden. Admin privileges required.' });
    }
  }
}