# good-friends-colors

```bash
$ yarn add good-friends-colors
```

```ts
import gf from 'good-friends-colors'

const c1 = { r: 20, g: 192, b: 59 }
const c2 = { r: 30, g: 188, b: 63 }
const c3 = { r: 255, g: 255, b: 255 }

const result1 = gf(c1).isGoodFriend(c2)
console.log(result1)
// => true

const result2 = gf(c1).isGoodFriend(c3)
console.log(result2)
// => false
```