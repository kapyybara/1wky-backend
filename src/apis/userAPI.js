import requestAPI from './axiosClient'

export const userAPI = {
	updateAccount(body) {
		return requestAPI(`/users/${body._id}`, 'PUT', {
			...body,
			userId: body._id,
		})
	},
	getMe(body) {
		return requestAPI(`/users/${body.userId}`)
	},
	getByIds(ids) {
		let requests = []
		for (let i = 0; i < ids.length; i++) {
			requests[i] = this.getById(ids[i])
		}
		return Promise.all(requests)
	},
	getById(id) {
		return requestAPI(`/users/${id}`)
	},
	followUser({ userId, followId }) {
		return requestAPI(`/users/${followId}/follow`, 'PUT', {
			userId,
		})
	},
}
