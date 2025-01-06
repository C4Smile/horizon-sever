import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Building } from "./entities/building.entity";

// dto
import { AddModelDto } from "../models/dto/add-model.dto";
import { UpdateModelDto } from "../models/dto/update-model.dto";
import { Stock } from "./jobs/stock.dto";
import { GameBuildingDto } from "../game/dto/building/game-building.dto";

// config
import config from "src/config/configuration";

@Injectable()
export class BuildingService extends CrudService<Building, AddModelDto, UpdateModelDto> {
  static Queue: Stock;

  private async init() {
    BuildingService.Queue = {};
    const allStock = await this.entityService.find();

    // grouping by player
    allStock.forEach((stock) => {
      if (!BuildingService.Queue[stock.playerId]) {
        BuildingService.Queue[stock.playerId] = [];
      }
      BuildingService.Queue[stock.playerId].push(stock);
    });
  }

  constructor(@InjectRepository(Building) private buildingService: Repository<Building>) {
    const relationships = [""];
    super(buildingService, null, relationships);

    this.init();
  }

  async getByPlayerId(id: number) {
    const playerBuildings = await this.entityService.find({
      where: {
        playerId: id,
      },
    });

    if (!playerBuildings) throw new HttpException("Buildings not Found", HttpStatus.NOT_FOUND);

    return playerBuildings;
  }

  public async checkQueue() {
    let playersWithQueue = 0;
    if (BuildingService.Queue) {
      const keys = Object.keys(BuildingService.Queue);
      for (const player of keys) {
        const currentPlayer = BuildingService.Queue[player];
        for (const building of currentPlayer) {
          if (building.inStock < building.maxCapacity) {
            building.inStock += building.currentFactor;
            await this.entityService.update(building.id, { ...building });
          }
        }
        playersWithQueue++;
      }
    }
    return {
      playersWithQueue,
    };
  }
}
