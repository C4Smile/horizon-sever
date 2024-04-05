import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { InvoiceController } from "./invoice.controller";

// service
import { InvoiceService } from "./invoice.service";

// entity
import { Invoice } from "./invoice.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
