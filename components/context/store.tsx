import { createContext, useContext, useReducer } from 'react'
import reducer from './reducer'

interface AppContextInterface {
	loading: boolean
	message: object
}

const AppContext = createContext<AppContextInterface | null>(null)
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

export function globalContext() {
	return useContext(AppContext)
}
