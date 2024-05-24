import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { PaymentMethod } from "./payment-method.entity";

// dto
import { AddPaymentMethodDto } from "./dto/add-payment-method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod) private paymentMethodService: Repository<PaymentMethod>,
  ) {}

  async create(paymentMethod: AddPaymentMethodDto) {
    const paymentMethodFound = await this.paymentMethodService.findOne({
      where: { name: paymentMethod.name },
    });

    if (paymentMethodFound)
      throw new HttpException("PaymentMethod already exists", HttpStatus.CONFLICT);

    const newPaymentMethod = this.paymentMethodService.create(paymentMethod);
    return this.paymentMethodService.save(newPaymentMethod);
  }

  async get({ order, page, count }) {
    const list = await this.paymentMethodService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [order]: "ASC",
      },
    });

    return list;
  }

  async getById(id: number) {
    const paymentMethodFound = await this.paymentMethodService.findOne({
      where: {
        id,
      },
    });

    if (!paymentMethodFound) throw new HttpException("PaymentMethod not Found", HttpStatus.NOT_FOUND);

    return paymentMethodFound;
  }

  async remove(id: number) {
    const result = await this.paymentMethodService.delete({ id });
    if (result.affected === 0) throw new HttpException("PaymentMethod not Found", HttpStatus.NOT_FOUND);

    return result;
  }

  async update(id: number, data: UpdatePaymentMethodDto) {
    const paymentMethodFound = await this.paymentMethodService.findOne({
      where: {
        id,
      },
    });

    if (!paymentMethodFound) throw new HttpException("PaymentMethod not Found", HttpStatus.NOT_FOUND);

    const updatedPaymentMethod = Object.assign(paymentMethodFound, data);

    return this.paymentMethodService.save(updatedPaymentMethod);
  }
}
