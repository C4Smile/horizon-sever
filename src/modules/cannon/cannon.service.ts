import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Cannon } from "./entities/cannon.entity";

// dto
import { AddCannonDto } from "./dto/add-cannon.dto";
import { UpdateCannonDto } from "./dto/update-cannon.dto";

@Injectable()
export class CannonService extends CrudService<Cannon, AddCannonDto, UpdateCannonDto> {
  constructor(@InjectRepository(Cannon) cannonService: Repository<Cannon>) {
    const relationships = ["image"];
    super(cannonService, relationships);
  }
}
