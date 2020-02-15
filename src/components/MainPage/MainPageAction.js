const Axios = require('axios');

export const updateData = (category) => {
	return {
		payload: {
			type: 'UPDATE_DATA',
			payload: Axios({
				method: 'get',
				url: `https://api.datamuse.com/words?topics=${category}`
			})
				.then(response => {
					let index = Math.floor(Math.random() * response.data.length);
					return response.data[index].word.split('');
				})
				.catch(err => err)
		}
	};
};