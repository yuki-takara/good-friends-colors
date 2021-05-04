import gf, { GfColor, LabType, XyzType } from '../src'

describe('gf', () => {
  // 正常値・異常値でもGfColorクラスが返る事を確認

  test('confirm that class returns（normal value）', () => {
    const rgb = { r: 0, g: 128, b: 255 }
    expect(gf(rgb)).toBeInstanceOf(GfColor)
  })

  test('confirm that class returns（outliers）', () => {
    const rgb = { r: -1, g: 256, b: 255 }
    expect(gf(rgb)).toBeInstanceOf(GfColor)
  })

})

describe('toXyz', () => {
  // example: https://www.easyrgb.com/en/convert.php

  test('normal value test 1', () => {
    const rgb = { r: 255, g: 0, b: 0 }
    const answer: XyzType = { x: 41.246, y: 21.267, z: 1.933 }

    const xyz = gf(rgb).toXyz()
    expect(toRound(xyz)).toStrictEqual(toRound(answer))
  })

  test('normal value test 2', () => {
    const rgb = { r: 20, g: 189, b: 212 }
    const answer: XyzType = { x: 30.364, y: 41.293, z: 68.645 }

    const xyz = gf(rgb).toXyz()
    expect(toRound(xyz)).toStrictEqual(toRound(answer))
  })

  test('normal value test 3 (white)', () => {
    const rgb = { r: 255, g: 255, b: 255 }
    const answer: XyzType = { x: 95.047, y: 100.0, z: 108.883 }

    const xyz = gf(rgb).toXyz()
    expect(toRound(xyz)).toStrictEqual(toRound(answer))
  })

  test('normal value test 4 (black)', () => {
    const rgb = { r: 0, g: 0, b: 0 }
    const answer: XyzType = { x: 0, y: 0, z: 0 }

    const xyz = gf(rgb).toXyz()
    expect(toRound(xyz)).toStrictEqual(toRound(answer))
  })

  const toRound = ({ x, y, z }: XyzType): XyzType => {
    const newX = Math.round(x)
    const newY = Math.round(y)
    const newZ = Math.round(z)
    return { x: newX, y: newY, z: newZ }
  }
})

describe('toLab', () => {
  test('normal value test 1', () => {
    const rgb = { r: 255, g: 0, b: 0 }
    const answer: LabType = { l: 53.241, a: 80.092, b: 67.203 }

    const lab = gf(rgb).toLab()
    expect(toRound(lab)).toStrictEqual(toRound(answer))
  })

  test('normal value test 2', () => {
    const rgb = { r: 20, g: 189, b: 212 }
    const answer: LabType = { l: 70.381, a: -30.526, b: -22.56 }

    const lab = gf(rgb).toLab()
    expect(toRound(lab)).toStrictEqual(toRound(answer))
  })

  test('normal value test 3', () => {
    const rgb = { r: 240, g: 20, b: 100 }
    const answer: LabType = { l: 51.783, a: 77.752, b: 16.214 }

    const lab = gf(rgb).toLab()
    expect(toRound(lab)).toStrictEqual(toRound(answer))
  })

  test('normal value test 4', () => {
    const rgb = { r: 255, g: 255, b: 254 }
    const answer: LabType = { l: 99.975, a: -0.175, b: 0.476 }

    const lab = gf(rgb).toLab()
    expect(toRound(lab)).toStrictEqual(toRound(answer))
  })

  test('normal value test 5 (white)', () => {
    const rgb = { r: 255, g: 255, b: 255 }
    const answer: LabType = { l: 100, a: 0, b: -0 }

    const lab = gf(rgb).toLab()
    expect(toRound(lab)).toStrictEqual(toRound(answer))
  })

  test('normal value test 6 (black)', () => {
    const rgb = { r: 0, g: 0, b: 0 }
    const answer: LabType = { l: 0, a: 0, b: 0 }

    const lab = gf(rgb).toLab()
    expect(toRound(lab)).toStrictEqual(toRound(answer))
  })

  const toRound = ({ l, a, b }: LabType): LabType => {
    const newL = Math.round(l * 10) / 10
    const newA = Math.round(a * 10) / 10
    const newB = Math.round(b * 10) / 10
    return { l: newL, a: newA, b: newB }
  }
})
