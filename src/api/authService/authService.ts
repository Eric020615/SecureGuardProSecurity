import GlobalHandler, { IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { RoleEnum } from '@config/constant/user'
import { ForgotPasswordDto, ResetPasswordDto, SignInFormDto, UserSignUpFormDto } from '@dtos/auth/auth.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const signUp = async (ISignUp: UserSignUpFormDto): Promise<IResponse<any>> => {
	try {
		const [success, response] = await GlobalHandler({
			path: listUrl.auth.signUp.path,
			type: listUrl.auth.signUp.type,
			data: ISignUp,
			params: { role: RoleEnum.STAFF },
		})
		const result: IResponse<any> = {
			success,
			msg: success ? 'success' : response.message,
			data: success ? response.data : null,
		}
		return result
	} catch (error: any) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}

export const signIn = async (ISignIn: SignInFormDto): Promise<IResponse<any>> => {
	try {
		const [success, response] = await GlobalHandler({
			path: listUrl.auth.logIn.path,
			type: listUrl.auth.logIn.type,
			data: ISignIn,
		})
		const result: IResponse<any> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error: any) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}

export const forgotPassword = async (forgotPasswordDto: ForgotPasswordDto): Promise<IResponse<any>> => {
	try {
		const [success, response] = await GlobalHandler({
			path: listUrl.auth.forgotPassword.path,
			type: listUrl.auth.forgotPassword.type,
			data: forgotPasswordDto,
		})
		const result: IResponse<any> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error: any) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}

export const checkAuth = async (token: string): Promise<IResponse<any>> => {
	try {
		const [success, response] = await GlobalHandler({
			path: listUrl.auth.checkJwtAuth.path,
			type: listUrl.auth.checkJwtAuth.type,
			_token: token,
		})
		const result: IResponse<any> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error: any) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}

export const resetPassword = async (resetPasswordDto: ResetPasswordDto): Promise<IResponse<any>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.auth.resetPassword.path,
			type: listUrl.auth.resetPassword.type,
			data: resetPasswordDto,
			_token: token ? token : '',
		})
		const result: IResponse<any> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error: any) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}