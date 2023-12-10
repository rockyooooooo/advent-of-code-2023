import { getLines } from "../utils.js"


/**
 *  This is such a mess, change to another idea.
 */
// function partOne(filePath) {
//   const lines = getLines(import.meta.url, filePath)
//
//   const arr = []
//   const temp = lines
//     .map(line => {
//       return line.match(/\d+/g)
//     })
//     .forEach((matchedNums, lineNum) => {
//       const numIndice = matchedNums?.map(num => lines[lineNum].indexOf(num))
//       numIndice?.forEach((numIndex, j) => {
//
//         for (let y = lineNum - 1; y <= lineNum + 1; y++) {
//           for (let x = numIndex - 1; x <= matchedNums[j].length; x++) {
//             const isInRange = (y >= 0 && y < lines.length) && (x >= 0 && x < lines[0].length)
//             if (isInRange) {
//               console.log({ y, x })
//             }
//             const isValidSymbol = isInRange && Number.isNaN(Number(lines[y][x])) && lines[y][x] !== '.'
//             if (isValidSymbol) {
//               console.log('find!!!', matchedNums[j])
//               arr.push(matchedNums[j])
//             }
//           }
//         }
//
//       })
//       console.log({ numIndice })
//     })
//
//   return arr
// }

function partOne(filePath) {
  const lines = getLines(import.meta.url, filePath)

  let ans = 0
  const regex = /\d+/g
  lines.forEach((line, lineNum) => {
    let match
    while (match = regex.exec(line)) {
      const data = { start: match.index, end: regex.lastIndex, num: match[0] }

      for (let y = lineNum - 1; y <= lineNum + 1; y++) {
        for (let x = data.start - 1; x <= data.end; x++) {
          const isInRange = (y >= 0 && y < lines.length) && (x >= 0 && x < lines[0].length)
          if (isInRange && lines[y][x] !== '.' && Number.isNaN(Number(lines[y][x]))) {
            ans += Number(data.num)
          }
        }
      }
    }
  })

  return ans
}

console.log(partOne('part-one-example.txt'))
console.log(partOne('part-one-input.txt'))



function partTwo(filePath) {
  const lines = getLines(import.meta.url, filePath)

  let ans = 0
  const regex = /\d+/g
  const map = {}
  lines.forEach((line, lineNum) => {
    let match
    while (match = regex.exec(line)) {
      const data = { start: match.index, end: regex.lastIndex, num: match[0] }

      for (let y = lineNum - 1; y <= lineNum + 1; y++) {
        for (let x = data.start - 1; x <= data.end; x++) {
          const isInRange = (y >= 0 && y < lines.length) && (x >= 0 && x < lines[0].length)
          if (isInRange && lines[y][x] !== '.' && Number.isNaN(Number(lines[y][x]))) {
            const key = `x:${x},y${y}`
            const adjacentNums = map[key]
            if (adjacentNums) {
              adjacentNums.push(data.num)
            }
            else {
              map[key] = [data.num]
            }
          }
        }
      }
    }

  })

  ans = Object.values(map)
    .filter(nums => nums.length === 2)
    .map(nums => nums[0] * nums[1])
    .reduce((s, v) => s + v)
  return ans
}

console.log(partTwo('part-two-example.txt'))
console.log(partTwo('part-two-input.txt'))

