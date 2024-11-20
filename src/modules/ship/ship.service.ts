import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Ship } from "./entities/ship.entity";

// dto
import { AddShipDto } from "./dto/add-ship.dto";
import { UpdateShipDto } from "./dto/update-ship.dto";

@Injectable()
export class ShipService extends CrudService<Ship, AddShipDto, UpdateShipDto> {
  constructor(@InjectRepository(Ship) shipService: Repository<Ship>) {
    const relationships = ["image"];
    super(shipService, relationships);
  }
}
