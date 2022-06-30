import { getMembers, addNewMember } from '../../../controllers/memberController'
import { connectToDatabase } from '../../../lib/database.services'

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
