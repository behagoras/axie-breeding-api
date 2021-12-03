import { VercelRequest, VercelResponse } from '@vercel/node'
import { postSingleAxie } from '../../handlers/axie.handler'
import allowCors from '../../middlewares/allowCors'

function single (req:VercelRequest, res:VercelResponse) {
  if (req.method === 'POST') {
    return postSingleAxie(req, res)
  }
}

export default allowCors(single)
