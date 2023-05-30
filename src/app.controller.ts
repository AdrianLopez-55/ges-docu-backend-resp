import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req){
    return req.user;
  }



//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
}
