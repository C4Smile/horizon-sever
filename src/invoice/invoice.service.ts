import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// service
import { CurrencyService } from "src/currency/currency.service";
import { CustomerService } from "src/customer/customer.service";
import { ReservationService } from "src/reservation/reservation.service";
import { PaymentMethodService } from "src/payment-method/payment-method.service";

// entity
import { Invoice } from "./invoice.entity";

// dto
import { AddInvoiceDto } from "./dto/add-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceService: Repository<Invoice>,
    private customersService: CustomerService,
    private reservationsService: ReservationService,
    private currenciesService: CurrencyService,
    private paymentMethodsService: PaymentMethodService,
  ) {}

  async create(invoice: AddInvoiceDto) {
    const customerFound = await this.customersService.getById(invoice.customerId);

    if (!customerFound) return new HttpException("Customer not Found", HttpStatus.NOT_FOUND);

    const reservationFound = await this.reservationsService.getById(invoice.reservationId);

    if (!reservationFound) return new HttpException("Reservation not Found", HttpStatus.NOT_FOUND);

    const currencyFound = await this.currenciesService.getById(invoice.currencyId);

    if (!currencyFound) return new HttpException("Currency not Found", HttpStatus.NOT_FOUND);

    const paymentMethodFound = await this.paymentMethodsService.getById(invoice.paymentMethodId);

    if (!paymentMethodFound) return new HttpException("Payment method not Found", HttpStatus.NOT_FOUND);

    const newInvoice = this.invoiceService.create(invoice);
    return this.invoiceService.save(newInvoice);
  }

  get() {
    return this.invoiceService.find({ relations: ["reservation", "currency", "paymentMethod"] });
  }

  async getById(id: number) {
    const invoiceFound = await this.invoiceService.findOne({
      where: {
        id,
      },
    });

    if (!invoiceFound) return new HttpException("Invoice not Found", HttpStatus.NOT_FOUND);

    return invoiceFound;
  }

  async remove(id: number) {
    const result = await this.invoiceService.delete({ id });
    if (result.affected === 0) return new HttpException("Invoice not Found", HttpStatus.NOT_FOUND);

    return result;
  }

  async update(id: number, data: UpdateInvoiceDto) {
    const invoiceFound = await this.invoiceService.findOne({
      where: {
        id,
      },
    });

    if (!invoiceFound) return new HttpException("Invoice not Found", HttpStatus.NOT_FOUND);

    const updatedInvoice = Object.assign(invoiceFound, data);

    return this.invoiceService.save(updatedInvoice);
  }
}
