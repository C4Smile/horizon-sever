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

// entity
import { PushNotification } from "./push-notification.entity";

// dto
import { PushNotificationDto } from "./dto/push-notification.dto";
import { AddPushNotificationDto } from "./dto/add-push-notification.dto";

// services
import { PushNotificationService } from "./push-notification.service";
import { UpdatePushNotificationDto } from "./dto/update-push-notification.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MapInterceptor } from "@automapper/nestjs";

@Controller("pushNotification")
export class PushNotificationController {
  constructor(private pushNotificationService: PushNotificationService) {}

  @Get()
  @UseInterceptors(MapInterceptor(PushNotification, PushNotificationDto, { isArray: true }))
  async get(@Query() query) {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.pushNotificationService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(PushNotification, PushNotificationDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.pushNotificationService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newPushNotification: AddPushNotificationDto) {
    return this.pushNotificationService.create(newPushNotification);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.pushNotificationService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdatePushNotificationDto) {
    return this.pushNotificationService.update(id, data);
  }
}
