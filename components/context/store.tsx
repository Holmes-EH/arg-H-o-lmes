import React, { createContext, useReducer } from 'react'
import reducer from './reducer'
import { AppContextType } from '../../lib/types'

const AppContext = createContext<[AppContextType, React.Dispatch<any>]>([
	{ loading: false, message: {} },
	() => {},
])
AppWrapper.displayName = 'Store'

export function AppWrapper({ children }: { children: any }) {
	let initialState = {
		loading: false,
		message: {},
	}
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<AppContext.Provider value={[state, dispatch]}>
			{children}
		</AppContext.Provider>
	)
}

export { AppContext }
