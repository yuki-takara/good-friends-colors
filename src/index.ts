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

export type LabType = {
  l: number
  a: number
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

    const x = (linearR * 0.4124 + linearG * 0.3576 + linearB * 0.1805) * 100
    const y = (linearR * 0.2126 + linearG * 0.7152 + linearB * 0.0722) * 100
    const z = (linearR * 0.0193 + linearG * 0.1192 + linearB * 0.9505) * 100

    return { x, y, z }
  }

  toLab(): LabType {
    // https://ja.wikipedia.org/wiki/Lab%E8%89%B2%E7%A9%BA%E9%96%93#CIE_XYZ_%E3%81%A8%E3%81%AE%E5%A4%89%E6%8F%9B
    // example: http://www.easyrgb.com/en/math.php

    const { x, y, z } = this.toXyz()

    const refX = 95.047, // Observer= 2°, Illuminant= D65
      refY = 100,
      refZ = 108.883

    const X = x / refX,
      Y = y / refY,
      Z = z / refZ

    const f = (t: number) => {
      return t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 4 / 29
    }

    const l = 116 * f(Y) - 16
    const a = 500 * (f(X) - f(Y))
    const b = 200 * (f(Y) - f(Z))

    return { l, a, b }
  }
}

export default gf
