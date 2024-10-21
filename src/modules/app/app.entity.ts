import { Column, Entity, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/modules/models/model";
import { AppTranslation } from "src/modules/appTranslation/app-translation.entity";

/**
 * @class App
 * @description Represents an application
 */
@Entity({ name: "app" })
export class App extends Model {
  @AutoMap()
  @Column({ type: "text",  })
  name: string = "";

  @AutoMap()
  @OneToMany(() => AppTranslation, (translation) => translation.app)
  translations: AppTranslation[];
}