import axios from 'axios'
import queryString from 'query-string'

export default async function request(url, method, body, params) {
	const baseURL = process.env.REACT_APP_API_URL || 'https://tinevy.herokuapp.com'
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	}
	const queryFormarted = queryString.stringify(params)

	let objMeta = {
		method,
		url: `${baseURL}${url}${`/?${queryFormarted}` || ''}`,
		headers,
		data: body,
	}

	return await axios(objMeta)
}
