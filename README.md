

![test](https://github.com/yuki-takara/good-friends-colors/actions/workflows/test.yml/badge.svg)

![good-friends-colors](https://user-images.githubusercontent.com/10525280/126899642-8f0bb9fd-90c3-43c4-86e3-e30382b7074c.jpg)

good-friends-colorsは2つの色が似た色かどうかを判定する事が出来ます。

<br/>

## インストール

npm:

```bash
$ npm install good-friends-colors
```


yarn:

```bash
$ yarn add good-friends-colors
```

<br/>

## 使い方

### 2つの色が似ているかの判定

「**人の目で違う色と判断しづらいもの**」を`CIEDE2000色素式`と呼ばれる計算式で判定します。

<img src="https://user-images.githubusercontent.com/10525280/125183223-b6acbe00-e24f-11eb-86f1-c0c60880cce7.jpg" width="45%" />

```ts
import gf from 'good-friends-colors'

const c1 = { r: 20, g: 192, b: 59 }
const c2 = { r: 30, g: 188, b: 63 }

const result = gf(c1).isGoodFriend(c2)
console.log(result)
// => true
```

<br/><br/>

<img src="https://user-images.githubusercontent.com/10525280/125183222-b6142780-e24f-11eb-8cc2-db3bf682f1d2.jpg" width="45%" />

```ts
import gf from 'good-friends-colors'

const c1 = { r: 20, g: 192, b: 59 }
const c2 = { r: 255, g: 188, b: 63 }

const result = gf(c1).isGoodFriend(c2)
console.log(result)
// => false
```

<br/>


### 2つの色の差を求める

2つの色の差を求めます。  
こちらでも`CIEDE2000色素式`を使用しています。

<img src="https://user-images.githubusercontent.com/10525280/125183223-b6acbe00-e24f-11eb-86f1-c0c60880cce7.jpg" width="45%" />

```ts
import gf from 'good-friends-colors'

const c1 = { r: 20, g: 192, b: 59 }
const c2 = { r: 30, g: 188, b: 63 }

const result = gf(c1).diff(c2)
console.log(result)
// => 1.238409519990517
```

<br/><br/>

<img src="https://user-images.githubusercontent.com/10525280/125183222-b6142780-e24f-11eb-8cc2-db3bf682f1d2.jpg" width="45%" />

```ts
import gf from 'good-friends-colors'

const c1 = { r: 20, g: 192, b: 59 }
const c2 = { r: 255, g: 188, b: 63 }

const result = gf(c1).diff(c2)
console.log(result)
// => 40.10746575803398
```

<br/>

### オプション

似た色かを判定する際の許容値を変更出来ます。

`default: 2`

<img src="https://user-images.githubusercontent.com/10525280/125183221-b4e2fa80-e24f-11eb-9b84-f75261592b6c.jpg" width="45%" />

```ts
import gf from 'good-friends-colors'

const c1 = { r: 20, g: 192, b: 59 }
const c2 = { r: 5, g: 192, b: 120 }

const diff = gf(c1).diff(c2)
console.log(diff)
// => 9.302586534325725


const result1 = gf(c1).isGoodFriend(c2)
console.log(result1)
// => false

const result2 = gf(c1).isGoodFriend(c2, 10)
console.log(result2)
// => true
```

