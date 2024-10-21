import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { HorizonRole } from "./horizon-role.entity";

// dto
import { AddHorizonRoleDto } from "./dto/add-horizon-role.dto";
import { UpdateHorizonRoleDto } from "./dto/update-horizon-role.dto";
import { Mapper } from "@automapper/core";

@Injectable()
export class HorizonRoleService extends CrudService<HorizonRole, AddHorizonRoleDto, UpdateHorizonRoleDto> {
  constructor(
    @InjectRepository(HorizonRole) private horizonRoleService: Repository<HorizonRole>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(horizonRoleService, mapper);
  }
}
