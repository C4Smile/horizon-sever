import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { ChatLog } from "./chat-log.entity";

// dto
import { LogDto } from "./dto/log.dto";

@Injectable()
export class ChatLogService extends CrudService<ChatLog, LogDto, LogDto> {
  constructor(
    @InjectRepository(ChatLog) chatLogService: Repository<ChatLog>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(chatLogService, mapper);
  }
}
