import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<PaymentMethodDto[]> {
    return this.paymentMethodService.get();
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
    return this.update(id, data);
  }
}
