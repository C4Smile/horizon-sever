import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { MuseumRole } from "./museum-role.entity";

// dto
import { MuseumRoleDto } from "./dto/museum-role.dto";

@Injectable()
export class MuseumRoleAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, MuseumRole, MuseumRoleDto);
    };
  }
}
