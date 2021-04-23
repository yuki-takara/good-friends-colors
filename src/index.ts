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
    if (r < 0 || 255 < r || g < 0 || 255 < g || b < 0 || 255 < b) {
      console.error('value must be between 0 and 255.')
      console.warn('and force to { r: 0, g: 0, b: 0 }')
      this.r = 0
      this.g = 0
      this.b = 0
      return
    }

    this.r = r
    this.g = g
    this.b = b
  }
}

export default gf
