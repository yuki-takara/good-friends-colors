

![test](https://github.com/yuki-takara/good-friends-colors/actions/workflows/test.yml/badge.svg)

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

<div style="display: flex;">
  <div>
    <div style="width: 120px; height: 120px; background-color: rgb(20, 192, 59)"></div>
    <div>R: 20 G: 192 B: 59</div>
  </div>
  <div style="margin-left: 30px;">
    <div style="width: 120px; height: 120px; background-color: rgb(30, 188, 63)"></div>
    <div>R: 30 G: 188 B: 63</div>
  </div>
</div>

```ts
import gf from 'good-friends-colors'

const c1 = { r: 20, g: 192, b: 59 }
const c2 = { r: 30, g: 188, b: 63 }

const result = gf(c1).isGoodFriend(c2)
console.log(result)
// => true
```

<br/><br/>

<div style="display: flex;">
  <div>
    <div style="width: 120px; height: 120px; background-color: rgb(20, 192, 59)"></div>
    <div>R: 20 G: 192 B: 59</div>
  </div>
  <div style="margin-left: 30px;">
    <div style="width: 120px; height: 120px; background-color: rgb(255, 188, 63)"></div>
    <div>R: 255 G: 188 B: 63</div>
  </div>
</div>

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

<div style="display: flex;">
  <div>
    <div style="width: 120px; height: 120px; background-color: rgb(20, 192, 59)"></div>
    <div>R: 20 G: 192 B: 59</div>
  </div>
  <div style="margin-left: 30px;">
    <div style="width: 120px; height: 120px; background-color: rgb(30, 188, 63)"></div>
    <div>R: 30 G: 188 B: 63</div>
  </div>
</div>

```ts
import gf from 'good-friends-colors'

const c1 = { r: 20, g: 192, b: 59 }
const c2 = { r: 30, g: 188, b: 63 }

const result = gf(c1).diff(c2)
console.log(result)
// => 1.238409519990517
```

<br/><br/>

<div style="display: flex;">
  <div>
    <div style="width: 120px; height: 120px; background-color: rgb(20, 192, 59)"></div>
    <div>R: 20 G: 192 B: 59</div>
  </div>
  <div style="margin-left: 30px;">
    <div style="width: 120px; height: 120px; background-color: rgb(255, 188, 63)"></div>
    <div>R: 255 G: 188 B: 63</div>
  </div>
</div>

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

<div style="display: flex;">
  <div>
    <div style="width: 120px; height: 120px; background-color: rgb(20, 192, 59)"></div>
    <div>R: 20 G: 192 B: 59</div>
  </div>
  <div style="margin-left: 30px;">
    <div style="width: 120px; height: 120px; background-color: rgb(5, 192, 120)"></div>
    <div>R: 5 G: 192 B: 120</div>
  </div>
</div>

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

