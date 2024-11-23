import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Skill } from "./entities/skill.entity";
import { Photo } from "../image/image.entity";

// dto
import { AddSkillDto } from "./dto/add-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";

@Injectable()
export class SkillService extends CrudService<Skill, AddSkillDto, UpdateSkillDto> {
  constructor(
    @InjectRepository(Skill) skillService: Repository<Skill>,
    @InjectRepository(Photo) imageService: Repository<Photo>,
  ) {
    const relationships = ["image"];
    super(skillService, imageService, relationships);
  }
}
