import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash } from "bcrypt";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { User } from "../user/user.entity";
import { HorizonUser } from "./entities/horizon-user.entity";
import { Photo } from "../image/image.entity";

// utils
import { QueryFilter, PagedResult } from "src/modules/models/types";

// dto
import { HorizonUserDto } from "./dto/horizon-user.dto";
import { AddHorizonUserDto } from "./dto/add-horizon-user.dto";
import { UpdateHorizonUserDto } from "./dto/update-horizon-user.dto";
import { AddBlobDto } from "../image/dto/add-blob.dto";

@Injectable()
export class HorizonUserService extends CrudService<
  HorizonUser,
  AddHorizonUserDto,
  UpdateHorizonUserDto
> {
  constructor(
    @InjectRepository(HorizonUser) horizonUserService: Repository<HorizonUser>,
    @InjectRepository(User) private readonly userService: Repository<User>,
    @InjectRepository(Photo) imageService: Repository<Photo>,
  ) {
    const relationships = ["user", "role", "image"];
    super(horizonUserService, imageService, relationships);
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
    return {
      items: result.items.map((horizonUser) => ({
        ...horizonUser,
        roleId: {
          ...horizonUser.role,
        },
        imageId: {
          ...horizonUser.image,
        },
      })),
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

  async uploadPhoto(horizonUserId: number, photo: AddBlobDto) {
    const userData = await this.entityService.findOne({
      where: {
        id: horizonUserId,
      },
    });

    if (!userData) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);

    const oldImageId = userData.imageId;

    const resultImage = await this.imageService.create(photo);

    await this.entityService.update(horizonUserId, { imageId: resultImage.id });

    if (oldImageId > 1) {
      // deleting old image
      await this.imageService.remove(oldImageId);
    }

    return resultImage;
  }
}
