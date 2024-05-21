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

  @Get()
  get(@Query() query): Promise<CustomerDto[]> {
    const { order = "lastUpdate", page = 0, count = 20 } = query;
    return this.customerService.get({ order, page, count });
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
    return this.customerService.update(id, data);
  }
}
