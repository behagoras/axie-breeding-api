import { VercelRequest, VercelResponse } from '@vercel/node'
import { postMultiAxies } from '../../handlers/axie.handler'
import allowCors from '../../middlewares/allowCors'

function multi (req:VercelRequest, res:VercelResponse) {
  if (req.method === 'POST') {
    return postMultiAxies(req, res)
  }
}

export default allowCors(multi)
