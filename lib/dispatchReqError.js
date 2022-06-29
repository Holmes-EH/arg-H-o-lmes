const dispatchReqError = (dispatch, error) => {
	dispatch({ type: 'DONE_LOADING' })
	dispatch({
		type: 'MESSAGE',
		payload: {
			type: 'error',
			text:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		},
	})
}

export default dispatchReqError
