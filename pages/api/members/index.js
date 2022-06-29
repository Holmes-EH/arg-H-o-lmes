import { getMembers, addNewMember } from '../../../controllers/memberController'
import nc from 'next-connect'

const handler = nc({ attachParams: true })

handler
	.get(async (req, res) => {
		getMembers(req, res)
	})
	.post(async (req, res) => {
		addNewMember(req, res)
	})

export default handler
