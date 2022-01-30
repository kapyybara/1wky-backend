import requestAPI from './axiosClient'

export const searchAPI = {
	searchUser(username) {
		return requestAPI(`/search/user?username=${username}`)
	},
}
