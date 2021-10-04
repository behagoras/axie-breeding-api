import { GetAxiesRequest } from '../types/getAxiesRequest.types'
import getAxies from './getAxies'

const getAllPossibleAxies: GetAxiesRequest = async (include, parts, omit) => {
  const { Back, Horn, Mouth, Tail, species } = include
  const back = await getAxies({ Back, species }, parts, omit)
  const horn = await getAxies({ Horn, species }, parts, omit)
  const mouth = await getAxies({ Mouth, species }, parts, omit)
  const tail = await getAxies({ Tail, species }, parts, omit)
  const basic = await getAxies({ Back, Horn, Mouth, Tail, species }, parts, omit)

  console.log({
    backLength: back.length,
    hornLength: horn.length,
    mouthLength: mouth.length,
    tailLength: tail.length,
    basicLength: basic.length
  })
  console.log({
    back: back[0].id,
    horn: horn[0].id,
    mouth: mouth[0].id,
    tail: tail[0].id,
    basic: basic[0].id
  })
  const all = [...back, ...horn, ...mouth, ...tail, ...basic]
  return all
}

export default getAllPossibleAxies
