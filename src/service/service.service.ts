import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { Service } from "./service.entity";

// utils
import { QueryFilter, PagedResult } from "src/models/types";

// dto
import { ServiceDto } from "./dto/service.dto";
import { AddServiceDto } from "./dto/add-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Injectable()
export class ServiceService extends CrudService<Service, AddServiceDto, UpdateServiceDto> {
  constructor(
    @InjectRepository(Service) serviceService: Repository<Service>,
    @InjectMapper() mapper: Mapper,
  ) {
    const relationships = ["image"];
    super(serviceService, mapper, relationships);
  }

  mappedGet = async (query: QueryFilter): Promise<PagedResult<ServiceDto>> => {
    const result = await this.get(query);
    const mappedItems = await this.mapper.mapArrayAsync(result.items, Service, ServiceDto);
    return {
      items: mappedItems,
      total: result.total,
    };
  };
}
