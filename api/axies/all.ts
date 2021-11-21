import { PartGene } from 'agp-npm/dist/models/part'
import { Request, Response, Router } from 'express'
import app from '../../constants/app'
import { BASE_URL } from '../../constants/router.constants'
import getAllPossibleAxies from '../../services/getAllPossibleAxies'
import { ResultFormat } from '../../types/axies.types'
import { Pagination } from '../../types/pagination.types'
import filterDuplicates from '../../utils/filterDuplicates'
import { formatAxies } from '../../utils/formatAxies'

export const router: Router = Router()

const axiesPath = BASE_URL + '/axies'

app.post(`${axiesPath}/all`, async (req: Request, res: Response) => {
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
})

export default app
