import { VercelApiHandler, VercelRequest, VercelResponse } from '@vercel/node'
// getStatus
const getStatus: VercelApiHandler = (req: VercelRequest, res: VercelResponse) => {
  res.status(200).json({
    status: 'server is running'
  })
}

export default getStatus
