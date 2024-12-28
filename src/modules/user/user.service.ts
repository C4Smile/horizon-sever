import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcrypt";

import { Repository } from "typeorm";

// entity
import { User } from "./user.entity";

// dto
import { AddUserDto } from "./dto/add-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userService: Repository<User>) {}

  async create(user: AddUserDto) {
    const hashedPassword = await hash(user.password, 10);

    const newUser = this.userService.create({ ...user, encrypted_password: hashedPassword });
    const resultUser = await this.userService.save(newUser);
    return [resultUser];
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

    if (!userFound) throw new HttpException("User not Found", HttpStatus.NOT_FOUND);

    return [userFound];
  }

  async remove(id: number) {
    const result = await this.userService.update({ id }, { deleted: true });
    if (result.affected === 0) throw new HttpException("User not Found", HttpStatus.NOT_FOUND);

    return result;
  }

  async update(id: number, data: UpdateUserDto) {
    const userFound = await this.userService.findOne({
      where: {
        id,
      },
    });

    if (!userFound) throw new HttpException("User not Found", HttpStatus.NOT_FOUND);

    const phoneFound = await this.userService.findOne({ where: { phone: data.phone } });
    if (phoneFound) throw new HttpException("Phone is being used", HttpStatus.CONFLICT);

    const emailFound = await this.userService.findOne({ where: { email: data.email } });
    if (emailFound) throw new HttpException("Email is being used", HttpStatus.CONFLICT);

    if (data.encrypted_password) data.encrypted_password = await hash(data.encrypted_password, 10);

    const updatedUser = Object.assign(userFound, data);

    const resultUser = await this.userService.save(updatedUser);
    return [resultUser];
  }
}
