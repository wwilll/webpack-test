const fn = arr => {
  if (arr instanceof Array) {
    return [...new Set(arr)]
  } else {
    return []
  }
}

const fn2 = () => {
  Promise.all(request('./list1'), request('./list2')).then(() => {
    request('./list3')
  }).catch(e => {
    console.log(e)
  })
}

const convert = money => {
  const moneyStr = '' + money
  const [part1, part2] = moneyStr.split('.')
  if (part1 === 0) return moneyStr
  const numArr = part1.split('')
  let newNumArr = []
  let count = 1
  for (let i = numArr.length - 1; i >= 0; i--) {
    if (count !== 3) {
      newNumArr.unshift(numArr[i])
      count++
    } else {
      newNumArr.unshift(numArr[i])
      if (i > 0) {
        newNumArr.unshift(',')
      }
      count = 1
    }
  }
  const rightNum = part2 !== undefined ? '.' + part2 : ''
  return newNumArr.join('') + rightNum
}

convert(12)
convert(1234)
convert(12345678)