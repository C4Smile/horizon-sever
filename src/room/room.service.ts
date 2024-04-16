import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Room } from "./room.entity";

// dto
import { AddRoomDto } from "./dto/add-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomService: Repository<Room>) {}

  async create(room: AddRoomDto) {
    const roomFound = await this.roomService.findOne({
      where: { name: room.name },
    });

    if (roomFound) throw new HttpException("Room already exists", HttpStatus.CONFLICT);

    if (room.number && room.number.length) {
      const roomFound = await this.roomService.findOne({
        where: { number: room.number },
      });

      if (roomFound) throw new HttpException("Number already in use", HttpStatus.CONFLICT);
    }

    const newRoom = this.roomService.create(room);
    return this.roomService.save(newRoom);
  }

  get() {
    return this.roomService.find();
  }

  async getById(id: number) {
    const roomFound = await this.roomService.findOne({
      where: {
        id,
      },
    });

    if (!roomFound) throw new HttpException("Room not Found", HttpStatus.NOT_FOUND);

    return roomFound;
  }

  async remove(id: number) {
    const result = await this.roomService.delete({ id });
    if (result.affected === 0) throw new HttpException("Room not Found", HttpStatus.NOT_FOUND);

    return result;
  }

  async update(id: number, data: UpdateRoomDto) {
    const roomFound = await this.roomService.findOne({
      where: {
        id,
      },
    });

    if (!roomFound) throw new HttpException("Room not Found", HttpStatus.NOT_FOUND);

    const updatedRoom = Object.assign(roomFound, data);

    return this.roomService.save(updatedRoom);
  }
}
