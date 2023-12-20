import fs from "fs";
import path from "path";
import { getDirName } from "../utils/utils.js";

function partOne(filePath) {
  const fullPath = path.join(getDirName(import.meta.url), filePath);
  const text = fs.readFileSync(fullPath, 'utf8');

  const lines = text.split('\n');
  const types = {}
  const cards = {}

  lines
    .forEach(line => {
      const [card, point] = line.split(/\s+/)

      cards[card] = point

      const obj = {}
      for (let i = 0; i < card.length; i++) {
        const num = card[i]
        obj[num] = obj[num] ? obj[num] + 1 : 1
      }

      if (Object.values(obj).includes(5)) {
        types[card] = 7
      }
      else if (Object.values(obj).includes(4)) {
        types[card] = 6
      }
      else if (Object.values(obj).includes(3) && Object.values(obj).includes(2)) {
        types[card] = 5
      }
      else if (Object.values(obj).includes(3)) {
        types[card] = 4
      }
      else if (Object.values(obj).filter(n => n === 2).length === 2) {
        types[card] = 3
      }
      else if (Object.values(obj).filter(n => n === 2).length === 1) {
        types[card] = 2
      }
      else {
        types[card] = 1
      }
    })

  function compareFn (a, b) {
    if (types[a] > types[b]) {
      return 1
    }
    else if (types[b] > types[a]) {
      return -1
    }
    else {
      const rank = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
      for (let i = 0; i < a.length; i++) {
        if (rank.indexOf(a[i]) > rank.indexOf(b[i])) {
          return 1
        }
        if (rank.indexOf(a[i]) < rank.indexOf(b[i])) {
          return -1
        }
      }
    }
  }

  const temp = Object.keys(types).sort(compareFn)
  let ans = 0
  temp.forEach((n, index) => {
    const value = cards[n] * (index + 1)
    ans += value
  })

  return ans
}

console.log(partOne('part-one-example.txt'));
console.log(partOne('part-one-input.txt'));

// function partTwo(filePath) {
//     const fullPath = path.join(getDirName(import.meta.url), filePath);
//     const text = fs.readFileSync(fullPath, 'utf8');
// }

// console.log(partTwo('part-two-example.txt'));
// console.log(partTwo('part-two-input.txt'));
