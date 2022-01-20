import axios from 'axios'
import queryString from 'query-string'

export default async function request(url, method, body, params) {
	const baseURL = process.env.REACT_APP_API_URL
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin':
			'*',
	}
	const paramsFormarted = queryString.stringify(params)

	let objMeta = {
		method,
		url: `${baseURL}${url}${`/?${paramsFormarted}` || ''}`,
		// url: `${baseURL}${url}`,
		headers,
		data: body,
	}

	return await axios(objMeta)
}
