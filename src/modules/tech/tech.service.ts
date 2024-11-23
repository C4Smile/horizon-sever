import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Tech } from "./entities/tech.entity";
import { Photo } from "../image/image.entity";

// dto
import { AddTechDto } from "./dto/add-tech.dto";
import { UpdateTechDto } from "./dto/update-tech.dto";

@Injectable()
export class TechService extends CrudService<Tech, AddTechDto, UpdateTechDto> {
  constructor(
    @InjectRepository(Tech) techService: Repository<Tech>,
    @InjectRepository(Photo) imageService: Repository<Photo>,
  ) {
    const relationships = [
      "image",
      "type",
      "produces",
      "costs",
      "techRequirements",
      "buildingRequirements",
    ];
    super(techService, imageService, relationships);
  }
}
