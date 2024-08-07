import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/dto/model.dto";
import { EventHasTagDto } from "./event-has-tag.dto";
import { EventHasLinkDto } from "./event-has-link.dto";
import { EventHasScheduleDto } from "./event-has-schedule.dto";
import { EventHasImageDto } from "src/eventHasImage/dto/event-has-image.dto";

export class EventDto extends ModelDto {
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
  address: string;

  @AutoMap()
  location: string;

  eventHasSchedule: EventHasScheduleDto[];

  eventHasLink: EventHasLinkDto[];

  eventHasTag: EventHasTagDto[];

  eventHasImage: EventHasImageDto[];
}
