import { GetAxiesRequest } from '../types/getAxiesRequest.types'
import getAxies from './getAxies'

const getAllPossibleAxies: GetAxiesRequest = async (include, parts, omit) => {
  const { Back, Horn, Mouth, Tail, species } = include
  const back = await getAxies({ Back, species }, parts, omit)
  const horn = await getAxies({ Horn, species }, parts, omit)
  const mouth = await getAxies({ Mouth, species }, parts, omit)
  const tail = await getAxies({ Tail, species }, parts, omit)
  const basic = await getAxies({ Back, Horn, Mouth, Tail, species }, parts, omit)
  const all = [...back, ...horn, ...mouth, ...tail, ...basic]
  return all
}

export default getAllPossibleAxies
