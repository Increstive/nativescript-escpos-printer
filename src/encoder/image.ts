'use strict';
// import getPixels from "get-pixels/node-pixels";
// import { NdArray } from "ndarray";
import { PNG } from "pngjs/browser";

export type ImageMimeType = 'image/png' | 'image/jpg' | 'image/jpeg' | 'image/gif' | 'image/bmp';

/**
 * [Image description]
 * @param {[type]} pixels [description]
 */
export default class Image {
  private readonly pixels: PNG;
  private readonly data: boolean[] = [];

  constructor(pixels: PNG) {
    this.pixels = pixels;

    const rgbaData: number[][] = [];

    for (let i = 0; i < this.pixels.data.length; i += 4) {
      rgbaData.push(
        new Array(4).fill(0).map((_, b) => this.pixels.data[i + b])
      );
    }

    this.data = rgbaData.map(
      ([r, g, b, a]) => !(a != 0 && r > 200 && g > 200 && b > 200),
    )
  }

  // private get size() {
  //   return {
  //     width: this.pixels.width,
  //     height: this.pixels.height,
  //     colors: this.pixels.data,
  //   };
  // }

  /**
   * [toRaster description]
   * @return {[type]} [description]
   */
  toRaster() {
    const result = [];
    const { width, height } = this.pixels;

    // n blocks of lines
    const n = Math.ceil(width / 8);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < n; x++) {
        for (let b = 0; b < 8; b++) {
          const i = x * 8 + b;

          if (result[y * n + x] === undefined) {
            result[y * n + x] = 0;
          }

          const c = x * 8 + b;
          if (c < width) {
            if (this.data[y * width + i]) {
              result[y * n + x] += (0x80 >> (b & 0x7));
            }
          }
        }
      }
    }
    return {
      data: result,
      width: n,
      height: height
    };
  }

  /**
   * Load image from URL
   * @param  {[string]}   url      [description]
   * @param  {[type]}   type     [description]
   * @return {[Promise<Image>]}            [description]
   */
  static load(url: string, type: ImageMimeType | null = null): Image {
    const buffer = Buffer.from(url, 'base64');
    const png = PNG.sync.read(buffer);
    return new Image(png);
  }
};
