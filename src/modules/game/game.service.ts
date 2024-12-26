import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class GameService {
  public async init() {}

  constructor() {
    this.init();
  }
}
