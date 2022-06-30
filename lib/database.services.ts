// External Dependencies
import * as mongoDB from 'mongodb'

// Global Variables
export const collections: { members?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase(collectionName: string) {
	const client: mongoDB.MongoClient = new mongoDB.MongoClient(
		process.env.MONGODB_URI!
	)

	await client.connect()

	const db: mongoDB.Db = client.db(process.env.DB_NAME)

	await db.command({
		collMod: collectionName,
		validator: {
			$jsonSchema: {
				bsonType: 'object',
				required: ['name'],
				additionalProperties: false,
				properties: {
					_id: {},
					name: {
						bsonType: 'string',
						description: "'name' is required and is a string",
					},
				},
			},
		},
	})

	const membersCollection: mongoDB.Collection = db.collection(collectionName)

	collections.members = membersCollection

	console.log(
		`Successfully connected to database: ${db.databaseName} and collection: ${membersCollection.collectionName}`
	)
}
