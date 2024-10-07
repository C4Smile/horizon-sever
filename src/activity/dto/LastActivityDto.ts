import { AutoMap } from "@automapper/classes";

export class LastActivityDto {
  @AutoMap()
  id: number;

  @AutoMap()
  title: string;

  @AutoMap()
  urlName: string;

  tag: string;

  image: string;
}
