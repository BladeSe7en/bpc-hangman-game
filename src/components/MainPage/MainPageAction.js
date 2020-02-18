const Axios = require('axios');

export const updateDataAsync = (category) => {
	console.log("In thunk updateData async with category: ", category);
	return (dispatch, getState) => {
			return Axios({
				method: 'get',
				url: `https://api.datamuse.com/words?topics=${category}`
			})
				.then(response => {
					console.log("Successfully fetched response with data: ", response.data);
					if (response.data.length === 0) {
						console.log('No similar words');
						// no data, toggle alert
						dispatch({ type: 'TOGGLE_ALERT', payload: true});
					}
					dispatch({ type: 'UPDATE_DATA_NEW', payload: response.data });
					// alternate use of action creator
					// dispatch(updateData(response.data))
				})
				.catch(err => err)
	}
};

// const updateData = (payload) => {
// 	return {
// 		type: 'UPDATE_DATA_NEW',
// 		payload
// 	}
// }