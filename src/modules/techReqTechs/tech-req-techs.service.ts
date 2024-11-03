import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { TechReqTechs } from "./entities/tech-req-techs.entity";

// dto
import { AddTechReqTechsDto } from "./dto/add-tech-req-techs.dto";
import { UpdateTechReqTechsDto } from "./dto/update-tech-req-techs.dto";

@Injectable()
export class TechReqTechService {
  constructor(@InjectRepository(TechReqTechs) private techCostsService: Repository<TechReqTechs>) {}

  async getByTechId(techId: number) {
    const techCosts = this.techCostsService.find({
      where: {
        techId,
      },
      relations: ["resource"],
    });

    return techCosts;
  }

  async create(techId: number, adds: AddTechReqTechsDto[]) {
    const aSaved = [];
    for (const add of adds) {
      const newAdd = this.techCostsService.create({ ...add, techId });
      const saved = await this.techCostsService.save(newAdd);
      aSaved.push(saved);
    }

    return aSaved;
  }

  async remove(ids: number[]) {
    const result = await this.techCostsService.delete(ids);
    if (result.affected === 0) throw new HttpException("Tech ReqTech not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
