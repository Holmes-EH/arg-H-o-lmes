export default function reducer(state, action) {
	switch (action.type) {
		case 'MESSAGE':
			return { ...state, message: action.payload }
		case 'CLEAR_MESSAGE':
			return { ...state, message: {} }
		case 'LOADING':
			return { ...state, loading: true }
		case 'DONE_LOADING':
			return { ...state, loading: false, loadingMessage: {} }

		default:
			throw new Error('Dispatch case does not exist')
	}
}
