import axios from 'axios'
import queryString from 'query-string'

export default async function request(url, method, body, params) {
	const headers = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	}
	const queryFormarted = queryString.stringify(params)

	let objMeta = {
		method,
		url: `${url}${`/?${queryFormarted}` || ''}`,
		headers,
		data: body,
	}

	return await axios(objMeta)
}
