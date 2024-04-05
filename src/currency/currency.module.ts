import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { CurrencyController } from "./currency.controller";

// service
import { CurrencyService } from "./currency.service";

// service
import { Currency } from "./currency.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
