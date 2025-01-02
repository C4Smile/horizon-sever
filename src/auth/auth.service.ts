import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { hash, compare } from "bcrypt";
import { v4 } from "uuid";

// entity
import { User } from "src/modules/user/user.entity";
import { Validation } from "./entities/validation.entity";
import { ImageEnum } from "src/modules/image/image.entity";
import { HorizonUser } from "src/modules/horizonUser/entities/horizon-user.entity";
import { HorizonRoleEnum } from "src/modules/horizonRole/entities/horizon-role.entity";

// dto
import { LoginUserDto } from "./dto/login-user.dto";
import { LoggedUserDto } from "./dto/logged-user.dto";
import { AddUserDto } from "src/modules/user/dto/add-user.dto";

import { UserStatus } from "src/modules/horizonUser/entities/user-status";
import { TokenDto } from "./dto/token.dto";

// config
import config from "src/config/configuration";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(HorizonUser) private HorizonUserService: Repository<HorizonUser>,
    @InjectRepository(User) private userService: Repository<User>,
    @InjectRepository(Validation) private validationService: Repository<Validation>,
    private jwtAuthService: JwtService,
    private readonly httpService: HttpService,
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

  async validateEmail(dto: TokenDto) {
    const { token } = dto;

    const decode = this.jwtAuthService.decode(token);

    if (!decode.id) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    const validation = await this.validationService.findOneBy({ userId: decode.id });

    if (!validation) throw new HttpException("Invalid validation", HttpStatus.BAD_REQUEST);

    if (decode.token === validation.token && validation.expireAt > new Date()) {
      this.HorizonUserService.update(decode.id, { status: UserStatus.Validated });

      return {
        status: 200,
      };
    }

    throw new HttpException("Invalid validation", HttpStatus.BAD_REQUEST);
  }

  async register(user: AddUserDto) {
    try {
      await this.httpService.axiosRef.post(
        `${config.http.host}:${config.http.port}/auth/register`,
        user,
      );
    } catch (err) {
      console.error(err);
      throw new HttpException(String(err), err.response.status);
    }

    const phoneFound = await this.userService.findOne({ where: { phone: user.phone } });

    if (phoneFound && user.phone?.length)
      throw new HttpException("Phone is being used", HttpStatus.CONFLICT);

    const emailFound = await this.userService.findOne({ where: { email: user.email } });

    if (emailFound) throw new HttpException("Email is being used", HttpStatus.CONFLICT);

    const hashedPassword = await hash(user.password, 10);

    // registering basic user
    const newUser = this.userService.create({ ...user, encrypted_password: hashedPassword });
    const resultUser = await this.userService.save(newUser);

    // registering horizon user
    const newHorizonUser = this.HorizonUserService.create({
      username: user.email.split("@")[0],
      email: user.email,
      phone: user.phone,
      roleId: HorizonRoleEnum.Player,
      imageId: ImageEnum.NoUserImage,
      userId: resultUser.id,
    });
    const resultHorizonUser = await this.HorizonUserService.save(newHorizonUser);

    const registeredUser = {
      user: {
        status: 200,
      },
    };

    const token = v4();
    this.jwtAuthService.sign({ id: resultHorizonUser, token });

    const expireAt = new Date();
    expireAt.setHours(expireAt.getHours() + 1);

    const newValidation = this.validationService.create({
      userId: resultHorizonUser.id,
      token: token,
      expireAt,
    });
    await this.validationService.save(newValidation);

    return registeredUser;
  }
}
