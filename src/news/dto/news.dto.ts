import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/dto/model.dto";
import { NewsHasImageDto } from "src/newsHasImage/dto/news-has-image.dto";
import { NewsHasTagDto } from "./news-has-tag.dto";

export class NewsDto extends ModelDto {
  @AutoMap()
  title: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  description: string;

  @AutoMap()
  content: string;

  @AutoMap()
  subtitle: string;

  @AutoMap()
  newsHasTag: NewsHasTagDto[];

  newsHasImage: NewsHasImageDto[];
}
