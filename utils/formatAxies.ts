import { AxieGene } from 'agp-npm/dist/axie-gene'
import { Cls } from 'agp-npm/dist/models/cls'
import { Part, PartGene } from 'agp-npm/dist/models/part'
import { Axie, ResultFormat } from '../types/axies.types'

function mapPartGenesMinimal (part:Part) {
  return Object.entries(part)
    .map(
      ([key, value]:[string, PartGene]
      ) => ({
        [key]: value.partId
      }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})
}
function mapPartGenesClsMinimal (part:Part):{[x: string]: Cls} {
  return Object.entries(part)
    .map(([key, value]:[string, PartGene]) => ({ [key]: value.cls }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

export function formatGeneMinimal (gene:AxieGene) {
  const cls = gene.cls
  const ears = mapPartGenesClsMinimal(gene.ears)
  const eyes = mapPartGenesClsMinimal(gene.eyes)
  const mouth = mapPartGenesMinimal(gene.mouth)
  const back = mapPartGenesMinimal(gene.back)
  const tail = mapPartGenesMinimal(gene.tail)
  const horn = mapPartGenesMinimal(gene.horn)
  return { cls, eyes, ears, mouth, horn, tail, back }
}

export function formatAxiesMinimal (axies:Axie[]) {
  return axies.map(axie => ({
    id: axie.id,
    genes: formatGeneMinimal(axie.genes),
    price: axie.price,
    purity: axie.purity,
    breakdownPurity: axie.breakdownPurity
  }))
}

export function formatJustGenes (gene:AxieGene) {
  return gene.geneBinGroup
}

export function formatAxiesJustGenes (axies:Axie[]) {
  return axies.map(axie => ({
    id: axie.id,
    genes: formatJustGenes(axie.genes),
    price: axie.price,
    purity: axie.purity,
    breakdownPurity: axie.breakdownPurity
  }))
}

export function formatAxies (format:ResultFormat, axies:Axie[]) {
  switch (format) {
    case 'full':
      return axies
    case 'justGenes':
      return formatAxiesJustGenes(axies)
    case 'minimal':
      return formatAxiesMinimal(axies)
    default:
      return formatAxiesMinimal(axies)
  }
}
