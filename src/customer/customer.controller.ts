import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

// dto
import { CustomerDto } from "./dto/customer.dto";
import { AddCustomerDto } from "./dto/add-customer.dto";

// services
import { CustomerService } from "./customer.service";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Controller("customer")
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  get(): Promise<CustomerDto[]> {
    return this.customerService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.customerService.getById(id);
  }

  @Post()
  create(@Body() newCustomer: AddCustomerDto) {
    return this.customerService.create(newCustomer);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.customerService.remove(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateCustomerDto) {
    return this.update(id, data);
  }
}
