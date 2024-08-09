import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsEnum } from "class-validator";

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export type QueryFilter = { sort: string; order: SortOrder; page: number; count: number };

export class GenericFilter {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber({}, { message: ' "page" atrribute should be a number' })
  public page: number;

  @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
  @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
  public pageSize: number;

  @IsOptional()
  public orderBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}
