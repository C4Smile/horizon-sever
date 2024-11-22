import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { CannonReqTech } from "./entities/cannon-req-tech.entity";

// dto
import { AddCannonReqTechDto } from "./dto/add-cannon-req-tech.dto";
import { UpdateCannonReqTechDto } from "./dto/update-cannon-req-tech.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class CannonReqTechService extends CrudManyService<
  CannonReqTech,
  AddCannonReqTechDto,
  UpdateCannonReqTechDto
> {
  constructor(@InjectRepository(CannonReqTech) private shipReqTechsService: Repository<CannonReqTech>) {
    const relationships = ["ship", "techReq"];
    super(shipReqTechsService, "shipId", "techReqId", relationships);
  }
}
