import Member from '../models/memberModel'
import dbConnect from '../lib/dbConnect'
import { brotliDecompressSync } from 'zlib'

dbConnect()

// @desc    Get all members
// @route   GET /api/members
// @access  Public
const getMembers = async (req, res) => {
	const members = await Member.find()
	if (members.length > 0) {
		res.status(200).json(members)
	} else {
		res.status(404).json({ message: 'Aucun membre trouvé ?' })
	}
}

// @desc    Add new member
// @route   POST /api/members
// @access  Public
const addNewMember = async (req, res) => {
	const { name } = req.body
	const memberExists = await Member.findOne({ name: name })
	if (memberExists) {
		res.status(400).json({
			message: 'Cet équipier est déjà dans la liste...',
		})
	} else {
		try {
			const newMember = await Member.create({ name })
			res.status(201).json(newMember)
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
}

export { getMembers, addNewMember }
