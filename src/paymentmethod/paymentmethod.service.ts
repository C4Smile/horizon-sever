import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { PaymentMethod } from "./paymentMethod.entity";

// dto
import { AddPaymentMethodDto } from "./dto/add-paymentMethod.dto";
import { UpdatePaymentMethodDto } from "./dto/update-paymentMethod.dto";

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod) private paymentMethodService: Repository<PaymentMethod>,
  ) {}

  async create(paymentMethod: AddPaymentMethodDto) {
    const paymentMethodFound = await this.paymentMethodService.findOne({
      where: { name: paymentMethod.name },
    });

    if (paymentMethodFound) {
      return new HttpException("PaymentMethod already exists", HttpStatus.CONFLICT);
    }

    const newPaymentMethod = this.paymentMethodService.create(paymentMethod);
    return this.paymentMethodService.save(newPaymentMethod);
  }

  get() {
    return this.paymentMethodService.find();
  }

  async getById(id: number) {
    const paymentMethodFound = await this.paymentMethodService.findOne({
      where: {
        id,
      },
    });

    if (!paymentMethodFound) {
      return new HttpException("PaymentMethod not Found", HttpStatus.NOT_FOUND);
    }

    return paymentMethodFound;
  }

  async remove(id: number) {
    const result = await this.paymentMethodService.delete({ id });
    if (result.affected === 0) {
      return;
    }

    return result;
  }

  async update(id: number, data: UpdatePaymentMethodDto) {
    const paymentMethodFound = await this.paymentMethodService.findOne({
      where: {
        id,
      },
    });

    if (!paymentMethodFound) {
      return new HttpException("PaymentMethod not Found", HttpStatus.NOT_FOUND);
    }

    const updatedPaymentMethod = Object.assign(paymentMethodFound, data);

    return this.paymentMethodService.save(updatedPaymentMethod);
  }
}
