import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcrypt";

import { Repository } from "typeorm";

// entity
import { User } from "./user.entity";

// dto
import { UserDto } from "./dto/user.dto";
import { AddUserDto } from "./dto/add-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userService: Repository<User>) {}

  async create(user: AddUserDto) {
    const userFound = await this.userService.findOne({
      where: { username: user.username },
    });

    if (userFound) return new HttpException("User already exists", HttpStatus.CONFLICT);

    const phoneFound = await this.userService.findOne({ where: { phone: user.phone } });
    if (phoneFound) return new HttpException("Phone is being used", HttpStatus.CONFLICT);

    const emailFound = await this.userService.findOne({ where: { email: user.email } });
    if (emailFound) return new HttpException("Email is being used", HttpStatus.CONFLICT);

    const identificationFound = await this.userService.findOne({
      where: { identification: user.identification },
    });
    if (identificationFound)
      return new HttpException("Identification is being used", HttpStatus.CONFLICT);

    const hashedPassword = await hash(user.password, 10);

    const newUser = this.userService.create({ ...user, password: hashedPassword });
    const resultUser = await this.userService.save(newUser);
    return resultUser as UserDto;
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

    if (!userFound) return new HttpException("User not Found", HttpStatus.NOT_FOUND);

    return userFound;
  }

  async remove(id: number) {
    const result = await this.userService.delete({ id });
    if (result.affected === 0) return new HttpException("User not Found", HttpStatus.NOT_FOUND);

    return result;
  }

  async update(id: number, data: UpdateUserDto) {
    const userFound = await this.userService.findOne({
      where: {
        id,
      },
    });

    if (!userFound) return new HttpException("User not Found", HttpStatus.NOT_FOUND);

    const phoneFound = await this.userService.findOne({ where: { phone: data.phone } });
    if (phoneFound) return new HttpException("Phone is being used", HttpStatus.CONFLICT);

    const emailFound = await this.userService.findOne({ where: { email: data.email } });
    if (emailFound) return new HttpException("Email is being used", HttpStatus.CONFLICT);

    const identificationFound = await this.userService.findOne({
      where: { identification: data.identification },
    });
    if (identificationFound)
      return new HttpException("Identification is being used", HttpStatus.CONFLICT);

    if (data.password) data.password = await hash(data.password, 10);

    const updatedUser = Object.assign(userFound, data);

    const resultUser = await this.userService.save(updatedUser);
    return resultUser as UserDto;
  }
}
