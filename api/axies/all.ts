import { PartGene } from 'agp-npm/dist/models/part'
import { Request, Response, Router } from 'express'
import { BASE_URL } from '../../constants/router.constants'
import getAllPossibleAxies from '../../services/getAllPossibleAxies'
import { Pagination } from '../../types/pagination.types'
import app from '../../constants/app'
import filterDuplicates from '../../utils/filterDuplicates'

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
  const response = await getAllPossibleAxies(body, body)
  const filteredAxies = filterDuplicates(response)
  const pagination: Pagination = {
    total: filteredAxies.length,
    pages: 1,
    current: 1,
    next: null,
    previous: null
  }
  res.status(200).json({
    pagination,
    axies: filteredAxies
  })
})

export default app
