import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { rmSync, writeFileSync } from "fs";
import { join } from "path";

// entities
import { Photo } from "./image.entity";

// dto
import { AddBlobDto } from "./dto/add-blob.dto";

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Photo) private imageService: Repository<Photo>) {}

  async create(image: AddBlobDto) {
    const { blob, fileName, ext } = image;
    let url = "";

    const base64Data = blob.replace(`data:image\/${ext};base64,`, "");

    writeFileSync(join(__dirname, "..", `public/assets/${fileName}`), base64Data);

    url = `/assets/${fileName}`;

    const newsFound = await this.imageService.findOne({
      where: { fileName, url },
    });

    if (newsFound) throw new HttpException("Image already exists", HttpStatus.CONFLICT);

    const newNews = this.imageService.create({ url, fileName });
    return this.imageService.save(newNews);
  }

  async remove(id: number) {
    const newsFound = await this.imageService.findOne({
      where: { id },
    });

    if (!newsFound) throw new HttpException("Image not found", HttpStatus.NOT_FOUND);

    try {
      const path = join(__dirname, "..", `public${newsFound.url}`);
      rmSync(path);
    } catch (err) {
      throw new HttpException("Error to delete image", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.imageService.delete({ id });
  }
}
