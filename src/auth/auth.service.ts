import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { hash, compare } from "bcrypt";
import { randomBytes } from "crypto";

// entity
import { User } from "src/modules/user/user.entity";
import { HorizonUser } from "src/modules/horizonUser/entities/horizon-user.entity";
import { UserStatus } from "src/modules/horizonUser/entities/user-status";
import { Validation } from "./entities/validation.entity";

// dto
import { LoginUserDto } from "./dto/login-user.dto";
import { LoggedUserDto } from "./dto/logged-user.dto";
import { TokenDto } from "./dto/token.dto";
import { AddUserDto } from "src/modules/user/dto/add-user.dto";

// service
import { GameService } from "src/modules/game/game.service";

/** the image every account starts on, seeded by migrations/003 */
const DEFAULT_IMAGE_ID = 1;
/** how long a confirmation link is good for */
const VALIDATION_HOURS = 1;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(HorizonUser) private horizonUserService: Repository<HorizonUser>,
    @InjectRepository(User) private userService: Repository<User>,
    @InjectRepository(Validation) private validationService: Repository<Validation>,
    private jwtAuthService: JwtService,
    private eventEmitter: EventEmitter2,
    private gameService: GameService,
  ) {}

  async validate() {
    return { message: "Validated" };
  }

  async login(loginUserDto: LoginUserDto) {
    // an undefined username makes typeorm drop the condition and match the
    // first row, which would hand out a session for somebody else
    if (!loginUserDto?.username?.length)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    const userFound = await this.horizonUserService.findOne({
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

  /**
   * Signs a player up: the account, the player attached to it, the starting
   * stock, and the pending email confirmation.
   * @param user - what the sign up form sends
   * @param roleId - the role the new player gets
   * @returns the new player id and the confirmation token
   */
  async register(user: AddUserDto, roleId = 2) {
    const phoneFound = await this.userService.findOne({ where: { phone: user.phone } });

    if (phoneFound && user.phone?.length)
      throw new HttpException("Phone is being used", HttpStatus.CONFLICT);

    const emailFound = await this.userService.findOne({ where: { email: user.email } });

    if (emailFound) throw new HttpException("Email is being used", HttpStatus.CONFLICT);

    const hashedPassword = await hash(user.password, 10);

    const newUser = this.userService.create({ ...user, encrypted_password: hashedPassword });
    const resultUser = await this.userService.save(newUser);

    const username = user.email.split("@")[0];
    const newHorizonUser = this.horizonUserService.create({
      name: username,
      username,
      email: user.email,
      phone: user.phone ?? "",
      roleId,
      imageId: DEFAULT_IMAGE_ID,
      userId: resultUser.id,
      status: UserStatus.Validating,
    });
    const player = await this.horizonUserService.save(newHorizonUser);

    // the stock listens for this, a player with no resources cannot build
    this.eventEmitter.emit("player.created", {
      playerId: player.id,
      resources: this.gameService.get().resources,
    });

    const token = randomBytes(24).toString("hex");
    const expireAt = new Date();
    expireAt.setHours(expireAt.getHours() + VALIDATION_HOURS);

    // one pending confirmation per player, a new sign up replaces the old one
    await this.validationService.save(
      this.validationService.create({ userId: player.id, token, expireAt }),
    );

    // the token travels signed, so the link carries who it is for
    return {
      status: 200,
      playerId: player.id,
      validationToken: this.jwtAuthService.sign({ id: player.id, token }),
    };
  }

  /**
   * Confirms the email a sign up link was sent to.
   * @param dto - the signed token from the link
   * @returns transaction status
   */
  async validateEmail(dto: TokenDto) {
    const decoded = this.jwtAuthService.decode(dto.token) as { id?: number; token?: string };

    if (!decoded?.id) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    const validation = await this.validationService.findOneBy({ userId: decoded.id });

    if (!validation || validation.token !== decoded.token || validation.expireAt <= new Date())
      throw new HttpException("Invalid validation", HttpStatus.BAD_REQUEST);

    await this.horizonUserService.update(decoded.id, { status: UserStatus.Validated });
    await this.validationService.delete({ userId: decoded.id });

    return { status: 200 };
  }
}
