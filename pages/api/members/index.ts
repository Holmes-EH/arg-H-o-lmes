import type { NextApiRequest, NextApiResponse } from 'next'
import { getMembers, addNewMember } from '../../../controllers/memberController'
import nc from 'next-connect'
import { connectToDatabase } from '../../../lib/database.services'

// const handler = nc({ attachParams: true })

// handler
// 	.get(
// 		connectToDatabase('members')
// 			.then(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
// 				getMembers(req, res)
// 			})
// 			.catch((error: Error) => {
// 				console.error('Database connection failed', error)
// 				process.exit()
// 			})
// 	)
// 	.post(
// 		connectToDatabase('members')
// 			.then(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
// 				addNewMember(req, res)
// 			})
// 			.catch((error: Error) => {
// 				console.error('Database connection failed', error)
// 				process.exit()
// 			})
// 	)

// export default handler

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		connectToDatabase('members')
			.then(async () => {
				await addNewMember(req, res)
			})
			.catch((error: Error) => {
				console.error('Database connection failed', error)
				process.exit()
			})
	} else if (req.method === 'GET') {
		connectToDatabase('members')
			.then(async () => {
				await getMembers(req, res)
			})
			.catch((error: Error) => {
				console.error('Database connection failed', error)
				process.exit()
			})
	}
}
