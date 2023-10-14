import { Body, Controller, Get, Param, Post, Request, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/notify')
  getref(ref:any): void {
    // return this.appService.getHello();
    console.log('req');
    
    
  }

}
