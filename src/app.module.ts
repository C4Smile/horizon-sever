import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryModule } from './country/country.module';
import { CustomerModule } from './customer/customer.module';
import { CurrencyModule } from './currency/currency.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PaymentMethodModule } from './paymentmethod/paymentmethod.module';
import { ProvinceModule } from './province/province.module';
import { ReservationModule } from './reservation/reservation.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      username: "root",
      password: "",
      host: "localhost",
      port: 3306,
      database: "museo",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UsersModule,
    CountryModule,
    CustomerModule,
    CurrencyModule,
    InvoiceModule,
    PaymentMethodModule,
    ProvinceModule,
    ReservationModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
