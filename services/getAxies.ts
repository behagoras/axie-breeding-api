/* eslint-disable no-loop-func */
import { AxieGene } from 'agp-npm/dist/axie-gene'
import axios from 'axios'
import getParts from '../utils/getParts'
import { Axie, BreakdownPurity, PlainAxieResult } from '../types/axies.types'
import { GetAxiesRequest } from '../types/getAxiesRequest.types'
import { calculateBreakdownPurity } from '../utils/calculatePurity'
import buildQuery from './buildQuery'

const endpoint = 'https://axieinfinity.com/graphql-server-v2/graphql'
const breedCount = [0]

export const getAxies: GetAxiesRequest = async (include, _parts, omit): Promise<Axie[]> => {
  const { Back, Horn, Mouth, Tail } = _parts
  const parts = getParts({
    Back: include.Back,
    Horn: include.Horn,
    Mouth: include.Mouth,
    Tail: include.Tail
  })
  const body = {
    operationName: 'GetAxieBriefList',
    variables: {
      criteria: { classes: include.species, breedCount, parts }
    },
    query: buildQuery()
  }
  const res: PlainAxieResult = await axios.post(endpoint, body)
  const axiesWithGenes: Axie[] = res
    .data
    .data
    .ax0
    .results
    .map((plainAxie) => {
      const _genes = plainAxie.genes
      const genes = new AxieGene(_genes)
      const breakdownPurity = calculateBreakdownPurity(
        genes,
        { Back, Horn, Mouth, Tail }
      )
      const purity = breakdownPurity.purity
      return {
        id: plainAxie.id,
        price: plainAxie.auction.currentPrice,
        genes,
        _genes,
        purity,
        breakdownPurity: breakdownPurity as BreakdownPurity
      }
    }) as Axie[]
  return axiesWithGenes
}

export default getAxies
