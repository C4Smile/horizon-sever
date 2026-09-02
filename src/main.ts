import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { urlencoded, json } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  // el puerto 3000 suele estar ocupado en local, PORT lo sobreescribe
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
