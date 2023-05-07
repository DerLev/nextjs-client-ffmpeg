const stripFileextension = (input: string) => {
  const inputArr = input.split('.')
  let newString = ''
  let fileextension = ''
  inputArr.forEach((value, index) => {
    const maxIndex = inputArr.length - 1
    if(index >= maxIndex) return fileextension = value
    if(index === 0) return newString += value
    return newString += '.' + value
  })
  return {
    filename: newString,
    fileextension
  }
}

export default stripFileextension
