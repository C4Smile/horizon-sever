import { Tag } from "./tag.entity";
import { News } from "src/news/news.entity";
import { Event } from "src/event/event.entity";

const getTagAttribute = (entity: any) => {
  if (entity.newsHasTag) return entity.newsHasTag;
  if (entity.eventHasTag) return entity.eventHasTag;
};

export const filterByTags = (array: any[], tags: string) => {
  // TODO Dictionary with keys tags

  if (tags.length) {
    const parsedTags = tags.split("|").map((tag) => tag.toLowerCase());
    const filterByTags = array.filter(
      (entity: any) =>
        getTagAttribute(entity)?.some((tag: Tag) => parsedTags.indexOf(tag.name.toLowerCase()) >= 0),
    );

    return filterByTags;
  }

  return array;
};
