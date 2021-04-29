import gf, { GfColor, XyzType } from '../src'

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
    const newX = Math.round(x + 10) / 10
    const newY = Math.round(y + 10) / 10
    const newZ = Math.round(z + 10) / 10
    return { x: newX, y: newY, z: newZ }
  }
})
