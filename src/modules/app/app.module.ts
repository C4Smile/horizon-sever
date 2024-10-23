import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { AppController } from "./app.controller";

// service
import { AppService } from "./app.service";

// entities
import { App } from "./entities/app.entity";

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppsModule {}
