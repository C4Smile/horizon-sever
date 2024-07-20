import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Activity } from "./activity.entity";

// dto
import { AddActivityDto } from "./dto/add-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";

@Injectable()
export class ActivityService {
  constructor(@InjectRepository(Activity) private activityService: Repository<Activity>) {}

  async create(activity: AddActivityDto) {
    const activityFound = await this.activityService.findOne({
      where: { title: activity.title },
    });

    if (activityFound) throw new HttpException("Activity already exists", HttpStatus.CONFLICT);

    const newActivity = this.activityService.create(activity);
    return [this.activityService.save(newActivity)];
  }

  async get({ sort, order, page, count }) {
    const list = await this.activityService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
    });

    return list;
  }

  async getById(id: number) {
    const activityFound = await this.activityService.findOne({
      where: {
        id,
      },
    });

    if (!activityFound) throw new HttpException("Activity not Found", HttpStatus.NOT_FOUND);

    return activityFound;
  }

  async remove(id: number) {
    const result = await this.activityService.delete({ id });
    if (result.affected === 0) throw new HttpException("Activity not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateActivityDto) {
    const activityFound = await this.activityService.findOne({
      where: {
        id,
      },
    });

    if (!activityFound) throw new HttpException("Activity not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.activityService.findOne({
      where: {
        title: data.title,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("Activity already exists", HttpStatus.CONFLICT);

    const updatedActivity = Object.assign(activityFound, data);

    return this.activityService.save(updatedActivity);
  }
}
