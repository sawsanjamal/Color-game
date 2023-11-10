import { randomNumber, randomValueInRange } from "./utils.js";
const MAX_RGB_VALUE = 255;
export default class Rgb {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  static generate() {
    return new this(
      randomNumber({ max: MAX_RGB_VALUE }),
      randomNumber({ max: MAX_RGB_VALUE }),
      randomNumber({ max: MAX_RGB_VALUE })
    );
  }
  generateSimilar(options) {
    return new this.constructor(
      randomValueInRange({
        startingValue: this.r,
        maxCutOff: MAX_RGB_VALUE,
        ...options,
      }),
      randomValueInRange({
        startingValue: this.g,
        maxCutOff: MAX_RGB_VALUE,
        ...options,
      }),
      randomValueInRange({
        startingValue: this.b,
        maxCutOff: MAX_RGB_VALUE,
        ...options,
      })
    );
  }
  toCss() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
