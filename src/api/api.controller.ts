import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from "@nestjs/common";
import { ApiService } from "./api.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Request } from 'express';



@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('/view')
  @UseGuards(JwtAuthGuard) //token verification
  async viewGrocery() {
    return await this.apiService.fetchAllProducts();
  }

  @Post('/order')
  @UseGuards(JwtAuthGuard) //token verification
  async bookOrder(@Body() rawOrderData: any[], @Req() req: Request) {
    const userObj = req['user']  //was set in token middle ware
    console.log(userObj)
    console.log(rawOrderData)
    if (Array.isArray(rawOrderData)) {
        // rawOrderData.forEach((obj, index) => {
        //   console.log(`Object ${index + 1}:`, obj);
        // });
        const result = await this.apiService.createOrder(rawOrderData, userObj);
        return {"status":"order created successfully", "data" : result}
      }
      throw new HttpException("Invalid raw Json format",400)
  }
}
