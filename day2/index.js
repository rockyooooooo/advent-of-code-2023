import fs from 'fs'

function partOne(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const lines = text.trim().split('\n')

  let ans = 0
  const gameRegex = /Game\s(\d+)/
  const redRegex = /(\d+)\s(red)/g
  const greenRegex = /(\d+)\s(green)/g
  const blueRegex = /(\d+)\s(blue)/g
  lines.forEach(line => {
    const gameId = line.match(gameRegex)[1]
    const redNum = Math.max(...line.match(redRegex).map(str => Number(str.split(' ')[0])))
    const greenNum = Math.max(...line.match(greenRegex).map(str => Number(str.split(' ')[0])))
    const blueNum = Math.max(...line.match(blueRegex).map(str => Number(str.split(' ')[0])))

    if (redNum - 12 <= 0 && greenNum - 13 <= 0 && blueNum - 14 <= 0) {
      console.log({ gameId })
      console.log({ redNum })
      console.log({ greenNum })
      console.log({ blueNum })
      ans += Number(gameId)
    }
  })

  return ans
}

// console.log(partOne('day2/part-one-example.txt'))
// console.log(partOne('day2/part-one-input.txt'))



function partTwo(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const lines = text.trim().split('\n')

  const redRegex = /(\d+)\s(red)/g
  const greenRegex = /(\d+)\s(green)/g
  const blueRegex = /(\d+)\s(blue)/g

  const ans = lines.reduce((sum, line) => {
    const redNum = Math.max(...line.match(redRegex).map(str => Number(str.split(' ')[0])))
    const greenNum = Math.max(...line.match(greenRegex).map(str => Number(str.split(' ')[0])))
    const blueNum = Math.max(...line.match(blueRegex).map(str => Number(str.split(' ')[0])))

    return sum + (redNum * greenNum * blueNum)
  }, 0)

  return ans
}

// console.log(partTwo('day2/part-two-example.txt'))
console.log(partTwo('day2/part-two-input.txt'))
