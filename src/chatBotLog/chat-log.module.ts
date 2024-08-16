import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ChatLogController } from "./chat-log.controller";

// service
import { ChatLogService } from "./chat-log.service";

// entities
import { ChatLog } from "./chat-log.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChatLog])],
  controllers: [ChatLogController],
  providers: [ChatLogService],
  exports: [ChatLogService],
})
export class ChatLogModule {}
