import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Nation } from "./entities/nation.entity";
import { Photo } from "../image/image.entity";

// dto
import { AddNationDto } from "./dto/add-nation.dto";
import { UpdateNationDto } from "./dto/update-nation.dto";

@Injectable()
export class NationService extends CrudService<Nation, AddNationDto, UpdateNationDto> {
  constructor(
    @InjectRepository(Nation) nationService: Repository<Nation>,
    @InjectRepository(Photo) imageService: Repository<Photo>,
  ) {
    // no photo fields: a nation is a name, a description and whether it can
    // be picked
    super(nationService, imageService, [], []);
  }
}
