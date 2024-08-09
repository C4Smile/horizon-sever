import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Repository } from "typeorm";

// controller
import { GuestBookController } from "./guest-book.controller";

// service
import { GuestBookService } from "./guest-book.service";

// entities
import { GuestBook } from "./guest-book.entity";
import { GuestBookAutomapper } from "./guest-book.automapper";

// base
import { CrudService } from "src/models/service/CrudService";

@Module({
  imports: [
    TypeOrmModule.forFeature([GuestBook]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [GuestBookController],
  providers: [Repository, Array, CrudService, GuestBookService, GuestBookAutomapper],
  exports: [GuestBookService],
})
export class GuestBookModule {}
