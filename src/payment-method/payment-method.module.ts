import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { PaymentMethodController } from "./payment-method.controller";

// service
import { PaymentMethodService } from "./payment-method.service";

// entity
import { PaymentMethod } from "./payment-method.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
