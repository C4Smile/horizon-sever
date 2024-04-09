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
import { CustomerDto } from "./dto/customer.dto";
import { AddCustomerDto } from "./dto/add-customer.dto";

// services
import { CustomerService } from "./customer.service";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("customer")
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<CustomerDto[]> {
    return this.customerService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.customerService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newCustomer: AddCustomerDto) {
    return this.customerService.create(newCustomer);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateCustomerDto) {
    return this.update(id, data);
  }
}
