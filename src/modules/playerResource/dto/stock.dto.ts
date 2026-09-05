import { PlayerResource } from "../entities/player-resource.entity";

/** every player's stock, kept in memory so a tick does not read the table */
export type Stock = {
  [playerId: number]: PlayerResource[];
};
