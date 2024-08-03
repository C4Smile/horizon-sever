import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { Repository } from "typeorm";

// entity
import { Activity } from "./activity.entity";

// dto
import { AddActivityDto } from "./dto/add-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { ActivityDto } from "./dto/activity.dto";

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private activityService: Repository<Activity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(activity: AddActivityDto) {
    const activityFound = await this.activityService.findOne({
      where: { title: activity.title },
    });

    if (activityFound) throw new HttpException("Activity already exists", HttpStatus.CONFLICT);

    const newActivity = this.activityService.create(activity);
    const saved = await this.activityService.save(newActivity);
    return [saved];
  }

  async get({ sort, order, page, count }) {
    const list = await this.activityService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
      relations: ["image"],
    });

    return this.mapper.mapArrayAsync(list, Activity, ActivityDto);
  }

  async getById(id: number) {
    const activityFound = await this.activityService.findOne({
      where: {
        id,
      },
      relations: ["image"],
    });

    if (!activityFound) throw new HttpException("Activity not Found", HttpStatus.NOT_FOUND);

    return this.mapper.mapArrayAsync([activityFound], Activity, ActivityDto);
  }

  async remove(id: number) {
    const result = await this.activityService.update({ id }, { deleted: true });
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
    const saved = await this.activityService.save(updatedActivity);
    return [saved];
  }
}
