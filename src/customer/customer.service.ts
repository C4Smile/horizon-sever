import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// service
import { CountryService } from "src/country/country.service";

// entity
import { Customer } from "./customer.entity";

// dto
import { AddCustomerDto } from "./dto/add-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerService: Repository<Customer>,
    private customersService: CountryService,
  ) {}

  async create(customer: AddCustomerDto) {
    const countryFound = await this.customersService.getById(customer.countryId);

    if (!countryFound) throw new HttpException("Country not Found", HttpStatus.NOT_FOUND);

    const customerFound = await this.customerService.findOne({
      where: { name: customer.name },
    });

    if (customerFound) throw new HttpException("Customer already exists", HttpStatus.CONFLICT);

    const newCustomer = this.customerService.create(customer);
    return this.customerService.save(newCustomer);
  }

  get() {
    return this.customerService.find({
      relations: ["country"],
    });
  }

  async getById(id: number) {
    const customerFound = await this.customerService.findOne({
      where: {
        id,
      },
    });

    if (!customerFound) throw new HttpException("Customer not Found", HttpStatus.NOT_FOUND);

    return customerFound;
  }

  async remove(id: number) {
    const result = await this.customerService.delete({ id });
    if (result.affected === 0) throw new HttpException("Customer not Found", HttpStatus.NOT_FOUND);

    return result;
  }

  async update(id: number, data: UpdateCustomerDto) {
    const customerFound = await this.customerService.findOne({
      where: {
        id,
      },
    });

    if (!customerFound) throw new HttpException("Customer not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.customerService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("Customer already exists", HttpStatus.CONFLICT);

    const updatedCustomer = Object.assign(customerFound, data);

    return this.customerService.save(updatedCustomer);
  }
}
