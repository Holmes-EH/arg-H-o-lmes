import { createContext, useReducer } from 'react'
import reducer from './reducer'

const AppContext = createContext(null)
AppWrapper.displayName = 'Store'

export function AppWrapper({ children }) {
	let initialState = {
		loading: false,
	}
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<AppContext.Provider value={[state, dispatch]}>
			{children}
		</AppContext.Provider>
	)
}

export { AppContext }
