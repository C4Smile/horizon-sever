import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";

// service
import { MediaService } from "./media.service";

const A_YEAR = 60 * 60 * 24 * 365;

/**
 * Sits in front of the static images. A plain request falls straight through
 * to ServeStaticModule; one that asks for a size is rendered here.
 *
 * It has to be middleware rather than a controller: nest runs every
 * middleware before any route handler, and ServeStaticModule is middleware,
 * so a controller would never see the request.
 */
@Injectable()
export class MediaMiddleware implements NestMiddleware {
  constructor(private readonly mediaService: MediaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const transform = this.mediaService.parse(
      req.query as Record<string, unknown>,
    );
    // nothing asked for: the static handler is faster at serving a file whole
    if (!this.mediaService.wants(transform)) return next();

    // req.path is relative to where the middleware is mounted, and the mount
    // swallows the whole wildcard, so it arrives as "/". The original url is
    // the only place the file name survives.
    const [fullPath] = req.originalUrl.split("?");
    const relativePath = decodeURIComponent(
      fullPath.replace(/^\/public\/images\/?/, ""),
    );

    try {
      const rendered = await this.mediaService.render(relativePath, transform);
      if (!rendered) return next();

      res.setHeader("Content-Type", rendered.mime);
      // the url carries every option, so a hit is safe to keep for good
      res.setHeader("Cache-Control", `public, max-age=${A_YEAR}, immutable`);
      res.send(rendered.body);
    } catch {
      // a picture that cannot be transformed is still a picture
      next();
    }
  }
}
