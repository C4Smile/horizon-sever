import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { TechType } from "./entities/tech-type.entity";

// dto
import { AddTechTypeDto } from "./dto/add-tech-type.dto";
import { UpdateTechTypeDto } from "./dto/update-tech-type.dto";

@Injectable()
export class TechTypeService extends CrudService<TechType, AddTechTypeDto, UpdateTechTypeDto> {
  constructor(@InjectRepository(TechType) techTypeService: Repository<TechType>) {
    const relationships = ["image"];
    super(techTypeService, relationships);
  }
}
