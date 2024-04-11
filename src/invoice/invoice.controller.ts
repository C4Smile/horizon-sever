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
import { InvoiceDto } from "./dto/invoice.dto";
import { AddInvoiceDto } from "./dto/add-invoice.dto";

// services
import { InvoiceService } from "./invoice.service";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("invoice")
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<InvoiceDto[]> {
    return this.invoiceService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.invoiceService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newInvoice: AddInvoiceDto) {
    return this.invoiceService.create(newInvoice);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.invoiceService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateInvoiceDto) {
    return this.invoiceService.update(id, data);
  }
}
