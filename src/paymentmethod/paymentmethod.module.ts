import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { PaymentMethodController } from "./paymentmethod.controller";

// service
import { PaymentMethodService } from "./paymentmethod.service";

// entity
import { PaymentMethod } from "./paymentmethod.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
