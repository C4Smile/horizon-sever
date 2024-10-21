import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";
import { hash } from "bcrypt";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { User } from "../user/user.entity";
import { HorizonUser } from "./horizon-user.entity";

// utils
import { QueryFilter, PagedResult } from "src/modules/models/types";

// dto
import { HorizonUserDto } from "./dto/horizon-user.dto";
import { AddHorizonUserDto } from "./dto/add-horizon-user.dto";
import { UpdateHorizonUserDto } from "./dto/update-horizon-user.dto";

@Injectable()
export class HorizonUserService extends CrudService<
  HorizonUser,
  AddHorizonUserDto,
  UpdateHorizonUserDto
> {
  constructor(
    @InjectRepository(HorizonUser) horizonUserService: Repository<HorizonUser>,
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectMapper() mapper: Mapper,
  ) {
    const relationships = ["user", "role", "image"];
    super(horizonUserService, mapper, relationships);
  }

  override async create(user: AddHorizonUserDto) {
    const { email, phone, password } = user;

    const hashedPassword = await hash(password, 10);

    const newUser = this.userService.create({
      email,
      phone,
      encrypted_password: hashedPassword,
    });
    const resultUser = await this.userService.save(newUser);

    const horizonUser = this.entityService.create({
      ...user,
      userId: resultUser.id,
    });
    const resultHorizonUser = await this.entityService.save(horizonUser);

    return [resultHorizonUser];
  }

  mappedGet = async (query: QueryFilter): Promise<PagedResult<HorizonUserDto>> => {
    const result = await this.get(query);
    const mappedItems = await this.mapper.mapArrayAsync(result.items, HorizonUser, HorizonUserDto);
    return {
      items: mappedItems,
      total: result.total,
    };
  };

  async getByUserId(userId: number) {
    const horizonUserFound = await this.entityService.findOne({
      where: {
        userId,
      },
    });

    if (!horizonUserFound) throw new HttpException("HorizonUser not Found", HttpStatus.NOT_FOUND);

    return horizonUserFound;
  }
}
