type RgbType = {
  r: number
  g: number
  b: number
}

const gf = ({ r, g, b }: RgbType): GfColor => {
  return new GfColor({ r, g, b })
}

export class GfColor {
  private readonly r: number
  private readonly g: number
  private readonly b: number

  constructor({ r, g, b }: RgbType) {
    this.r = r
    this.g = g
    this.b = b
  }
}

export default gf
