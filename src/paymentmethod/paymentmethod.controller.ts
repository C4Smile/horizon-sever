import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

// dto
import { PaymentMethodDto } from "./dto/paymentMethod.dto";
import { AddPaymentMethodDto } from "./dto/add-paymentMethod.dto";

// services
import { PaymentMethodService } from "./paymentMethod.service";
import { UpdatePaymentMethodDto } from "./dto/update-paymentMethod.dto";

@Controller("paymentMethod")
export class PaymentMethodController {
  constructor(private paymentMethodService: PaymentMethodService) {}

  @Get()
  get(): Promise<PaymentMethodDto[]> {
    return this.paymentMethodService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.paymentMethodService.getById(id);
  }

  @Post()
  create(@Body() newPaymentMethod: AddPaymentMethodDto) {
    return this.paymentMethodService.create(newPaymentMethod);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.paymentMethodService.remove(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdatePaymentMethodDto) {
    return this.update(id, data);
  }
}
