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

// utils
import { PagedResult, QueryFilter } from "src/modules/models/types";

// dto
import { LockDto } from "../user/dto/lock.dto";
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

  @Patch(":id/lock")
  lock(@Param("id", ParseIntPipe) id: number, @Body() user: LockDto) {
    return this.pushNotificationService.lock(id, user);
  }

  @Patch(":id/release")
  release(@Param("id", ParseIntPipe) id: number) {
    return this.pushNotificationService.release(id);
  }

  @Get()
  async get(@Query() query: QueryFilter): Promise<PagedResult<PushNotificationDto>> {
    return this.pushNotificationService.mappedGet(query);
  }

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
  @Delete()
  remove(@Body() ids: number[]) {
    return this.pushNotificationService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.pushNotificationService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdatePushNotificationDto) {
    return this.pushNotificationService.update(id, data);
  }
}
