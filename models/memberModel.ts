// External dependencies
import { ObjectId } from 'mongodb'

// Class implementation
export default class Member {
	constructor(public name: string, public id?: ObjectId) {}
}
