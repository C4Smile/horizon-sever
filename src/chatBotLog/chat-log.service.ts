import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { ChatLog } from "./chat-log.entity";
import { MuseumUser } from "src/museumUser/museum-user.entity";

// dto
import { LogDto } from "./dto/log.dto";
import { MessageDto } from "./dto/message.dto";
import { BotAnswerDto, From } from "./dto/bot-answer.dto";

// config
import config from "src/config/configuration";

@Injectable()
export class ChatLogService extends CrudService<ChatLog, LogDto, LogDto> {
  constructor(
    @InjectRepository(ChatLog) chatLogService: Repository<ChatLog>,
    @InjectRepository(MuseumUser) private museumUserService: Repository<MuseumUser>,
    @InjectMapper() mapper: Mapper,
    private readonly httpService: HttpService,
  ) {
    super(chatLogService, mapper);
  }

  /**
   * @description Parse message
   * @param message - Message to parse
   * @returns MessageDto Parsed message
   */
  private messageParsing(message: MessageDto): BotAnswerDto {
    const parsedMessage: BotAnswerDto = { role: From.user, parts: [{ text: message.message }] };
    if (message.senderId === 0) parsedMessage.role = From.model;
    return parsedMessage;
  }

  async getBotId() {
    const botMuseumUser = await this.museumUserService.findOne({
      where: {
        username: "bot",
      },
    });

    return {
      id: botMuseumUser.id,
    };
  }

  async sendMessage(message: MessageDto): Promise<MessageDto> {
    const history = [];

    // save new message to history here
    const newEntity = this.entityService.create(message as any);
    await this.entityService.save(newEntity);

    // load history here

    const response = await this.httpService.axiosRef.post<BotAnswerDto[]>(
      config.chatbot.api,
      {
        tenantId: "hoteles",
        message,
        history,
      },
      {
        headers: {
          Authorization: `Bearer ${config.chatbot.token}`,
        },
      },
    );

    const { data } = response;

    if (data.length) {
      const last = data.pop();

      if (last) {
        const botMessage: MessageDto = {
          message: last.parts[0].text,
          senderId: 0,
          targetId: message.senderId,
          sentDate: new Date(),
          fromApp: message.fromApp,
        };

        // save bot message here
        const newEntity = this.entityService.create(botMessage as any);
        await this.entityService.save(newEntity);

        return botMessage;
      }
    }
  }
}
