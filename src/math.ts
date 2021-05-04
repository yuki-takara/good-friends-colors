// helper functions for CIEDE2000

export const radians = (n: number): number => (n * Math.PI) / 180

export const degrees = (n: number) => n * (180 / Math.PI)

export const hypot = (a: number, b: number) => Math.sqrt(a * a + b * b)

export const pow2 = (n: number) => n * n

export const pow7 = (n: number) => n * n * n * n * n * n * n
