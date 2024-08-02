import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";
import { ServiceHasImageDto } from "./service-has-image.dto";


export class ServiceDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  description: string;

  @AutoMap()
  content: string;
  image: ServiceHasImageDto;
}
