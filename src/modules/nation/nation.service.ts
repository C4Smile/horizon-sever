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
    const relationships = ["image", "icon"];
    super(nationService, imageService, relationships, relationships);
  }
}
