import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { rmSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// entities
import { Photo } from "./image.entity";

// dto
import { AddBlobDto } from "./dto/add-blob.dto";

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Photo) private imageService: Repository<Photo>) {}

  async create(image: AddBlobDto) {
    const { base64, folder, fileName } = image;
    const parts = fileName.split(".");
    const ext = parts.length > 1 ? parts.pop() : "";

    const base64Data = base64.replace(`data:image\/${ext};base64,`, "");

    if (!existsSync(join(__dirname, "../../", `public/images`)))
      mkdirSync(join(__dirname, "../../", `public/images`));
    if (!existsSync(join(__dirname, "../../", `public/images/${folder}`)))
      mkdirSync(join(__dirname, "../../", `public/images/${folder}`));
    writeFileSync(join(__dirname, "../../", `public/images${folder}${fileName}`), base64Data, "base64");

    const url = `${folder}${fileName}`;

    const imageFound = await this.imageService.findOne({
      where: { fileName, url },
    });

    if (imageFound) throw new HttpException("Image already exists", HttpStatus.CONFLICT);

    const newImage = this.imageService.create({ url, fileName });
    return [this.imageService.save(newImage)];
  }

  async remove(id: number) {
    const imageFound = await this.imageService.findOne({
      where: { id },
    });

    if (!imageFound) throw new HttpException("Image not found", HttpStatus.NOT_FOUND);

    try {
      const path = join(__dirname, "..", `public${imageFound.url}`);
      rmSync(path);
    } catch (err) {
      throw new HttpException("Error to delete image", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.imageService.delete({ id });
  }
}
