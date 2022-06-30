// Client side types
export type State = {
	message: object
	loading: boolean
}

export type Action = {
	type: string
	payload: object
}

export type AppContextType = {
	loading: boolean
	message: object
}
// Backend types
export type MessageResponseType = {
	message: String
}
