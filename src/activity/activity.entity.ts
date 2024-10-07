import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";
import { Tag } from "src/tags/tag.entity";

/**
 * @class Activity
 * @description Represents a activity
 */
@Entity({ name: "activity" })
export class Activity extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  title: string = "";

  @AutoMap()
  @Column({ type: "text", unique: true })
  urlName: string = "";

  @AutoMap()
  @Column({ type: "text" })
  description: string = "";

  @AutoMap()
  @Column({ type: "text" })
  content: string = "";

  @AutoMap()
  @Column({ type: "text" })
  entity: string = "";

  @Column({ type: "int" })
  imageId: number = 0;

  @ManyToOne(() => Photo)
  image: Photo;

  @ManyToMany(() => Tag, (activityTag) => activityTag.News, { cascade: true })
  @AutoMap()
  @JoinTable({
    name: "activity-has-tag",
    joinColumn: {
      name: "activityId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "activityTagsActivityId",
    },
    inverseJoinColumn: {
      name: "tagId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "activityTagsTagId",
    },
  })
  activityHasTag: Tag[];
}
