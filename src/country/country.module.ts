import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { CountryController } from "./country.controller";

// service
import { CountryService } from "./country.service";

// entities
import { Country } from "./country.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
