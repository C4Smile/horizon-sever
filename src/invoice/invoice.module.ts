import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// module
import { CustomerModule } from "src/customer/customer.module";
import { CurrencyModule } from "src/currency/currency.module";
import { ReservationService } from "src/reservation/reservation.service";
import { PaymentMethodModule } from "src/paymentmethod/paymentmethod.module";

// controller
import { InvoiceController } from "./invoice.controller";

// service
import { InvoiceService } from "./invoice.service";

// entity
import { Invoice } from "./invoice.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    ReservationService,
    CustomerModule,
    CurrencyModule,
    PaymentMethodModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
