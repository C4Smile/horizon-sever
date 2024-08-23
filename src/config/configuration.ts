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

type ChatbotConfigurationType = {
  api: string;
  token: string;
};

type ConfigurationType = {
  db: DatabaseConfigurationType;
  chatbot: ChatbotConfigurationType;
};

const configuration = () => {
  return yaml.load(readFileSync(join(__dirname, "../../", YAML_CONFIG_FILENAME), "utf8")) as Record<
    string,
    any
  > as ConfigurationType;
};

const config = configuration();

export default config;
