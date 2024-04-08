import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

// dto
import { InvoiceDto } from "./dto/invoice.dto";
import { AddInvoiceDto } from "./dto/add-invoice.dto";

// services
import { InvoiceService } from "./invoice.service";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

@Controller("invoice")
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  get(): Promise<InvoiceDto[]> {
    return this.invoiceService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.invoiceService.getById(id);
  }

  @Post()
  create(@Body() newInvoice: AddInvoiceDto) {
    return this.invoiceService.create(newInvoice);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.invoiceService.remove(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateInvoiceDto) {
    return this.update(id, data);
  }
}
