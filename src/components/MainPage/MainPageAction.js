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
						console.log('data is not defined')
						// here I'm returning nothing to block any state changes or navigation, but you might 
						// set some state for the UI to use to show a warning, or you could clear
						// out the category search box, or set a message, etc.

						return; // no change will be made to data store in this case
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