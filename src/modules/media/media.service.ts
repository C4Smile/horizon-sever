import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { join, extname } from "path";

import { Injectable, Logger } from "@nestjs/common";
import sharpModule = require("sharp");

/**
 * sharp declares an esm default in its types but its module.exports is the
 * callable itself. This project compiles to commonjs with
 * allowSyntheticDefaultImports and without esModuleInterop, so a plain default
 * import type checks and then hands back undefined at runtime. Reconciled once
 * here rather than at every call.
 */
const sharp = (sharpModule.default ??
  sharpModule) as unknown as typeof sharpModule.default;

// types
import { ImageTransform } from "./media.types";

const MAX_SIDE = 4000;
const FORMATS = ["webp", "avif", "jpeg", "png"] as const;
const FITS = ["cover", "contain", "inside"] as const;

/**
 * Resizes a picture once and keeps the result on disk. The art is stored at
 * full size, and most of the screens that ask for it draw it small: a table
 * cell wants forty pixels of a picture that is over a thousand wide. Sending
 * the original for that is what makes the game unusable on a slow line.
 */
@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    private readonly sourceRoot: string,
    private readonly cacheRoot: string,
  ) {}

  /** Reads the query string, ignoring anything it does not understand. */
  parse(query: Record<string, unknown>): ImageTransform {
    const num = (value: unknown, max: number) => {
      const n = Number(value);
      return Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), max) : undefined;
    };

    const f = FORMATS.find((known) => known === query.f);
    const fit = FITS.find((known) => known === query.fit);

    return {
      w: num(query.w, MAX_SIDE),
      h: num(query.h, MAX_SIDE),
      q: num(query.q, 100),
      f,
      fit,
    };
  }

  /** Whether the request asks for anything at all. */
  wants(transform: ImageTransform) {
    return Object.values(transform).some((v) => v !== undefined);
  }

  /**
   * @param relativePath - the picture, relative to the public images root
   * @param transform - what to do to it
   * @returns the bytes and the mime type, or null when there is no such file
   */
  async render(relativePath: string, transform: ImageTransform) {
    const source = join(this.sourceRoot, relativePath);
    if (!source.startsWith(this.sourceRoot) || !existsSync(source)) return null;

    const format = transform.f ?? "webp";
    const cached = join(this.cacheRoot, this.cacheName(relativePath, transform, format));

    if (existsSync(cached))
      return { body: await readFile(cached), mime: `image/${format}` };

    const pipeline = sharp(source);
    if (transform.w || transform.h)
      pipeline.resize({
        width: transform.w,
        height: transform.h,
        fit: transform.fit ?? "cover",
        withoutEnlargement: true,
      });

    const body = await pipeline
      .toFormat(format, { quality: transform.q ?? 82 })
      .toBuffer();

    await mkdir(this.cacheRoot, { recursive: true });
    await writeFile(cached, body);
    this.logger.debug(`rendered ${relativePath} ${JSON.stringify(transform)}`);

    return { body, mime: `image/${format}` };
  }

  /** One file per source and set of options, so a rename never collides. */
  private cacheName(
    relativePath: string,
    transform: ImageTransform,
    format: string,
  ) {
    const key = `${relativePath}|${JSON.stringify(transform)}`;
    const digest = createHash("sha1").update(key).digest("hex").slice(0, 16);
    const stem = relativePath.replace(extname(relativePath), "").replace(/\W+/g, "-");
    return `${stem}-${digest}.${format}`;
  }
}
