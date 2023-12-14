import fs from "fs"
import path from "path"
import { getDirName } from "../utils/utils.js"

function partOne(filePath: string) {
  const fullPath = path.join(getDirName(import.meta.url), filePath)
  const text = fs.readFileSync(fullPath, 'utf8')

  const times = text.split('\n')[0].split(/ +/).slice(1).map(Number)
  const distances = text.split('\n')[1].split(/ +/).slice(1).map(Number)

  const rlt: number[] = []

  times.forEach((time, index) => {
    let win = 0
    for (let t = 0; t <= time; t++) {
      if (t * (time - t) > distances[index]) {
        win++
      }
    }
    rlt.push(win)
  })

  const ans = rlt.reduce((acc, cur) => acc * cur)

  return ans
}

console.log(partOne('part-one-example.txt'))
console.log(partOne('part-one-input.txt'))



function partTwo(filePath: string) {
  const fullPath = path.join(getDirName(import.meta.url), filePath)
  const text = fs.readFileSync(fullPath, 'utf8')

  const time = Number(text.split('\n')[0].split(/ +/).slice(1).reduce((acc, num) => acc + num, ''))
  const distance = Number(text.split('\n')[1].split(/ +/).slice(1).reduce((acc, num) => acc + num, ''))

  const rlt: number[] = []

  let win = 0
  for (let t = 0; t <= time; t++) {
    if (t * (time - t) > distance) {
      win++
    }
  }
  rlt.push(win)

  const ans = rlt.reduce((acc, cur) => acc * cur)

  return ans
}

console.log(partTwo('part-two-example.txt'))
console.log(partTwo('part-two-input.txt'))

