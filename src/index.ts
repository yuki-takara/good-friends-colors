import { radians, degrees, hypot, pow2, pow7 } from './math'
const { abs, atan2, cos, exp, sqrt, sin } = Math

type RgbType = { r: number; g: number; b: number }

export type XyzType = { x: number; y: number; z: number }

export type LabType = { l: number; a: number; b: number }

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

  isGoodFriend(comparisonColor: RgbType, colorDifference?: number): boolean {
    const r = this.diff(comparisonColor)

    // 人が違う色と色判断出来る範囲は2以下
    const judgmentValue = colorDifference ? colorDifference : 2
    return r < judgmentValue
  }

  diff(comparisonColor: RgbType) {
    const x = this.toLab()
    const y = gf(comparisonColor).toLab()

    return this._ciede2000(x, y)
  }

  private _ciede2000(x: LabType, y: LabType): number {
    const KL = 1
    const KC = 1
    const KH = 1
    const POW7_25 = pow7(25)

    const l1 = x.l
    const a1 = x.a
    const b1 = x.b
    const l2 = y.l
    const a2 = y.a
    const b2 = y.b

    const c1 = hypot(a1, b1)
    const c2 = hypot(a2, b2)
    const ac1c2 = (c1 + c2) / 2
    const g = 0.5 * (1 - sqrt(pow7(ac1c2) / (pow7(ac1c2) + POW7_25)))

    const a1p = (1 + g) * a1
    const a2p = (1 + g) * a2

    const c1p = sqrt(pow2(a1p) + pow2(b1))
    const c2p = sqrt(pow2(a2p) + pow2(b2))

    const h1pd = degrees(atan2(b1, a1p))
    const h1p = b1 === 0 && a1p === 0 ? 0 : h1pd > 0 ? h1pd : h1pd + 360

    const h2pd = degrees(atan2(b2, a2p))
    const h2p = b2 === 0 && a2p === 0 ? 0 : h2pd > 0 ? h2pd : h2pd + 360

    const dlp = l2 - l1
    const dcp = c2p - c1p
    const dhp =
      2 *
      sqrt(c1p * c2p) *
      sin(
        radians(
          c1 * c2 === 0
            ? 0
            : abs(h2p - h1p) <= 180
            ? h2p - h1p
            : h2p - h1p > 180
            ? h2p - h1p - 360
            : h2p - h1p + 360
        ) / 2
      )

    const al = (l1 + l2) / 2
    const acp = (c1p + c2p) / 2

    let ahp
    if (c1 * c2 === 0) {
      ahp = h1p + h2p
    } else if (abs(h1p - h2p) <= 180) {
      ahp = (h1p + h2p) / 2
    } else if (abs(h1p - h2p) > 180 && h1p + h2p < 360) {
      ahp = (h1p + h2p + 360) / 2
    } else {
      ahp = (h1p + h2p - 360) / 2
    }

    const t =
      1 -
      0.17 * cos(radians(ahp - 30)) +
      0.24 * cos(radians(2 * ahp)) +
      0.32 * cos(radians(3 * ahp + 6)) -
      0.2 * cos(radians(4 * ahp - 63))
    const dro = 30 * exp(-pow2((ahp - 275) / 25))
    const rc = sqrt(pow7(acp) / (pow7(acp) + POW7_25))
    const sl = 1 + (0.015 * pow2(al - 50)) / sqrt(20 + pow2(al - 50))
    const sc = 1 + 0.045 * acp
    const sh = 1 + 0.015 * acp * t
    const rt = -2 * rc * sin(radians(2 * dro))

    return sqrt(
      pow2(dlp / (sl * KL)) +
        pow2(dcp / (sc * KC)) +
        pow2(dhp / (sh * KH)) +
        rt * (dcp / (sc * KC)) * (dhp / (sh * KH))
    )
  }
}

export default gf
