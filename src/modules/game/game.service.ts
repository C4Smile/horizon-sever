import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

import { EventEmitter2 } from "@nestjs/event-emitter";

// dto
import { GameBasicsDto } from "./dto/game-basics.dto";

// config
import config from "src/config/configuration";

@Injectable()
export class GameService {
  static GameBasics: GameBasicsDto;

  async init() {
    try {
      const response = await this.httpService.axiosRef.get<GameBasicsDto>(
        `${config.http.host}:${config.http.port}/game`,
      );

      if (response.data) GameService.GameBasics = response.data;
    } catch (err) {
      throw new HttpException(String(err), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  constructor(
    private readonly httpService: HttpService,
    private eventEmitter: EventEmitter2,
  ) {
    this.init();
  }

  async get(playerId: number) {
    this.eventEmitter.emit("player.created", { playerId, resources: GameService.GameBasics.resources });

    return GameService.GameBasics;
  }
}
