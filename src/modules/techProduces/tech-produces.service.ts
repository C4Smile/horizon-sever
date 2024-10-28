import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { TechProduces } from "./entities/tech-produces.entity";

// dto
import { AddTechProducesDto } from "./dto/add-tech-produces.dto";
import { UpdateTechProducesDto } from "./dto/update-tech-produces.dto";
import { TechCosts } from "../techCosts/entities/tech-costs.entity";

@Injectable()
export class TechProducesService {
  constructor(@InjectRepository(TechProduces) private techCostsService: Repository<TechProduces>) {}

  async getByTechId(techId: number) {
    const techCosts = this.techCostsService.find({
      where: {
        techId,
      },
      relations: ["resource"],
    });

    return techCosts;
  }

  async create(techId: number, adds: AddTechProducesDto[]) {
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
    if (result.affected === 0) throw new HttpException("Tech Produces not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
