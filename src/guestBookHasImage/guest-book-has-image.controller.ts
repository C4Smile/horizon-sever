import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

// dto
import { AddGuestBookHasImageDto } from "./dto/add-guest-book-has-image.dto";

// services
import { GuestBookHasImageService } from "./guest-book-has-image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("guestBookHasImage")
export class GuestBookHasImageController {
  constructor(private guestBookService: GuestBookHasImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newGuestBook: AddGuestBookHasImageDto) {
    return this.guestBookService.create(newGuestBook);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Body() toDelete: number[]) {
    return this.guestBookService.remove(toDelete);
  }
}
