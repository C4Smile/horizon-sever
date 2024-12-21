import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Resource } from "./entities/resource.entity";
import { AddModelDto } from "../models/dto/add-model.dto";
import { UpdateModelDto } from "../models/dto/update-model.dto";

@Injectable()
export class ResourceService extends CrudService<Resource, AddModelDto, UpdateModelDto> {
  constructor(@InjectRepository(Resource) resourceService: Repository<Resource>) {
    const relationships = [""];
    super(resourceService, null, relationships);
  }

  async getByPlayerId(id: number) {
    const entityFound = await this.entityService.findOne({
      where: {
        playerId: id,
      },
      relations: this.relationships,
    });

    if (!entityFound) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);
    return entityFound;
  }
}
