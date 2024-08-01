import { Injectable } from "@nestjs/common";
import { join } from "path";

@Injectable()
export class AppService {
  getHello(): string {
    console.log(join(__dirname, "..", "public"));
    return "Hello World!";
  }
}
