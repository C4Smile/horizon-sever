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

// dto
import { PushNotificationDto } from "./dto/push-notification.dto";
import { AddPushNotificationDto } from "./dto/add-push-notification.dto";

// services
import { PushNotificationService } from "./push-notification.service";
import { UpdatePushNotificationDto } from "./dto/update-push-notification.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("pushNotification")
export class PushNotificationController {
  constructor(private pushNotificationService: PushNotificationService) {}

  @Get()
  get(@Query() query): Promise<PushNotificationDto[]> {
    const { order = "lastUpdate", page = 0, count = 20 } = query;
    return this.pushNotificationService.get({ order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.pushNotificationService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newPushNotification: AddPushNotificationDto) {
    return this.pushNotificationService.create(newPushNotification);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.pushNotificationService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdatePushNotificationDto) {
    return this.pushNotificationService.update(id, data);
  }
}
