import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { HorizonRole } from "./horizon-role.entity";

// dto
import { HorizonRoleDto } from "./dto/horizon-role.dto";

@Injectable()
export class HorizonRoleAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, HorizonRole, HorizonRoleDto);
    };
  }
}
