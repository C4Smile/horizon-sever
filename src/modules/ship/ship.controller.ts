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
} from "@nestjs/common";

// entity
import { PagedResult } from "src/modules/models/types";

// dto
import { ShipDto } from "./dto/ship.dto";
import { AddShipDto } from "./dto/add-ship.dto";

// services
import { ShipService } from "./ship.service";
import { UpdateShipDto } from "./dto/update-ship.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("ships")
export class ShipController {
  constructor(private newsShipService: ShipService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<ShipDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsShipService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsShipService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newShip: AddShipDto) {
    return this.newsShipService.create(newShip);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsShipService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsShipService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateShipDto) {
    return this.newsShipService.update(id, data);
  }
}
