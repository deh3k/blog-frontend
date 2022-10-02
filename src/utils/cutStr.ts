export const cutStr = (text: string, length=2) => {
  const strArray: string[] = text.split('\n').map((item) => item.trim())

  const filtredArray = strArray.filter((item) => item.length !== 0 && !item.startsWith('#') && !item.startsWith('!')).slice(0, length)

  const str = filtredArray.join('\n\n')
  
  return str
}

