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
import { TagModule } from "./tags/tag.module";
import { NewsModule } from "./news/news.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),

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
    RoomModule,
    AuthModule,
    EventModule,
    NewsModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
