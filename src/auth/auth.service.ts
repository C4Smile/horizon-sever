import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash } from "bcrypt";

// service
import { User } from "src/users/user.entity";

// dto
import { LoginUserDto } from "./dto/login-user.dto";
import { AddUserDto } from "src/users/dto/add-user.dto";
import { UserDto } from "src/users/dto/user.dto";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userService: Repository<User>) {}

  async login(loginUserDto: LoginUserDto) {
    const hashedPassword = await hash(loginUserDto.password, 10);
    const userFound = await this.userService.findOne({
      where: {
        username: loginUserDto.username,
        password: hashedPassword,
      },
    });

    if (!userFound) {
      return new HttpException("Wrong username or password", HttpStatus.NOT_FOUND);
    }

    return loginUserDto;
  }

  async register(user: AddUserDto) {
    const userFound = await this.userService.findOne({
      where: { username: user.username },
    });

    if (userFound) {
      return new HttpException("User already exists", HttpStatus.CONFLICT);
    }

    const phoneFound = await this.userService.findOne({ where: { phone: user.phone } });
    if (phoneFound) {
      return new HttpException("Phone is being used", HttpStatus.CONFLICT);
    }

    const emailFound = await this.userService.findOne({ where: { email: user.email } });
    if (emailFound) {
      return new HttpException("Email is being used", HttpStatus.CONFLICT);
    }

    const identificationFound = await this.userService.findOne({
      where: { identification: user.identification },
    });
    if (identificationFound) {
      return new HttpException("Identification is being used", HttpStatus.CONFLICT);
    }

    const hashedPassword = await hash(user.password, 10);

    const newUser = this.userService.create({ ...user, password: hashedPassword });
    const resultUser = await this.userService.save(newUser);
    return resultUser as UserDto;
  }
}
