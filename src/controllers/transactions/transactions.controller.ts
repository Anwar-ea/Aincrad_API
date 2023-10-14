import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ZitopayService } from '../../common/services/zitopay/zitopay.service';


@Controller('transactions')
export class TransactionsController {
  constructor(private readonly zitopayService:ZitopayService) {}



  @Get('zitopayDeposite')
  findAll(@Query('amount', ParseIntPipe) amount: number) {
    return this.zitopayService.acceptPaymentApi(amount);
  }

  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionsService.remove(+id);
  // }
}
