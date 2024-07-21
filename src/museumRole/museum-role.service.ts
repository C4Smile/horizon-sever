import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { MuseumRole } from "./museum-role.entity";

// dto
import { AddMuseumRoleDto } from "./dto/add-museum-role.dto";
import { UpdateMuseumRoleDto } from "./dto/update-museum-role.dto";

@Injectable()
export class MuseumRoleService {
  constructor(@InjectRepository(MuseumRole) private museumRoleService: Repository<MuseumRole>) {}

  async create(museumRole: AddMuseumRoleDto) {
    const museumRoleFound = await this.museumRoleService.findOne({
      where: { name: museumRole.name },
    });

    if (museumRoleFound) throw new HttpException("MuseumRole already exists", HttpStatus.CONFLICT);

    const newMuseumRole = this.museumRoleService.create(museumRole);
    return [this.museumRoleService.save(newMuseumRole)];
  }

  async get({ sort, order, page, count }) {
    const list = await this.museumRoleService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
    });

    return list;
  }

  async getById(id: number) {
    const museumRoleFound = await this.museumRoleService.findOne({
      where: {
        id,
      },
    });

    if (!museumRoleFound) throw new HttpException("MuseumRole not Found", HttpStatus.NOT_FOUND);

    return [museumRoleFound];
  }

  async remove(id: number) {
    const result = await this.museumRoleService.update({ id }, { deleted: true });
    if (result.affected === 0) throw new HttpException("MuseumRole not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateMuseumRoleDto) {
    const museumRoleFound = await this.museumRoleService.findOne({
      where: {
        id,
      },
    });

    if (!museumRoleFound) throw new HttpException("MuseumRole not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.museumRoleService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("MuseumRole already exists", HttpStatus.CONFLICT);

    const updatedMuseumRole = Object.assign(museumRoleFound, data);

    return this.museumRoleService.save(updatedMuseumRole);
  }
}
