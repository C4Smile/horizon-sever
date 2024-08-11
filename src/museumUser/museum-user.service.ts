import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { MuseumUser } from "./museum-user.entity";

// utils
import { QueryFilter, PagedResult } from "src/models/types";

// dto
import { MuseumUserDto } from "./dto/museum-user.dto";
import { AddMuseumUserDto } from "./dto/add-museum-user.dto";
import { UpdateMuseumUserDto } from "./dto/update-museum-user.dto";

@Injectable()
export class MuseumUserService extends CrudService<MuseumUser, AddMuseumUserDto, UpdateMuseumUserDto> {
  constructor(
    @InjectRepository(MuseumUser) museumUserService: Repository<MuseumUser>,
    @InjectMapper() mapper: Mapper,
  ) {
    const relationships = ["user", "role"];
    super(museumUserService, mapper, relationships);
  }

  mappedGet = async (query: QueryFilter): Promise<PagedResult<MuseumUserDto>> => {
    const result = await this.get(query);
    const mappedItems = await this.mapper.mapArrayAsync(result.items, MuseumUser, MuseumUserDto);
    return {
      items: mappedItems,
      total: result.total,
    };
  };

  async getByUserId(userId: number) {
    const museumUserFound = await this.entityService.findOne({
      where: {
        userId,
      },
    });

    if (!museumUserFound) throw new HttpException("MuseumUser not Found", HttpStatus.NOT_FOUND);

    return museumUserFound;
  }
}
