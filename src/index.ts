type RgbType = {
  r: number
  g: number
  b: number
}

export type XyzType = {
  x: number
  y: number
  z: number
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

  toXyz(): XyzType {
    const srgbR = this.r / 255,
      srgbG = this.g / 255,
      srgbB = this.b / 255

    const toLinear = (v: number): number => {
      return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92
    }

    const linearR = toLinear(srgbR),
      linearG = toLinear(srgbG),
      linearB = toLinear(srgbB)

    const upR = linearR * 100,
      upG = linearG * 100,
      upB = linearB * 100

    const x = upR * 0.4124 + upG * 0.3576 + upB * 0.1805
    const y = upR * 0.2126 + upG * 0.7152 + upB * 0.0722
    const z = upR * 0.0193 + upG * 0.1192 + upB * 0.9505

    return { x, y, z }
  }
}

export default gf
