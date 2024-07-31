import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBlobDto } from "src/image/dto/add-blob.dto";

// services
import { Image360Service } from "./image-360.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("images")
export class ImageController {
  constructor(private imageService: Image360Service) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newEvent: AddBlobDto) {
    return this.imageService.create(newEvent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.imageService.remove(id);
  }
}
