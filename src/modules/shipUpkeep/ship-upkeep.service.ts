import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { ShipUpkeep } from "./entities/ship-upkeep.entity";

// dto
import { AddShipUpkeepDto } from "./dto/add-ship-upkeep.dto";
import { UpdateShipUpkeepDto } from "./dto/update-ship-cost.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class ShipUpkeepService extends CrudManyService<
  ShipUpkeep,
  AddShipUpkeepDto,
  UpdateShipUpkeepDto
> {
  constructor(@InjectRepository(ShipUpkeep) shipUpkeepsService: Repository<ShipUpkeep>) {
    const relationships = ["ship", "resource"];
    super(shipUpkeepsService, "shipId", "resourceId", relationships);
  }
}
