import type { NextApiRequest, NextApiResponse } from 'next'
import { getMembers, addNewMember } from '../../../controllers/memberController'
import nc from 'next-connect'

const handler = nc({ attachParams: true })

handler
	.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
		getMembers(req, res)
	})
	.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
		addNewMember(req, res)
	})

export default handler
