import { GameResourceDto } from "src/modules/game/dto/resource/game-resource.dto";

export type InitializeDto = {
  playerId: number;
  resources: GameResourceDto[];
};
