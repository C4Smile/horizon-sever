import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { hash, compare } from "bcrypt";

// service
import { User } from "src/users/user.entity";

// dto
import { LoginUserDto } from "./dto/login-user.dto";
import { AddUserDto } from "src/users/dto/add-user.dto";
import { UserDto } from "src/users/dto/user.dto";
import { LoggedUserDto } from "./dto/logged-user.dt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userService: Repository<User>,
    private jwtAuthService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const userFound = await this.userService.findOne({
      where: {
        username: loginUserDto.username,
      },
    });

    if (!userFound) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    const isPasswordMatched = await compare(loginUserDto.password, userFound.password);

    if (!isPasswordMatched)
      throw new HttpException("Wrong username or password", HttpStatus.UNAUTHORIZED);

    const loggedUser = {
      id: userFound.id,
      token: "",
    };

    loggedUser.token = this.jwtAuthService.sign({ id: userFound.id, username: loginUserDto.username });

    return loggedUser as LoggedUserDto;
  }

  async register(user: AddUserDto) {
    const userFound = await this.userService.findOne({
      where: { username: user.username },
    });

    if (userFound) throw new HttpException("User already exists", HttpStatus.CONFLICT);

    const phoneFound = await this.userService.findOne({ where: { phone: user.phone } });

    if (phoneFound) throw new HttpException("Phone is being used", HttpStatus.CONFLICT);

    const emailFound = await this.userService.findOne({ where: { email: user.email } });

    if (emailFound) throw new HttpException("Email is being used", HttpStatus.CONFLICT);

    const identificationFound = await this.userService.findOne({
      where: { identification: user.identification },
    });

    if (identificationFound)
      throw new HttpException("Identification is being used", HttpStatus.CONFLICT);

    const hashedPassword = await hash(user.password, 10);

    const newUser = this.userService.create({ ...user, password: hashedPassword });
    const resultUser = await this.userService.save(newUser);
    return resultUser as UserDto;
  }
}
