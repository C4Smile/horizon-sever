import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { ExternalLink } from "./external-link.entity";

// dto
import { AddExternalLinkDto } from "./dto/add-external-link.dto";
import { UpdateModelDto } from "src/models/dto/update-model.dto";

@Injectable()
export class ExternalLinkService extends CrudService<ExternalLink, AddExternalLinkDto, UpdateModelDto> {
  constructor(
    @InjectRepository(ExternalLink) private externalLinkService: Repository<ExternalLink>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(externalLinkService, mapper);
  }
}
