import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { AppTextController } from "./app-text.controller";

// service
import { AppTextService } from "./app-text.service";

// entities
import { AppText } from "./app-text.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AppText])],
  controllers: [AppTextController],
  providers: [AppTextService],
  exports: [AppTextService],
})
export class AppTextModule {}
