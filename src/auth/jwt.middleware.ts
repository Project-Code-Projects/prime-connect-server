import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { EmployeeLoginService } from '../employee_login/employee_login.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService, private readonly loginService: EmployeeLoginService) {}

  async use(req: Request, res: Response, next: NextFunction) { 

    try {
        // console.log("req: ",req.rawHeaders[1]);
        // const authHeaders = req.rawHeaders[1];
        const authHeaders = req.headers["authorization"]; //doesn't work
        if (!authHeaders) return res.status(401).json({ message: "Unauthorized" });
        const token = authHeaders.split(" ")[1];
        // console.log("token: ",token);
    
        const data = this.jwtService.verify(token, { secret: "my_secret_key" });
        console.log("data: ",data);
    
        if (data && data.email) {
          const user = await this.loginService.findByEmail(data.email);
          // console.log("user: ",user);
          if (user) {
            req['user']  = user;
            next();
          } else return res.status(401).json({ message: "Unauthorized from user" });
        } else return res.status(401).json({ message: "Unauthorized" });
      } catch (error) {
        console.log(error);
        console.log("token doesn't found");
        res.status(500).json({ message: (error as Error).message });
      }
  }
}