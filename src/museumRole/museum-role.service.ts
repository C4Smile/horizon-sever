import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { MuseumRole } from "./museum-role.entity";

// dto
import { AddMuseumRoleDto } from "./dto/add-museum-role.dto";
import { UpdateMuseumRoleDto } from "./dto/update-museum-role.dto";
import { Mapper } from "@automapper/core";

@Injectable()
export class MuseumRoleService extends CrudService<MuseumRole, AddMuseumRoleDto, UpdateMuseumRoleDto> {
  constructor(
    @InjectRepository(MuseumRole) private museumRoleService: Repository<MuseumRole>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(museumRoleService, mapper);
  }
}
