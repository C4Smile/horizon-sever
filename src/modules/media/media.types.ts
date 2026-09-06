/** What a caller may ask for in the query string. */
export type ImageTransform = {
  /** target width in pixels */
  w?: number;
  /** target height in pixels */
  h?: number;
  /** 1 to 100 */
  q?: number;
  /** how the picture meets the box when both sides are given */
  fit?: "cover" | "contain" | "inside";
  /** output format; webp unless asked otherwise */
  f?: "webp" | "avif" | "jpeg" | "png";
};
