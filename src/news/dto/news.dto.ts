import { AutoMap } from "@automapper/classes";

// dto
import { TagDto } from "src/tags/dto/tag.dto";
import { ModelDto } from "src/models/model.dto";
import { NewsHasImageDto } from "src/newsHasImage/dto/news-has-image.dto";

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
  newsHasTag: TagDto[];

  newsHasImage: NewsHasImageDto[];
}
