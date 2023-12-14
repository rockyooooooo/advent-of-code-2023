import fs from "fs"
import path from "path"
import { getDirName } from "../utils/utils.js"

function partOne(filePath: string) {
  const fullPath = path.join(getDirName(import.meta.url), filePath)
  const text = fs.readFileSync(fullPath, 'utf8')

  const mapReg = /\d+ \d+ \d+/g
  const seedsIndex = text.indexOf('seeds')
  const seedToSoilIndex = text.indexOf('seed-to-soil')
  const soilToFertilizerIndex = text.indexOf('soil-to-fertilizer')
  const fertilizerToWaterIndex = text.indexOf('fertilizer-to-water')
  const waterToLightIndex = text.indexOf('water-to-light')
  const lightToTemperatrueIndex = text.indexOf('light-to-temperature')
  const temperatrueToHumidityIndex = text.indexOf('temperature-to-humidity')
  const humidityToLocationIndex = text.indexOf('humidity-to-location')

  const seeds = text.slice(seedsIndex, seedToSoilIndex).match(/\d+/g)?.map(Number) || []

  const seedToSoil = genMapList(seedToSoilIndex, soilToFertilizerIndex)
  const soilToFertilizer = genMapList(soilToFertilizerIndex, fertilizerToWaterIndex)
  const fertilizerToWater = genMapList(fertilizerToWaterIndex, waterToLightIndex)
  const waterToLight = genMapList(waterToLightIndex, lightToTemperatrueIndex)
  const lightToTemperature = genMapList(lightToTemperatrueIndex, temperatrueToHumidityIndex)
  const temperatureToHumidity = genMapList(temperatrueToHumidityIndex, humidityToLocationIndex)
  const humidityToLocation = genMapList(humidityToLocationIndex)

  function genMapList(start: number, end: number = -1) {
    return text.slice(start, end).match(mapReg)?.map(l => {
      const [destination, source, range] = l.split(' ')
      return {
        destination: Number(destination),
        source: Number(source),
        range: Number(range)
      }
    }) || []
  }

  const soils = seeds.map(seed => {
    return mapSourceToDestination(seed, seedToSoil)
  })
  const fertilizers = soils.map(soil => {
    return mapSourceToDestination(soil, soilToFertilizer)
  })
  const waters = fertilizers.map(fertilizer => {
    return mapSourceToDestination(fertilizer, fertilizerToWater)
  })
  const lights = waters.map(water => {
    return mapSourceToDestination(water, waterToLight)
  })
  const temperatures = lights.map(light => {
    return mapSourceToDestination(light, lightToTemperature)
  })
  const humidities = temperatures.map(temperature => {
    return mapSourceToDestination(temperature, temperatureToHumidity)
  })
  const locations = humidities.map(humidity => {
    return mapSourceToDestination(humidity, humidityToLocation)
  })

  type MapList = {
    source: number,
    destination: number,
    range: number
  }[]

  function mapSourceToDestination(source: number, mapList: MapList) {
    const rlt = mapList.reduce((rlt: number | null, map) => {
      if (rlt === null && source >= map.source && source <= map.source + map.range) {
        return map.destination + (source - map.source)
      }
      return rlt
    }, null)
    return rlt || source
  }

  return Math.min(...locations)
}

console.log(partOne('part-one-example.txt'))
console.log(partOne('part-one-input.txt'))



function partTwo(filePath: string) {
  const fullPath = path.join(getDirName(import.meta.url), filePath)
  const text = fs.readFileSync(fullPath, 'utf8')

  const mapReg = /\d+ \d+ \d+/g
  const seedsIndex = text.indexOf('seeds')
  const seedToSoilIndex = text.indexOf('seed-to-soil')
  const soilToFertilizerIndex = text.indexOf('soil-to-fertilizer')
  const fertilizerToWaterIndex = text.indexOf('fertilizer-to-water')
  const waterToLightIndex = text.indexOf('water-to-light')
  const lightToTemperatrueIndex = text.indexOf('light-to-temperature')
  const temperatrueToHumidityIndex = text.indexOf('temperature-to-humidity')
  const humidityToLocationIndex = text.indexOf('humidity-to-location')

  const seedToSoil = genMapList(seedToSoilIndex, soilToFertilizerIndex)
  const soilToFertilizer = genMapList(soilToFertilizerIndex, fertilizerToWaterIndex)
  const fertilizerToWater = genMapList(fertilizerToWaterIndex, waterToLightIndex)
  const waterToLight = genMapList(waterToLightIndex, lightToTemperatrueIndex)
  const lightToTemperature = genMapList(lightToTemperatrueIndex, temperatrueToHumidityIndex)
  const temperatureToHumidity = genMapList(temperatrueToHumidityIndex, humidityToLocationIndex)
  const humidityToLocation = genMapList(humidityToLocationIndex)

  function genMapList(start: number, end: number = -1) {
    return text.slice(start, end).match(mapReg)?.map(l => {
      const [destination, source, range] = l.split(' ')
      return {
        destination: Number(destination),
        source: Number(source),
        range: Number(range)
      }
    }) || []
  }

  const nums = text.slice(seedsIndex, seedToSoilIndex).match(/\d+/g)?.map(Number)
  const minLocation = nums?.reduce((minLocation: number | null, num, index) => {
    let seed: number = 0
    if (index % 2 === 0) {
      seed = num
      const location = findLocation(seed)
      if (minLocation === null || location < minLocation) {
        minLocation = location
      }
    } else {
      for (let i = 1; i < num; i++) {
        seed = nums[index - 1] + i
        const location = findLocation(seed)
        if (minLocation === null || location < minLocation) {
          minLocation = location
        }
      }
    }
    return minLocation
  }, null)

  function findLocation(seed: number) {
    const soil = mapSourceToDestination(seed, seedToSoil)
    const fertilizer = mapSourceToDestination(soil, soilToFertilizer)
    const water = mapSourceToDestination(fertilizer, fertilizerToWater)
    const light = mapSourceToDestination(water, waterToLight)
    const temperature = mapSourceToDestination(light, lightToTemperature)
    const humidity = mapSourceToDestination(temperature, temperatureToHumidity)
    const location = mapSourceToDestination(humidity, humidityToLocation)
    return location
  }

  type MapList = {
    source: number,
    destination: number,
    range: number
  }[]

  function mapSourceToDestination(source: number, mapList: MapList) {
    const rlt = mapList.reduce((rlt: number | null, map) => {
      if (rlt === null && source >= map.source && source <= map.source + map.range) {
        return map.destination + (source - map.source)
      }
      return rlt
    }, null)
    return rlt || source
  }

  return minLocation
}

console.log(partTwo('part-two-example.txt'))
console.time('part2')
console.log(partTwo('part-two-input.txt')) // wrong anser: 81956385
console.timeEnd('part2')

