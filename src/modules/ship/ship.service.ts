import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Ship } from "./entities/ship.entity";
import { Photo } from "../image/image.entity";

// dto
import { AddShipDto } from "./dto/add-ship.dto";
import { UpdateShipDto } from "./dto/update-ship.dto";

@Injectable()
export class ShipService extends CrudService<Ship, AddShipDto, UpdateShipDto> {
  constructor(
    @InjectRepository(Ship) shipService: Repository<Ship>,
    @InjectRepository(Photo) imageService: Repository<Photo>,
  ) {
    const relationships = ["image"];
    super(shipService, imageService, relationships);
  }
}
