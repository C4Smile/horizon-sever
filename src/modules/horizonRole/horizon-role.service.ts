import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { HorizonRole } from "./entities/horizon-role.entity";

// dto
import { AddHorizonRoleDto } from "./dto/add-horizon-role.dto";
import { UpdateHorizonRoleDto } from "./dto/update-horizon-role.dto";

@Injectable()
export class HorizonRoleService extends CrudService<
  HorizonRole,
  AddHorizonRoleDto,
  UpdateHorizonRoleDto
> {
  constructor(@InjectRepository(HorizonRole) private horizonRoleService: Repository<HorizonRole>) {
    super(horizonRoleService);
  }
}
