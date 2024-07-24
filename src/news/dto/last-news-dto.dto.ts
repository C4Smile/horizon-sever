import { AutoMap } from "@automapper/classes";

export class LastNewsDto {
  @AutoMap()
  id: number;

  @AutoMap()
  title: string;
  @AutoMap()
  urlName: string;

  tag: string;
  image: string;
}
