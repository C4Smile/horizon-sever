import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { RoomHasSchedule } from "./room-has-schedule.entity";

// dto
import { AddRoomHasScheduleDto } from "./dto/add-room-has-schedule.dto";

@Injectable()
export class RoomHasScheduleService {
  constructor(
    @InjectRepository(RoomHasSchedule) private roomHasScheduleService: Repository<RoomHasSchedule>,
  ) {}

  async create(room: AddRoomHasScheduleDto) {
    const newRoom = this.roomHasScheduleService.create(room);
    const saved = await this.roomHasScheduleService.save(newRoom);
    return [saved];
  }

  async remove(id: number) {
    const result = await this.roomHasScheduleService.update({ id }, { deleted: true });
    if (result.affected === 0)
      throw new HttpException("Room has schedule not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
