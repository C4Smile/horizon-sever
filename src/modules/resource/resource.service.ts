import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Resource } from "./entities/resource.entity";

// dto
import { AddResourceDto } from "./dto/add-resource.dto";
import { UpdateResourceDto } from "./dto/update-resource.dto";

@Injectable()
export class ResourceService extends CrudService<Resource, AddResourceDto, UpdateResourceDto> {
  constructor(@InjectRepository(Resource) resourceService: Repository<Resource>) {
    const relationships = ["image"];
    super(resourceService, relationships);
  }
}
