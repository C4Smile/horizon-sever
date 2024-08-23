import { Body, Controller, Post, UseGuards } from "@nestjs/common";

// services
import { ChatLogService } from "./chat-log.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

// dto
import { LogDto } from "./dto/log.dto";

@Controller("chatBot")
export class ChatLogController {
  constructor(private chatLogService: ChatLogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async send(@Body() log: LogDto) {
    return await this.chatLogService.sendMessage(log.message);
  }
}
