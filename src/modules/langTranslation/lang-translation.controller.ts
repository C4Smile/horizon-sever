import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddLangTranslationDto } from "./dto/add-lang-translation.dto";

// services
import { LangTranslationService } from "./lang-translation.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("langTranslation")
export class LangTranslationController {
  constructor(private langTranslationService: LangTranslationService) {}

  @Get("/byLangId/:langId")
  getByLangId(@Param("langId", ParseIntPipe) langId: number) {
    return this.langTranslationService.getByLangId(langId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() langTranslation: AddLangTranslationDto) {
    return this.langTranslationService.create(langTranslation);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Body() toDelete: number[]) {
    return this.langTranslationService.remove(toDelete);
  }
}
