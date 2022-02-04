import requestAPI from './axiosClient'

export const postAPI = {
	getTimeLine({ userId, params }) {
		return requestAPI(
			`/posts/timeline/${userId}`,
			'GET',
			{},
			params,
		)
	},
	likePost({ userId, postId }) {
		return requestAPI(`/posts/${postId}/like`, 'PUT', { userId })
	},
	addPost(body) {
		return requestAPI('/posts', 'POST', body)
	},
	getPostsByUserId(userId) {
		return requestAPI(`/posts/all/${userId}`, 'GET')
	},
	getByIds(ids) {
		let requests = []
		for (let i = 0; i < ids.length; i++) {
			requests.push(requestAPI(`/posts/${ids[i]}`, 'GET'))
		}
		return Promise.all(requests)
	},
	savePost({ userId, postId }) {
		return requestAPI(`/posts/${postId}/save`, 'PUT', { userId })
	},
}
