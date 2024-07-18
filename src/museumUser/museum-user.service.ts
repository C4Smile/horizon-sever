import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { MuseumUser } from "./museum-user.entity";

// dto
import { AddMuseumUserDto } from "./dto/add-museum-user.dto";
import { UpdateMuseumUserDto } from "./dto/update-museum-user.dto";

@Injectable()
export class MuseumUserService {
  constructor(@InjectRepository(MuseumUser) private museumUserService: Repository<MuseumUser>) {}

  async create(museumUser: AddMuseumUserDto) {
    const museumUserFound = await this.museumUserService.findOne({
      where: { name: museumUser.name },
    });

    if (museumUserFound) throw new HttpException("MuseumUser already exists", HttpStatus.CONFLICT);

    const newMuseumUser = this.museumUserService.create(museumUser);
    return this.museumUserService.save(newMuseumUser);
  }

  async get({ sort, order, page, count }) {
    const list = await this.museumUserService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
    });

    return list;
  }

  async getByUserId(userId: number) {
    const museumUserFound = await this.museumUserService.findOne({
      where: {
        userId,
      },
    });

    if (!museumUserFound) throw new HttpException("MuseumUser not Found", HttpStatus.NOT_FOUND);

    return museumUserFound;
  }

  async getById(id: number) {
    const museumUserFound = await this.museumUserService.findOne({
      where: {
        id,
      },
    });

    if (!museumUserFound) throw new HttpException("MuseumUser not Found", HttpStatus.NOT_FOUND);

    return museumUserFound;
  }

  async remove(id: number) {
    const result = await this.museumUserService.delete({ id });
    if (result.affected === 0) throw new HttpException("MuseumUser not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateMuseumUserDto) {
    const museumUserFound = await this.museumUserService.findOne({
      where: {
        id,
      },
    });

    if (!museumUserFound) throw new HttpException("MuseumUser not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.museumUserService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("MuseumUser already exists", HttpStatus.CONFLICT);

    const updatedMuseumUser = Object.assign(museumUserFound, data);

    return this.museumUserService.save(updatedMuseumUser);
  }
}
