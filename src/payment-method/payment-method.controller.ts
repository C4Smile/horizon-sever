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
import { PaymentMethodDto } from "./dto/payment-method.dto";
import { AddPaymentMethodDto } from "./dto/add-payment-method.dto";

// services
import { PaymentMethodService } from "./payment-method.service";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("paymentMethod")
export class PaymentMethodController {
  constructor(private paymentMethodService: PaymentMethodService) {}

  @Get()
  get(@Query() query): Promise<PaymentMethodDto[]> {
    const { order = "lastUpdate", page = 0, count = 20 } = query;
    return this.paymentMethodService.get({ order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.paymentMethodService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newPaymentMethod: AddPaymentMethodDto) {
    return this.paymentMethodService.create(newPaymentMethod);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.paymentMethodService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdatePaymentMethodDto) {
    return this.paymentMethodService.update(id, data);
  }
}
