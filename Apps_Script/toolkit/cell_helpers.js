function cells_valueParse(value) {
  let parsedValue;
  try {
    parsedValue = JSON.parse(value)
  } catch(error) {
    return value
  }
  return parsedValue
}

function cells_arraysMatch(a1,a2) {
  if (a1.length != a2.length) {
    return false
  }
  a1.forEach( (arr, i) => {
    if (arr.length != a2[i].legnth) {
      return false
    }
  })
  return true
}
