import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { join } from "path";

// middleware
import { MediaMiddleware } from "./media.middleware";

// service
import { MediaService } from "./media.service";

// __dirname is dist/modules/media at runtime and src/modules/media in dev,
// so the project root is three levels up either way
const PUBLIC_ROOT = join(__dirname, "..", "..", "..", "public", "images");

@Module({
  providers: [
    {
      provide: MediaService,
      useFactory: () =>
        new MediaService(PUBLIC_ROOT, join(PUBLIC_ROOT, ".cache")),
    },
    MediaMiddleware,
  ],
  exports: [MediaService],
})
export class MediaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MediaMiddleware).forRoutes("public/images/*");
  }
}
