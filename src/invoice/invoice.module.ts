import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// module
import { CustomerModule } from "src/customer/customer.module";
import { CurrencyModule } from "src/currency/currency.module";
import { ReservationModule } from "src/reservation/reservation.module";
import { PaymentMethodModule } from "src/payment-method/payment-method.module";

// controller
import { InvoiceController } from "./invoice.controller";

// service
import { InvoiceService } from "./invoice.service";

// entity
import { Invoice } from "./invoice.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    ReservationModule,
    CustomerModule,
    CurrencyModule,
    PaymentMethodModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
