import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBlobDto } from "./dto/add-blob.dto";

// services
import { ImageService } from "./image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("images")
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() newEvent: AddBlobDto) {
    const a = await this.imageService.create(newEvent);
    console.log(a);
    return a;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.imageService.remove(id);
  }
}
