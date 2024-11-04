import Axios, { AxiosError } from 'axios'
import queryString from 'query-string'

interface IHandler {
	path: string
	type: string
	data?: any
	params?: any
	_token?: string
	isFormData?: boolean
	isUrlencoded?: boolean
	isBloob?: boolean
}

export interface IResponse<T> {
	success: boolean
	msg: string
	data?: T
}

export interface IPaginatedResponse<T> {
	success: boolean
	msg: string
	data: {
		list: T[] | null
		count: number
	}
}

export interface IServerResponse {
	message: string
	status: string
	data: any
}

export const handleApiRequest = async <T>(
	path: string,
	type: string,
	data: any,
	token?: string,
	params?: any,
	pathVariables?: { placeholder: string; value: string }, // Optional parameter for path variable replacement
): Promise<IResponse<T>> => {
	try {
		if (pathVariables) {
			path = path.replace(pathVariables.placeholder, pathVariables.value)
		}
		const [success, response] = await GlobalHandler({
			path,
			type,
			data,
			_token: token,
			params,
		})
		return {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
	} catch (error) {
		return {
			success: false,
			msg: error instanceof Error ? error.message : String(error),
			data: null,
		} as IResponse<T>
	}
}

export const handleApiPaginationRequest = async <T>(
	path: string,
	type: string,
	data: any,
	token?: string,
	params?: any,
	pathVariables?: { placeholder: string; value: string }, // Optional parameter for path variable replacement
): Promise<IPaginatedResponse<T>> => {
	try {
		if (pathVariables) {
			path = path.replace(pathVariables.placeholder, pathVariables.value)
		}
		const [success, response] = await GlobalHandler({
			path,
			type,
			data,
			_token: token,
			params,
		})
		return {
			success,
			msg: success ? 'success' : response?.message,
			data: {
				list: response?.data?.list,
				count: response?.data?.count,
			},
		}
	} catch (error) {
		return {
			success: false,
			msg: error instanceof Error ? error.message : String(error),
			data: {
				list: null,
				count: 0,
			},
		} as IPaginatedResponse<T>
	}
}

const GlobalHandler = async (payload: IHandler): Promise<[boolean, IServerResponse]> => {
	const _handler = async (payload: IHandler): Promise<[boolean, IServerResponse]> => {
		try {
			const { path, type, data, isBloob } = payload
			const token = payload._token
			const baseURL = `${process.env.EXPO_PUBLIC_BACKEND_API}${path}`
			let success = false
			const maxAttempt = 2
			let attempt = 0
			const performRequest = async (): Promise<any> => {
				let response = null
				while (!success && attempt < maxAttempt) {
					attempt++
					try {
						// Perform the API request
						if (type === 'get') {
							response = await Axios.get(baseURL, {
								params: payload.params,
								responseType: isBloob ? 'blob' : 'json',
								paramsSerializer: (params) => parseParams(params),
								headers: {
									'Content-Type': 'application/json',
									...(token != null
										? {
												Authorization: `${token}`,
										  }
										: {}),
								},
							})
						} else if (type === 'put') {
							response = await Axios.put(
								baseURL,
								payload.isUrlencoded ? queryString.stringify(data) : data,
								{
									headers: {
										'Content-Type': payload.isFormData
											? 'multipart/form-data'
											: payload.isUrlencoded
											? 'application/x-www-form-urlencoded'
											: 'application/json',
										...(token != null
											? {
													Authorization: `${token}`,
											  }
											: {}),
									},
									params: payload.params,
									paramsSerializer: (params) => parseParams(params),
								},
							)
						} else if (type === 'patch') {
							response = await Axios.patch(
								baseURL,
								payload.isUrlencoded ? queryString.stringify(data) : data,
								{
									headers: {
										'Content-Type': payload.isFormData
											? 'multipart/form-data'
											: payload.isUrlencoded
											? 'application/x-www-form-urlencoded'
											: 'application/json',
										...(token != null
											? {
													Authorization: `${token}`,
											  }
											: {}),
									},
								},
							)
						} else if (type === 'delete') {
							response = await Axios.delete(baseURL, {
								headers: {
									'Content-Type': payload.isFormData
										? 'multipart/form-data'
										: payload.isUrlencoded
										? 'application/x-www-form-urlencoded'
										: 'application/json',
									...(token != null
										? {
												Authorization: `${token}`,
										  }
										: {}),
								},
								data: data,
							})
						} else {
							response = await Axios.post(baseURL, data, {
								headers: {
									'Content-Type': payload.isFormData
										? 'multipart/form-data'
										: payload.isUrlencoded
										? 'application/x-www-form-urlencoded'
										: 'application/json',
									...(token != null
										? {
												Authorization: `${token}`,
										  }
										: {}),
								},
								params: payload.params,
								paramsSerializer: (params) => parseParams(params),
							})
						}
						success = true
					} catch (error) {
						if (error instanceof AxiosError) {
							console.log(error.response.data)
							response = error.response
						}
					}
				}
				if (!success) {
					console.log('All attempts to perform request failed')
				}
				return response.data
			}
			const response = await performRequest()
			return [success, response]
		} catch (error: any) {
			return [false, error]
		}
	}
	return _handler(payload)
}

const parseParams = (params) => {
	let options = ''

	Object.keys(params).forEach((key) => {
		const value = params[key]
		if (Array.isArray(value)) {
			// If the value is an array, iterate over its elements and append each one with the key
			value.forEach((element) => {
				if (Array.isArray(element)) {
					// If the element is also an array, iterate over its elements
					element.forEach((subElement) => {
						options += `${encodeURIComponent(key)}=${encodeURIComponent(subElement)}&`
					})
				} else {
					// If the element is not an array, simply append it with the key
					options += `${encodeURIComponent(key)}=${encodeURIComponent(element)}&`
				}
			})
		} else {
			// If the value is not an array, append it with the key
			options += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
		}
	})
	// Remove the trailing '&' and return the result
	return options ? options.slice(0, -1) : options
}
export default GlobalHandler
