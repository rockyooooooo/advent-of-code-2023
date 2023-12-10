import { getLines } from "../utils.js"

function partOne(filePath) {
  const lines = getLines(import.meta.url, filePath)

  const regex = /(.+):\s+(.+)\s+\|\s+(.+)/
  const rlt = lines.map(line => {
    const [_, cardId, winningNumsInText, myNumsInText] = line.match(regex)
    const winningNums = winningNumsInText.split(/\s+/)
    const myNums = myNumsInText.split(/\s+/)
    const point = myNums.reduce((s, v) => {
      if (winningNums.includes(v)) {
        s = s === 0
          ? 1
          : s * 2
      }
      return s
    }, 0)
    return point
  })

  const ans = rlt.reduce((s, v) => s + v)
  return ans
}

console.log(partOne('part-one-example.txt'))
console.log(partOne('part-one-input.txt'))



function partTwo(filePath) {
  const lines = getLines(import.meta.url, filePath)

  const map = {}
  const regex = /(.+):\s+(.+)\s+\|\s+(.+)/
  lines.forEach(line => {
    const [_, cardIdIntext, winningNumsInText, myNumsInText] = line.match(regex)
    const cardId = Number(cardIdIntext.split(/\s+/)[1])
    const winningNums = winningNumsInText.split(/\s+/)
    const myNums = myNumsInText.split(/\s+/)

    map[cardId] = map[cardId]
      ? map[cardId] + 1
      : 1

    const currentCardCnt = map[cardId]

    const matchingNumCnt = myNums.reduce((matchNumberCnt, myNum) => {
      if (winningNums.includes(myNum)) {
        matchNumberCnt += 1
      }

      return matchNumberCnt
    }, 0)

    for (let i = 1; i <= matchingNumCnt; i++) {
      map[cardId + i] = map[cardId + i]
        ? map[cardId + i] + currentCardCnt
        : currentCardCnt
    }
  })

  const ans = Object.values(map).reduce((s, v) => s + v)
  return ans
}

console.log(partTwo('part-two-example.txt'))
console.log(partTwo('part-two-input.txt'))

