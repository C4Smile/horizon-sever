import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { ExternalLink } from "./external-link.entity";

// dto
import { AddExternalLinkDto } from "./dto/add-external-link.dto";
import { UpdateExternalLinkDto } from "./dto/update-external-link.dto";

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

  async get({ order, page, count }) {
    const list = await this.externalLinkService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [order]: "ASC",
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

  async update(id: number, data: UpdateExternalLinkDto) {
    const externalLinkFound = await this.externalLinkService.findOne({
      where: {
        id,
      },
    });

    if (!externalLinkFound) throw new HttpException("ExternalLink not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.externalLinkService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("ExternalLink already exists", HttpStatus.CONFLICT);

    const updatedExternalLink = Object.assign(externalLinkFound, data);

    return this.externalLinkService.save(updatedExternalLink);
  }
}
