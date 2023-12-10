import fs from 'fs'

function partOne(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const lines = text.trim().split('\n')

  const regex = /\d/
  let ans = 0
  for (const line of lines) {
    const [first] = line.match(regex)
    const [last] = line.split('').reverse().join('').match(regex)
    ans += Number(first + last)
  }

  return ans
}

// console.log(partOne('day1/part-one-example.txt'))
// console.log(partOne('day1/part-one-input.txt'))



function partTwo(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const lines = text.trim().split('\n')

  const digitInTextArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const digitInText = digitInTextArray.join('|')
  const regex = new RegExp(digitInText + '|\\d')
  const reversedRegex = new RegExp(digitInText.split('').reverse().join('') + '|\\d')

  let ans = 0
  for (const line of lines) {
    let [first] = line.match(regex)
    let [last] = line.split('').reverse().join('').match(reversedRegex)

    if (Number.isNaN(Number(first))) {
      first = translateDigit(first)
    }
    if (Number.isNaN(Number(last))) {
      last = translateDigit(last.split('').reverse().join(''))
    }

    ans += Number(first.toString() + last.toString())
  }

  function translateDigit(text) {
    return digitInTextArray.findIndex(word => word === text) + 1
  }

  return ans
}

// console.log(partTwo('day1/part-two-example.txt'))
console.log(partTwo('day1/part-two-input.txt'))
