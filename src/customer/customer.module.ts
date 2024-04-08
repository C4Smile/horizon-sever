import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// module
import { CountryModule } from "src/country/country.module";

// controller
import { CustomerController } from "./customer.controller";

// service
import { CustomerService } from "./customer.service";

// entity
import { Customer } from "./customer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CountryModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
