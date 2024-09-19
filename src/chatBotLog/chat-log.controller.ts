import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

// services
import { ChatLogService } from "./chat-log.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

// dto
import { LogDto } from "./dto/log.dto";
import { UpdateInstructionDto } from "./dto/update-instruction.dto";
import { AddInstructionDto } from "./dto/add-instruction.dto";

@Controller("chatBot")
export class ChatLogController {
  constructor(private chatLogService: ChatLogService) {}

  @UseGuards(JwtAuthGuard)
  @Get("context")
  async loadContext() {
    return await this.chatLogService.loadContext();
  }

  @UseGuards(JwtAuthGuard)
  @Get("update")
  async updateContext(@Body() instructions: UpdateInstructionDto) {
    return await this.chatLogService.updateContext(instructions);
  }

  @UseGuards(JwtAuthGuard)
  @Get("create")
  async createContext(@Body() instructions: AddInstructionDto) {
    return await this.chatLogService.createContext(instructions);
  }

  @Get("botId")
  async botId() {
    return await this.chatLogService.getBotId();
  }

  @UseGuards(JwtAuthGuard)
  @Post("send")
  async send(@Body() log: LogDto) {
    return await this.chatLogService.sendMessage(log.message);
  }
}
