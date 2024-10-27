import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Tech } from "./entities/tech.entity";

// dto
import { AddTechDto } from "./dto/add-tech.dto";
import { UpdateTechDto } from "./dto/update-tech.dto";

@Injectable()
export class TechService extends CrudService<Tech, AddTechDto, UpdateTechDto> {
  constructor(@InjectRepository(Tech) techService: Repository<Tech>) {
    const relationships = ["image", "type"];
    super(techService, relationships);
  }
}
