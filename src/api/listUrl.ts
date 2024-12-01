import { IType } from '@config/constant'

export const listUrl = {
	auth: {
		logIn: {
			path: 'auth/login',
			type: IType.post,
		},
		signUp: {
			path: 'auth/signup',
			type: IType.post,
		},
		resetPassword: {
			path: 'auth/reset-password',
			type: IType.post,
		},
		requestPasswordReset: {
			path: 'auth/reset-password/request',
			type: IType.post,
		},
		checkAuth: {
			path: 'auth/check',
			type: IType.get,
		},
	},
	cards: {
		createCards: {
			path: 'cards',
			type: IType.post,
		},
		getCards: {
			path: 'cards',
			type: IType.get,
		},
		createFaceAuth: {
			path: 'cards/face-auth',
			type: IType.post,
		},
	},
	users: {
		create: {
			path: 'users',
			type: IType.post,
		},
		getById: {
			path: 'users/details',
			type: IType.get,
		},
		update: {
			path: 'users',
			type: IType.put,
		},
	},
	refData: {
		getProperties: {
			path: 'ref-data/properties/',
			type: IType.get,
		},
	},
	parcels: {
		create: {
			path: 'parcels/staff',
			type: IType.post,
		},
		getAll: {
			path: 'parcels/staff',
			type: IType.get,
		},
	},
}
