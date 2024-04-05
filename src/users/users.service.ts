import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { User } from "./user.entity";

// dto
import { AddUserDto } from "./dto/add-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userService: Repository<User>) {}

  async create(user: AddUserDto) {
    const userFound = await this.userService.findOne({
      where: [{ username: user.username }, { identification: user.identification }],
    });

    if (userFound) {
      return new HttpException("User already exists", HttpStatus.CONFLICT);
    }

    const newUser = this.userService.create(user);
    return this.userService.save(newUser);
  }

  get() {
    return this.userService.find();
  }

  async getById(id: number) {
    const userFound = await this.userService.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException("User not Found", HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async remove(id: number) {
    const result = await this.userService.delete({ id });
    if (result.affected === 0) {
      return;
    }

    return result;
  }

  async update(id: number, data: UpdateUserDto) {
    const userFound = await this.userService.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException("User not Found", HttpStatus.NOT_FOUND);
    }

    const updatedUser = Object.assign(userFound, data);

    return this.userService.save(updatedUser);
  }
}
