import GlobalHandler, { IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	EditUserDetailsByIdDto,
	GetUserProfileByIdDto,
	UserInformationFormDto,
} from '@dtos/user/user.dto'

export const createUser = async (
	IUserInformationDto: UserInformationFormDto,
	tempToken: string,
): Promise<IResponse<any>> => {
	try {
		const [success, response] = await GlobalHandler({
			path: listUrl.user.createUser.path,
			type: listUrl.user.createUser.type,
			data: IUserInformationDto,
			_token: tempToken,
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

export const getUserProfileById = async (): Promise<IResponse<GetUserProfileByIdDto>> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.user.getUserProfileById.path,
			type: listUrl.user.getUserProfileById.type,
			_token: token as string,
		})
		const result: IResponse<GetUserProfileByIdDto> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error: any) {
		const result: IResponse<GetUserProfileByIdDto> = {
			success: false,
			msg: error,
			data: {} as GetUserProfileByIdDto,
		}
		return result
	}
}

export const editUserProfileById = async (
	IEditUserDetailsByIdDto: EditUserDetailsByIdDto,
): Promise<any> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.user.editUserProfileById.path,
			type: listUrl.user.editUserProfileById.type,
			_token: token as string,
			data: IEditUserDetailsByIdDto,
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