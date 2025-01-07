import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { Resource } from "../resource/entities/resource.entity";

// dto
import { GameBasicsDto } from "./dto/game-basics.dto";

// config
import config from "src/config/configuration";

// service
import { ResourceService } from "../resource/resource.service";

@Injectable()
export class GameService {
  static GameBasics: GameBasicsDto;
  private readonly resourceService: ResourceService;

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
    @InjectRepository(Resource) resourceRepo: Repository<Resource>,
  ) {
    this.init();
    this.resourceService = new ResourceService(resourceRepo);
  }

  async get(playerId: number) {
    const haveResource = await this.resourceService.getByPlayerId(playerId);
    if (haveResource.length === 0) {
      // create stock row
      for (const resource of GameService.GameBasics.resources) {
        const newResource = await this.resourceService.initialize(playerId, resource);
      }
    }

    return GameService.GameBasics;
  }
}
