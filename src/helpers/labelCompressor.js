export default label => {
  const wordsArr = label.split(' ').join('-').split(':').join('-').split(/(?=[A-Z])/).join('-').split('-')
  const comp = []

  wordsArr.map(word => {
    comp.push(word.split('')[0])
  })

  return comp.join('')
}
