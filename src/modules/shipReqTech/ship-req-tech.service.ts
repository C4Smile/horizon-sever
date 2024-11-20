import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { ShipReqTech } from "./entities/ship-req-tech.entity";

// dto
import { AddShipReqTechDto } from "./dto/add-ship-req-tech.dto";
import { UpdateShipReqTechDto } from "./dto/update-ship-req-tech.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class ShipReqTechService extends CrudManyService<
  ShipReqTech,
  AddShipReqTechDto,
  UpdateShipReqTechDto
> {
  constructor(@InjectRepository(ShipReqTech) private shipReqTechsService: Repository<ShipReqTech>) {
    const relationships = ["ship", "techReq"];
    super(shipReqTechsService, "shipId", "techReqId", relationships);
  }
}
