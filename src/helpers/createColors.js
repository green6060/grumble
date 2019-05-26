import randomColor from 'randomcolor'

export const createBlueColors = (num) => {
  return randomColor({
    count: num,
    hue: 'blue',
    format: 'rgb'
  })
}

export const createDarkBlueColors = (num) => {
  return randomColor({
    count: num,
    hue: 'blue',
    luminosity: 'dark',
    format: 'rgb'
  })
}

export const createRandomColors = (num) => {
  return randomColor({
    count: num,
    hue: 'random',
    format: 'rgb'
  })
}
