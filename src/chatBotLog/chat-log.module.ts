import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ChatLogController } from "./chat-log.controller";

// service
import { ChatLogService } from "./chat-log.service";

// entities
import { ChatLog } from "./chat-log.entity";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [TypeOrmModule.forFeature([ChatLog]), HttpModule],
  controllers: [ChatLogController],
  providers: [ChatLogService],
  exports: [ChatLogService],
})
export class ChatLogModule {}
