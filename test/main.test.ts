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

describe('ciede2000', () => {
  test('normal value test group 1', () => {
    ciede2000test(2.0425, 50.0, 2.6772, -79.7751, 50.0, 0.0, -82.7485)
    ciede2000test(2.8615, 50.0, 3.1571, -77.2803, 50.0, 0.0, -82.7485)
    ciede2000test(3.4412, 50.0, 2.8361, -74.02, 50.0, 0.0, -82.7485)
    ciede2000test(1.0, 50.0, -1.3802, -84.2814, 50.0, 0.0, -82.7485)
    ciede2000test(1.0, 50.0, -1.1848, -84.8006, 50.0, 0.0, -82.7485)
    ciede2000test(1.0, 50.0, -0.9009, -85.5211, 50.0, 0.0, -82.7485)
  })

  test('normal value test group 2', () => {
    ciede2000test(2.3669, 50.0, 0.0, 0.0, 50.0, -1.0, 2.0)
    ciede2000test(2.3669, 50.0, -1.0, 2.0, 50.0, 0.0, 0.0)
    ciede2000test(7.1792, 50.0, 2.49, -0.001, 50.0, -2.49, 0.0009)
    ciede2000test(7.1792, 50.0, 2.49, -0.001, 50.0, -2.49, 0.001)
    ciede2000test(7.2195, 50.0, 2.49, -0.001, 50.0, -2.49, 0.0011)
    ciede2000test(7.2195, 50.0, 2.49, -0.001, 50.0, -2.49, 0.0012)
    ciede2000test(4.8045, 50.0, -0.001, 2.49, 50.0, 0.0009, -2.49)
    ciede2000test(4.8045, 50.0, -0.001, 2.49, 50.0, 0.001, -2.49)
    ciede2000test(4.7461, 50.0, -0.001, 2.49, 50.0, 0.0011, -2.49)
    ciede2000test(4.3065, 50.0, 2.5, 0.0, 50.0, 0.0, -2.5)
  })

  test('normal value test group 3', () => {
    ciede2000test(27.1492, 50.0, 2.5, 0.0, 73.0, 25.0, -18.0)
    ciede2000test(22.8977, 50.0, 2.5, 0.0, 61.0, -5.0, 29.0)
    ciede2000test(31.903, 50.0, 2.5, 0.0, 56.0, -27.0, -3.0)
    ciede2000test(19.4535, 50.0, 2.5, 0.0, 58.0, 24.0, 15.0)
  })

  test('normal value test group 4', () => {
    ciede2000test(1.0, 50.0, 2.5, 0.0, 50.0, 3.1736, 0.5854)
    ciede2000test(1.0, 50.0, 2.5, 0.0, 50.0, 3.2972, 0.0)
    ciede2000test(1.0, 50.0, 2.5, 0.0, 50.0, 1.8634, 0.5757)
    ciede2000test(1.0, 50.0, 2.5, 0.0, 50.0, 3.2592, 0.335)
  })

  test('normal value test group 5', () => {
    ciede2000test(1.2644, 60.2574, -34.0099, 36.2677, 60.4626, -34.1751, 39.4387)
    ciede2000test(1.263, 63.0109, -31.0961, -5.8663, 62.8187, -29.7946, -4.0864)
    ciede2000test(1.8731, 61.2901, 3.7196, -5.3901, 61.4292, 2.248, -4.962)
    ciede2000test(1.8645, 35.0831, -44.1164, 3.7933, 35.0232, -40.0716, 1.5901)
    ciede2000test(2.0373, 22.7233, 20.0904, -46.694, 23.0331, 14.973, -42.5619)
    ciede2000test(1.4146, 36.4612, 47.858, 18.3852, 36.2715, 50.5065, 21.2231)
    ciede2000test(1.4441, 90.8027, -2.0831, 1.441, 91.1528, -1.6435, 0.0447)
    ciede2000test(1.5381, 90.9257, -0.5406, -0.9208, 88.6381, -0.8985, -0.7239)
    ciede2000test(0.6377, 6.7747, -0.2908, -2.4247, 5.8714, -0.0985, -2.2286)
    ciede2000test(0.9082, 2.0776, 0.0795, -1.135, 0.9033, -0.0636, -0.5514)
  })

  const ciede2000test = (
    expected: number,
    l1: number,
    a1: number,
    b1: number,
    l2: number,
    a2: number,
    b2: number
  ) => {
    const dummyRgb = { r: 0, g: 0, b: 0 }
    const x: LabType = { l: l1, a: a1, b: b1 }
    const y: LabType = { l: l2, a: a2, b: b2 }
    const ret = (gf(dummyRgb) as any)._ciede2000(x, y)

    expect(toRound(ret)).toBe(toRound(expected))
  }

  const toRound = (n: number): number => Math.round(n * 10000) / 10000
})

describe('isGoodFriend', () => {
  test('truthy 1', () => {
    const c1 = { r: 20, g: 192, b: 59 }
    const c2 = { r: 30, g: 188, b: 63 }

    const ret = gf(c1).isGoodFriend(c2)

    expect(ret).toBeTruthy()
  })

  test('truthy 2', () => {
    const c1 = { r: 190, g: 204, b: 29 }
    const c2 = { r: 187, g: 200, b: 34 }

    const ret = gf(c1).isGoodFriend(c2)

    expect(ret).toBeTruthy()
  })

  test('falsy 1', () => {
    const c1 = { r: 255, g: 0, b: 0 }
    const c2 = { r: 0, g: 255, b: 0 }

    const ret = gf(c1).isGoodFriend(c2)

    expect(ret).toBeFalsy()
  })

  test('falsy 2', () => {
    const c1 = { r: 255, g: 255, b: 255 }
    const c2 = { r: 0, g: 0, b: 0 }

    const ret = gf(c1).isGoodFriend(c2)

    expect(ret).toBeFalsy()
  })

  test('falsy 3', () => {
    const c1 = { r: 67, g: 218, b: 32 }
    const c2 = { r: 77, g: 205, b: 44 }

    const ret = gf(c1).isGoodFriend(c2)

    expect(ret).toBeFalsy()
  })

  test('falsy 4', () => {
    const c1 = { r: 34, g: 86, b: 152 }
    const c2 = { r: 37, g: 93, b: 151 }

    const ret = gf(c1).isGoodFriend(c2)

    expect(ret).toBeFalsy()
  })

  test('truthy 1 (with color difference)', () => {
    const c1 = { r: 34, g: 86, b: 152 }
    const c2 = { r: 37, g: 93, b: 151 }

    const ret = gf(c1).isGoodFriend(c2, 3)

    expect(ret).toBeTruthy()
  })

  test('falsy 1 (with color difference)', () => {
    const c1 = { r: 34, g: 86, b: 152 }
    const c2 = { r: 37, g: 93, b: 151 }

    const ret = gf(c1).isGoodFriend(c2, 2.5)

    expect(ret).toBeFalsy()
  })
})
