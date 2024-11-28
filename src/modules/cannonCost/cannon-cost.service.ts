import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { CannonCost } from "./entities/cannon-cost.entity";

// dto
import { AddCannonCostDto } from "./dto/add-cannon-cost.dto";
import { UpdateCannonCostDto } from "./dto/update-cannon-cost.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class CannonCostService extends CrudManyService<
  CannonCost,
  AddCannonCostDto,
  UpdateCannonCostDto
> {
  constructor(@InjectRepository(CannonCost) cannonCostsService: Repository<CannonCost>) {
    const relationships = ["cannon", "resource"];
    super(cannonCostsService, "cannonId", "resourceId", relationships);
  }
}
