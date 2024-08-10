import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { MapInterceptor } from "@automapper/nestjs";

// entity
import { GuestBook } from "./guest-book.entity";

// dto
import { GuestBookDto } from "./dto/guest-book.dto";
import { AddGuestBookDto } from "./dto/add-guest-book.dto";
import { ClientGuestBookDto } from "./dto/client-guest-book.dto";
import { UpdateGuestBookDto } from "./dto/update-guest-book.dto";

// guest-books
import { GuestBookService } from "./guest-book.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("guestBook")
export class GuestBookController {
  constructor(private guestBookService: GuestBookService) {}

  @Get()
  @UseInterceptors(MapInterceptor(GuestBook, GuestBookDto, { isArray: true }))
  get(@Query() query) {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.guestBookService.get({ sort, order, page, count });
  }

  @Get("/all")
  all(@Query() query): Promise<ClientGuestBookDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.guestBookService.clientGet({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(GuestBook, GuestBookDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.guestBookService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newGuestBook: AddGuestBookDto) {
    return this.guestBookService.create(newGuestBook);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.guestBookService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.guestBookService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateGuestBookDto) {
    return this.guestBookService.update(id, data);
  }
}
