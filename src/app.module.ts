import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryModule } from "./country/country.module";
import { CustomerModule } from "./customer/customer.module";
import { CurrencyModule } from "./currency/currency.module";
import { InvoiceModule } from "./invoice/invoice.module";
import { ProvinceModule } from "./province/province.module";
import { ReservationModule } from "./reservation/reservation.module";
import { RoomModule } from "./room/room.module";
import { AuthModule } from "./auth/auth.module";
import { PaymentMethodModule } from "./payment-method/payment-method.module";
import { EventModule } from "./event/event.module";
import { EventTagModule } from "./events-tag/event-tag.module";
import { NewsTagModule } from "./news-tag/news-tag.module";
import { NewsModule } from "./news/news.module";

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
    UserModule,
    CountryModule,
    CustomerModule,
    CurrencyModule,
    InvoiceModule,
    PaymentMethodModule,
    ProvinceModule,
    ReservationModule,
    RoomModule,
    AuthModule,
    EventModule,
    EventTagModule,
    NewsModule,
    NewsTagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
