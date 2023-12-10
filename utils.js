import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const getLines = (moduleUrl, filePath) => {
  const fullPath = path.join(getDirName(moduleUrl), filePath)
  const text = fs.readFileSync(fullPath, 'utf8')
  const lines = text.trim().split('\n')
  return lines
}

const getDirName = function(moduleUrl) {
  const filename = fileURLToPath(moduleUrl)
  return path.dirname(filename)
}

export {
  getLines,
  getDirName
}
