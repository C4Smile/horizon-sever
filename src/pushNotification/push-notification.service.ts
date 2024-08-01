import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { PushNotification } from "./push-notification.entity";

// dto
import { AddPushNotificationDto } from "./dto/add-push-notification.dto";
import { UpdatePushNotificationDto } from "./dto/update-push-notification.dto";

@Injectable()
export class PushNotificationService {
  constructor(
    @InjectRepository(PushNotification) private pushNotificationService: Repository<PushNotification>,
  ) {}

  async create(pushNotification: AddPushNotificationDto) {
    const pushNotificationFound = await this.pushNotificationService.findOne({
      where: { title: pushNotification.title },
    });

    if (pushNotificationFound)
      throw new HttpException("PushNotification already exists", HttpStatus.CONFLICT);

    const newPushNotification = this.pushNotificationService.create(pushNotification);
    const saved = await this.pushNotificationService.save(newPushNotification);
    return [saved];
  }

  async get({ sort, order, page, count }) {
    const list = await this.pushNotificationService.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: ["image"],
      order: {
        [sort]: order,
      },
    });

    return list;
  }

  async getById(id: number) {
    const pushNotificationFound = await this.pushNotificationService.findOne({
      where: {
        id,
      },
      relations: ["image"],
    });

    if (!pushNotificationFound)
      throw new HttpException("PushNotification not Found", HttpStatus.NOT_FOUND);

    return [pushNotificationFound];
  }

  async remove(id: number) {
    const result = await this.pushNotificationService.update({ id }, { deleted: true });
    if (result.affected === 0)
      throw new HttpException("PushNotification not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdatePushNotificationDto) {
    const pushNotificationFound = await this.pushNotificationService.findOne({
      where: {
        id,
      },
    });

    if (!pushNotificationFound)
      throw new HttpException("PushNotification not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.pushNotificationService.findOne({
      where: {
        title: data.title,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("PushNotification already exists", HttpStatus.CONFLICT);

    const updatedPushNotification = Object.assign(pushNotificationFound, data);
    const saved = await this.pushNotificationService.save(updatedPushNotification);
    return [saved];
  }
}
