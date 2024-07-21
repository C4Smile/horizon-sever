import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { ServiceHasSchedule } from "./service-has-schedule.entity";

// dto
import { AddServiceHasScheduleDto } from "./dto/add-service-has-schedule.dto";

@Injectable()
export class ServiceHasScheduleService {
  constructor(
    @InjectRepository(ServiceHasSchedule)
    private serviceHasScheduleService: Repository<ServiceHasSchedule>,
  ) {}

  async create(service: AddServiceHasScheduleDto) {
    const newService = this.serviceHasScheduleService.create(service);
    return [this.serviceHasScheduleService.save(newService)];
  }

  async remove(id: number) {
    const result = await this.serviceHasScheduleService.update({ id }, { deleted: true });
    if (result.affected === 0)
      throw new HttpException("Service has schedule not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
