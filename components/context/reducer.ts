import { State, Action } from '../../lib/types'

export default function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'MESSAGE':
			return { ...state, message: action.payload }
		case 'CLEAR_MESSAGE':
			return { ...state, message: {} }
		case 'LOADING':
			return { ...state, loading: true }
		case 'DONE_LOADING':
			return { ...state, loading: false }

		default:
			throw new Error('Dispatch case does not exist')
	}
}
