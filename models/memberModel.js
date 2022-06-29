import mongoose from 'mongoose'

const memberSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamp: true }
)

module.exports =
	mongoose.models.Member || mongoose.model('Member', memberSchema)
