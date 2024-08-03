import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { Repository } from "typeorm";

// entity
import { GuestBook } from "./guest-book.entity";

// dto
import { GuestBookDto } from "./dto/guest-book.dto";
import { AddGuestBookDto } from "./dto/add-guest-book.dto";
import { UpdateGuestBookDto } from "./dto/update-guest-book.dto";
import { ClientGuestBookDto } from "./dto/client-guest-book.dto";

@Injectable()
export class GuestBookService {
  constructor(
    @InjectRepository(GuestBook) private serviceGuestBook: Repository<GuestBook>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(service: AddGuestBookDto) {
    const serviceFound = await this.serviceGuestBook.findOne({
      where: { name: service.name },
    });

    if (serviceFound) throw new HttpException("GuestBook already exists", HttpStatus.CONFLICT);

    const newGuestBook = this.serviceGuestBook.create(service);
    const saved = await this.serviceGuestBook.save(newGuestBook);
    return [saved];
  }

  async get({ sort, order, page, count }) {
    const list = await this.serviceGuestBook.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: ["guestBookHasImage"],
      order: {
        [sort]: order,
      },
    });

    return this.mapper.mapArrayAsync(list, GuestBook, GuestBookDto);
  }

  async clientGet({ sort, order, page, count }) {
    const list = await this.serviceGuestBook.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: ["guestBookHasImage"],
      order: {
        [sort]: order,
      },
    });

    return this.mapper.mapArrayAsync(list, GuestBook, ClientGuestBookDto);
  }

  async getById(id: number) {
    const serviceFound = await this.serviceGuestBook.findOne({
      where: {
        id,
      },
      relations: ["guestBookHasImage"],
    });

    if (!serviceFound) throw new HttpException("GuestBook not Found", HttpStatus.NOT_FOUND);

    return this.mapper.mapArrayAsync([serviceFound], GuestBook, GuestBookDto);
  }

  async remove(id: number) {
    const result = await this.serviceGuestBook.update({ id }, { deleted: true });
    if (result.affected === 0) throw new HttpException("GuestBook not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateGuestBookDto) {
    const serviceFound = await this.serviceGuestBook.findOne({
      where: {
        id,
      },
    });

    if (!serviceFound) throw new HttpException("GuestBook not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.serviceGuestBook.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("GuestBook already exists", HttpStatus.CONFLICT);

    const updatedGuestBook = Object.assign(serviceFound, data);
    const saved = await this.serviceGuestBook.save(updatedGuestBook);
    return [saved];
  }
}
