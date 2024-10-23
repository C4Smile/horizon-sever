import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { AppTranslation } from "src/modules/appTranslation/entities/app-translation.entity";

/**
 * @class App
 * @description Represents an application
 */
@Entity({ name: "app" })
export class App extends Model {
  @Column({ type: "text" })
  name: string = "";

  @OneToMany(() => AppTranslation, (translation) => translation.app)
  translations: AppTranslation[];
}
