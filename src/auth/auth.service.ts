import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { hash, compare } from "bcrypt";

// entity
import { User } from "src/modules/user/user.entity";
import { HorizonUser } from "src/modules/horizonUser/entities/horizon-user.entity";

// dto
import { LoginUserDto } from "./dto/login-user.dto";
import { LoggedUserDto } from "./dto/logged-user.dto";
import { AddUserDto } from "src/modules/user/dto/add-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(HorizonUser) private HorizonUserService: Repository<HorizonUser>,
    @InjectRepository(User) private userService: Repository<User>,
    private jwtAuthService: JwtService,
  ) {}

  async validate() {
    return { message: "Validated" };
  }

  async login(loginUserDto: LoginUserDto) {
    const userFound = await this.HorizonUserService.findOne({
      where: [
        {
          email: loginUserDto.username,
        },
        {
          username: loginUserDto.username,
        },
      ],
      relations: ["user"],
    });

    if (!userFound) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    const isPasswordMatched = !userFound.user.encrypted_password.length
      ? true
      : await compare(loginUserDto.password, userFound.user.encrypted_password);

    if (!isPasswordMatched)
      throw new HttpException("Wrong username or encrypted_password", HttpStatus.UNAUTHORIZED);

    const loggedUser = {
      user: {
        id: userFound.user.id,
        horizonUserId: userFound.id,
      },
      token: "",
    };

    loggedUser.token = this.jwtAuthService.sign({ id: userFound.id, username: loginUserDto.username });

    return loggedUser as LoggedUserDto;
  }

  async register(user: AddUserDto) {
    const phoneFound = await this.userService.findOne({ where: { phone: user.phone } });

    if (phoneFound && user.phone?.length)
      throw new HttpException("Phone is being used", HttpStatus.CONFLICT);

    const emailFound = await this.userService.findOne({ where: { email: user.email } });

    if (emailFound) throw new HttpException("Email is being used", HttpStatus.CONFLICT);

    const hashedPassword = await hash(user.password, 10);

    const newUser = this.userService.create({ ...user, encrypted_password: hashedPassword });
    const resultUser = await this.userService.save(newUser);
    return [resultUser];
  }
}
