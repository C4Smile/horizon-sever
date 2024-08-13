import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";
import { hash } from "bcrypt";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { User } from "src/user/user.entity";
import { MuseumUser } from "./museum-user.entity";

// utils
import { QueryFilter, PagedResult } from "src/models/types";

// dto
import { MuseumUserDto } from "./dto/museum-user.dto";
import { AddMuseumUserDto } from "./dto/add-museum-user.dto";
import { UpdateMuseumUserDto } from "./dto/update-museum-user.dto";

@Injectable()
export class MuseumUserService extends CrudService<MuseumUser, AddMuseumUserDto, UpdateMuseumUserDto> {
  constructor(
    @InjectRepository(MuseumUser) museumUserService: Repository<MuseumUser>,
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectMapper() mapper: Mapper,
  ) {
    const relationships = ["user", "role", "image"];
    super(museumUserService, mapper, relationships);
  }

  override async create(user: AddMuseumUserDto) {
    const { email, phone, password } = user;

    const hashedPassword = await hash(password, 10);

    const newUser = this.userService.create({
      email,
      phone,
      encrypted_password: hashedPassword,
    });
    const resultUser = await this.userService.save(newUser);

    const museumUser = this.entityService.create({
      ...user,
      userId: resultUser.id,
    });
    const resultMuseumUser = await this.entityService.save(museumUser);

    return [resultMuseumUser];
  }

  mappedGet = async (query: QueryFilter): Promise<PagedResult<MuseumUserDto>> => {
    const result = await this.get(query);
    const mappedItems = await this.mapper.mapArrayAsync(result.items, MuseumUser, MuseumUserDto);
    return {
      items: mappedItems,
      total: result.total,
    };
  };

  async getByUserId(userId: number) {
    const museumUserFound = await this.entityService.findOne({
      where: {
        userId,
      },
    });

    if (!museumUserFound) throw new HttpException("MuseumUser not Found", HttpStatus.NOT_FOUND);

    return museumUserFound;
  }
}
