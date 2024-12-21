import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { rmSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

import { toSlug } from "some-javascript-utils";

// entities
import { Photo } from "./image.entity";

// dto
import { AddBlobDto } from "./dto/add-blob.dto";

// types
import { QueryFilter, PagedResult } from "src/modules/models/types";

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Photo) private imageService: Repository<Photo>) {}

  async create(image: AddBlobDto) {
    const { base64, folder, fileName, alt } = image;
    const parts = fileName.split(".");
    let ext = parts.length > 1 ? parts.pop() : "";
    if (ext === "jpg") ext = "jpeg";

    const slugFileName = toSlug(parts[0]);

    const base64Data = base64.replace(`data:image\/${ext};base64,`, "");

    if (!existsSync(join(__dirname, "../../../", `public/images`)))
      mkdirSync(join(__dirname, "../../../", `public/images`));
    if (!existsSync(join(__dirname, "../../../", `public/images/${folder}`)))
      mkdirSync(join(__dirname, "../../../", `public/images/${folder}`));
    writeFileSync(
      join(__dirname, "../../../", `public/images/${folder}/${slugFileName}.${ext}`),
      base64Data,
      "base64",
    );

    const url = `${folder}/${slugFileName}.${ext}`;

    const imageFound = await this.imageService.findOne({
      where: { url },
    });

    if (imageFound !== null && imageFound !== undefined)
      throw new HttpException("Image already exists", HttpStatus.CONFLICT);

    const newImage = this.imageService.create({ url, fileName: slugFileName, alt });
    const saved = await this.imageService.save(newImage);
    return saved;
  }

  async getAll(query?: QueryFilter): Promise<PagedResult<Photo>> {
    const { page, count, sort, order } = query;

    const list = await this.imageService.find({
      skip: page * count,
      take: count,
      where: {
        alt: Not(""),
      },
    });

    const total = await this.imageService.count();
    return { items: list.filter((image) => image.alt.length), total: total };
  }

  async getById(id: number): Promise<Photo> {
    const entityFound = await this.imageService.findOne({
      where: {
        id,
      },
    });

    if (!entityFound) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);
    return entityFound;
  }

  async remove(id: number) {
    const imageFound = await this.imageService.findOne({
      where: { id },
    });

    if (!imageFound) throw new HttpException("Image not found", HttpStatus.NOT_FOUND);

    try {
      const path = join(__dirname, "../../../", `public/images/${imageFound.url}`);
      rmSync(path);
      return this.imageService.delete({ id });
    } catch (err) {
      console.error(err);
      throw new HttpException("Error to delete image", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
