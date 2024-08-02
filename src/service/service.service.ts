import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { Repository } from "typeorm";

// entity
import { Service } from "./service.entity";

// dto
import { AddServiceDto } from "./dto/add-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ServiceDto } from "./dto/service.dto";

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private serviceService: Repository<Service>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(service: AddServiceDto) {
    const serviceFound = await this.serviceService.findOne({
      where: { name: service.name },
    });

    if (serviceFound) throw new HttpException("Service already exists", HttpStatus.CONFLICT);

    const newService = this.serviceService.create(service);
    const saved = await this.serviceService.save(newService);
    return [saved];
  }

  async get({ sort, order, page, count }) {
    const list = await this.serviceService.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: ["image"],
      order: {
        [sort]: order,
      },
    });

    return this.mapper.mapArrayAsync(list, Service, ServiceDto);
  }

  async getById(id: number) {
    const serviceFound = await this.serviceService.findOne({
      where: {
        id,
      },
      relations: ["image"],
    });

    if (!serviceFound) throw new HttpException("Service not Found", HttpStatus.NOT_FOUND);

    return this.mapper.mapArrayAsync([serviceFound], Service, ServiceDto);
  }

  async remove(id: number) {
    const result = await this.serviceService.update({ id }, { deleted: true });
    if (result.affected === 0) throw new HttpException("Service not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateServiceDto) {
    const serviceFound = await this.serviceService.findOne({
      where: {
        id,
      },
    });

    if (!serviceFound) throw new HttpException("Service not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.serviceService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("Service already exists", HttpStatus.CONFLICT);

    const updatedService = Object.assign(serviceFound, data);
    const saved = await this.serviceService.save(updatedService);
    return [saved];
  }
}
