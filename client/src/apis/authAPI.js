import requestAPI from './axiosClient'

export const authAPI = {
	login(body) {
		return requestAPI('/auth/login', 'POST', body)
	},
	register(body) {
		return requestAPI('/auth/register', 'POST', body)
	},
}
