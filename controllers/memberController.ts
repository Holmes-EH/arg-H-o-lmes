import Member from '../models/memberModel'
import { collections } from '../lib/database.services'
import type { NextApiRequest, NextApiResponse } from 'next'

import { MessageResponseType } from '../lib/types'


// @desc    Get all members
// @route   GET /api/members
// @access  Public
const getMembers = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const members = (await collections?.members
			?.find({})
			.toArray()) as unknown as Member[]

		if (members.length > 0) {
			res.status(200).json(members)
		} else {
			res.status(404).json({ message: 'Aucun membre trouvé ?' })
		}
	} catch (error: any) {
		console.error(error)
		res.status(500).json({ message: error.message })

	}
}

// @desc    Add new member
// @route   POST /api/members
// @access  Public
const addNewMember = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = req.body as Member

	const memberExists = (await collections?.members?.findOne({
		name: data.name,
	})) as unknown as Member

	if (memberExists) {
		res.status(400).json({
			message: 'Cet équipier est déjà dans la liste...',
		})
	} else {
		try {
			const newMember = await collections?.members?.insertOne(data)
			newMember
				? res.status(201).json({
						_id: newMember.insertedId,
						name: data.name,
				  })
				: res.status(500).json({
						message: "Échec lors de l'ajout d'un nouveau membre.",
				  })
		} catch (error: any) {
			console.error(error)
			res.status(400).json({ message: error.message })
		}
	}
}

export { getMembers, addNewMember }
