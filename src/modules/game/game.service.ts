import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GameBasicsDto } from "./dto/game-basics.dto";

import config from "src/config/configuration";

@Injectable()
export class GameService {
  private gameBasics: GameBasicsDto;

  async init() {
    try {
      const response = await this.httpService.axiosRef.get<GameBasicsDto>(
        `${config.http.host}:${config.http.port}/game`,
      );

      console.log(`${config.http.host}:${config.http.port}/game`);

      console.log(response);

      if (response.data) this.gameBasics = response.data;
    } catch (err) {
      throw new HttpException(String(err), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  constructor(private readonly httpService: HttpService) {
    this.init();
  }

  get() {
    return this.gameBasics;
  }
}
