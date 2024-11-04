import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	EditUserDetailsByIdDto,
	GetUserProfileByIdDto,
	UserInformationFormDto,
} from '@dtos/user/user.dto'

// Function to create a new user
export const createUser = async (
	IUserInformationDto: UserInformationFormDto,
	tempToken: string,
): Promise<IResponse<any>> => {
	const response = await handleApiRequest<any>(
		listUrl.users.create.path,
		listUrl.users.create.type,
		IUserInformationDto,
		tempToken,
	)
	return response
}

export const getUserProfileById = async (): Promise<IResponse<GetUserProfileByIdDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<GetUserProfileByIdDto>(
		listUrl.users.getById.path,
		listUrl.users.getById.type,
		{},
		token,
	)
	return response
}

// Function to edit user profile by id
export const editUserProfileById = async (IEditUserDetailsByIdDto: EditUserDetailsByIdDto): Promise<any> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<GetUserProfileByIdDto>(
		listUrl.users.update.path,
		listUrl.users.update.type,
		IEditUserDetailsByIdDto,
		token,
	)
	return response
}