/* eslint-disable no-underscore-dangle */
// util function to convert the input to string type
function convertToString (input: any) {
  if (input) {
    if (typeof input === 'string') {
      return input
    } return String(input)
  }
  return ''
}
// convert string to words
function toWords (input: any) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _input = convertToString(input)
  const regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g
  return _input.match(regex)
}
// convert the input array to camel case
export function toCamelCase (inputArray:any): string {
  let result = ''
  // eslint-disable-next-line no-plusplus
  for (let i = 0, len = inputArray.length; i < len; i++) {
    const currentStr = inputArray[i]; let tempStr = currentStr.toLowerCase()
    if (i !== 0) { // convert first letter to upper case (the word is in lowercase)
      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1)
    } result += tempStr
  } return result
}
// this function call all other functions

export function toCamelCaseString (input:string) {
  const words = toWords(input)
  return toCamelCase(words)
}

export function camelize (str:string) {
  return str.replace(/\W+(.)/g,
    (match, chr) => chr.toUpperCase()).toUpperCase()
}
