import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { ExternalLink } from "./external-link.entity";

// dto
import { AddExternalLinkDto } from "./dto/add-external-link.dto";

@Injectable()
export class ExternalLinkService {
  constructor(@InjectRepository(ExternalLink) private externalLinkService: Repository<ExternalLink>) {}

  async create(externalLink: AddExternalLinkDto) {
    const externalLinkFound = await this.externalLinkService.findOne({
      where: { name: externalLink.name },
    });

    if (externalLinkFound) throw new HttpException("ExternalLink already exists", HttpStatus.CONFLICT);

    const newExternalLink = this.externalLinkService.create(externalLink);
    return this.externalLinkService.save(newExternalLink);
  }

  async get({ sort, order, page, count }) {
    const list = await this.externalLinkService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
    });

    return list;
  }

  async getById(id: number) {
    const externalLinkFound = await this.externalLinkService.findOne({
      where: {
        id,
      },
    });

    if (!externalLinkFound) throw new HttpException("ExternalLink not Found", HttpStatus.NOT_FOUND);

    return externalLinkFound;
  }

  async remove(id: number) {
    const externalLinkFound = await this.externalLinkService.findOne({
      where: { id },
    });

    if (!externalLinkFound)
      throw new HttpException("ExternalLink already exists", HttpStatus.NOT_FOUND);

    const result = await this.externalLinkService.save({ id, deleted: true });

    return result;
  }
}
