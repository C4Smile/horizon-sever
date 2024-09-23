import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";
import * as fs from "fs";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { ChatLog } from "./chat-log.entity";
import { MuseumUser } from "src/museumUser/museum-user.entity";

// config
import config from "src/config/configuration";

// dto
import { LogDto } from "./dto/log.dto";
import { MessageDto } from "./dto/message.dto";
import { BotAnswerDto, From, SavedInstructionDto } from "./dto/bot-answer.dto";
import { AddInstructionDto } from "./dto/add-instruction.dto";
import { UpdateInstructionDto } from "./dto/update-instruction.dto";

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
    const history = message.history ?? [];

    if (message.history) delete message.history;
    const bot = await this.getBotId();

    // save new message to history here
    const newEntity = this.entityService.create({ ...message, targetId: bot.id } as any);
    await this.entityService.save(newEntity);

    // load history here

    try {
      const response = await this.httpService.axiosRef.post<BotAnswerDto[]>(
        `${config.chatbot.api}ia-message/public-send`,
        {
          tenantId: "museo",
          message: message.message,
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
            senderId: bot.id,
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
    } catch (err) {
      throw new HttpException(String(err), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async loadContext() {
    try {
      const read = JSON.parse(fs.readFileSync("ia-instructions.json", "utf8")) as SavedInstructionDto;

      return [{ ...read }];
    } catch (err) {
      console.error(err);
      throw new HttpException(String(err), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateContext(data: UpdateInstructionDto) {
    try {
      await this.httpService.axiosRef.put<SavedInstructionDto>(
        `${config.chatbot.api}ia-instructions/${data.id}`,
        {
          data: { instructions: data.instructions },
        },
        {
          headers: {
            Authorization: `Bearer ${config.chatbot.token}`,
          },
        },
      );

      const read = JSON.parse(fs.readFileSync("ia-instructions.json", "utf8")) as SavedInstructionDto;
      read.instructions = data.instructions;
      fs.writeFileSync("ia-instructions.json", JSON.stringify(read));

      return { status: 200 };
    } catch (err) {
      throw new HttpException(String(err), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createContext(instruction: AddInstructionDto) {
    try {
      const response = await this.httpService.axiosRef.post<SavedInstructionDto>(
        `${config.chatbot.api}ia-instructions`,
        {
          ...instruction,
        },
        {
          headers: {
            Authorization: `Bearer ${config.chatbot.token}`,
          },
        },
      );

      const { data } = response;

      fs.writeFileSync("ia-instructions.json", JSON.stringify(data));

      return { status: 200 };
    } catch (err) {
      throw new HttpException(String(err), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
