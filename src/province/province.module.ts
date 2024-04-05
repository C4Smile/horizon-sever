import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ProvinceController } from "./province.controller";

// service
import { ProvinceService } from "./province.service";

// entity
import { Province } from "./province.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}
