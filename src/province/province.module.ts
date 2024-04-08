import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// module
import { CountryModule } from "src/country/country.module";

// controller
import { ProvinceController } from "./province.controller";

// service
import { ProvinceService } from "./province.service";

// entity
import { Province } from "./province.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Province]), CountryModule],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports: [ProvinceService],
})
export class ProvinceModule {}
