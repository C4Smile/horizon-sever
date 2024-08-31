import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ChatLogController } from "./chat-log.controller";

// service
import { ChatLogService } from "./chat-log.service";

// entities
import { ChatLog } from "./chat-log.entity";
import { MuseumUser } from "src/museumUser/museum-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChatLog, MuseumUser]), HttpModule],
  controllers: [ChatLogController],
  providers: [ChatLogService],
  exports: [ChatLogService],
})
export class ChatLogModule {}
