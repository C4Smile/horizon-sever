import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { TechCosts } from "./entities/tech-costs.entity";

// dto
import { AddTechCostsDto } from "./dto/add-tech-costs.dto";

@Injectable()
export class TechCostsService {
  constructor(@InjectRepository(TechCosts) private techCostsService: Repository<TechCosts>) {}

  async getByTechId(techId: number) {
    const techCosts = this.techCostsService.find({
      where: {
        techId,
      },
      relations: ["resource"],
    });

    return techCosts;
  }

  async create(techId: number, adds: AddTechCostsDto[]) {
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
    if (result.affected === 0) throw new HttpException("Tech Costs not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
