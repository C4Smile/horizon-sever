import { Module } from '@nestjs/common';
import { PaymentmethodController } from './paymentmethod.controller';
import { PaymentmethodService } from './paymentmethod.service';

@Module({
  controllers: [PaymentmethodController],
  providers: [PaymentmethodService]
})
export class PaymentmethodModule {}
