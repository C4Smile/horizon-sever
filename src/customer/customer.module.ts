import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { CustomerController } from "./customer.controller";

// service
import { CustomerService } from "./customer.service";

// entity
import { Customer } from "./customer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
