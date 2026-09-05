import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import { join } from "path";

const YAML_CONFIG_FILENAME = "config.yaml";

type DatabaseConfigurationType = {
  url: string;
  port: number;
  name: string;
  user: string;
  password: string;
};

/** what a player starts with, and how much they can hold, per resource id */
type ResourceSettings = {
  startCapacity: Record<number, number>;
  basicStart: Record<number, number>;
};

type QueueSettings = {
  building: number;
};

type GameFactorSettings = {
  crewUpkeep: number;
  captainUpkeep: number;
  shipUpkeep: number;
  shipSpeed: number;
  maxBuildingQueue: number;
  patch: string;
  realm: string;
  /** how long a game day lasts in real seconds, the tick every job runs on */
  dayInSeconds: number;
  resources: ResourceSettings;
  queue: QueueSettings;
};

type ConfigurationType = {
  db: DatabaseConfigurationType;
  game: GameFactorSettings;
};

const configuration = () => {
  return yaml.load(readFileSync(join(__dirname, "../../", YAML_CONFIG_FILENAME), "utf8")) as Record<
    string,
    any
  > as ConfigurationType;
};

const config = configuration();

export default config;
