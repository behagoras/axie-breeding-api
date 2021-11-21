import { VercelRequest, VercelResponse } from '@vercel/node'
import { PartGene } from 'agp-npm/dist/models/part'
import getAllPossibleAxies from '../services/getAllPossibleAxies'
import getAxies from '../services/getAxies'
import { ResultFormat } from '../types/axies.types'
import { Pagination } from '../types/pagination.types'
import filterDuplicates from '../utils/filterDuplicates'
import { formatAxies } from '../utils/formatAxies'

export const postMultiAxies = async (req:VercelRequest, res:VercelResponse) => {
  const body = req.body as {
    Back?: PartGene;
    Mouth?: PartGene;
    Horn?: PartGene;
    Tail?: PartGene;
    species?: string[];
  }
  const { format = 'minimal' } = req.query as {format:ResultFormat}
  const response = await getAllPossibleAxies(body, body)
  const filteredAxies = filterDuplicates(response)
  const formattedAxies = formatAxies(format, filteredAxies)
  const pagination: Pagination = {
    total: filteredAxies.length,
    pages: 1,
    current: 1,
    next: null,
    previous: null
  }
  res.status(200).json({
    pagination,
    axies: formattedAxies
  })
}

export const postSingleAxie = async (request:VercelRequest, response:VercelResponse) => {
  const body = request.body as {
    Back?: PartGene;
    Mouth?: PartGene;
    Horn?: PartGene;
    Tail?: PartGene;
    species?: string[];
  }
  const { format = 'minimal' } = request.query as {format:ResultFormat}
  const axies = await getAxies(body, body)
  const formattedAxies = formatAxies(format, axies)
  const pagination: Pagination = {
    total: axies.length,
    pages: 1,
    current: 1,
    next: null,
    previous: null
  }
  response.status(200).json({
    pagination,
    axies: formattedAxies
  })
}
