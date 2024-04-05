import { Injectable } from "@nestjs/common";
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

  create(user: AddUserDto) {
    const newUser = this.userService.create(user);
    return this.userService.save(newUser);
  }

  get() {
    return this.userService.find();
  }

  getById(id: number) {
    return this.userService.findOne({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.userService.delete({ id });
  }

  update(id: number, data: UpdateUserDto) {
    return this.userService.update({ id }, { ...data });
  }
}
