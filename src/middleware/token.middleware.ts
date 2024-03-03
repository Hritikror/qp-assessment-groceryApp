
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    private excludedRoutes: string[] = ['/user/signup', '/auth/login'];


  use(req: Request, res: Response, next: NextFunction) {
    const path = req.baseUrl.toLowerCase();

    // Check if the route is in the exclusion list
    if (this.excludedRoutes.some(route => path.includes(route))) {
        // Do not process the middleware for excluded routes
        next();
        return;
      }

    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
      const [bearer, token] = authorizationHeader.split(' ');

      // Store token details in the request object for Order creation
      req['user'] = { token };
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized. Token not present.' });
    }
  }
}