import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { SkillController } from "./skill.controller";

// service
import { SkillService } from "./skill.service";

// entities
import { Skill } from "./entities/skill.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
