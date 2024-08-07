import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { Tag } from "./tag.entity";

// dto
import { TagDto } from "./dto/tag.dto";
import { AddTagDto } from "./dto/add-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { ClientTagDto } from "./dto/client-tag.dto";

@Injectable()
export class TagService extends CrudService<Tag, TagDto, AddTagDto, UpdateTagDto> {
  constructor(@InjectRepository(Tag) tagService: Repository<Tag>, @InjectMapper() mapper: Mapper) {
    super(tagService, mapper);
  }

  async headers() {
    const list = await this.entityService.find({
      order: {
        lastUpdate: "DESC",
      },
    });

    return this.mapper.mapArrayAsync(list, Tag, ClientTagDto);
  }
}
