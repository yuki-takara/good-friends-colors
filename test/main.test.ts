import gf, { GfColor } from '../src'

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
