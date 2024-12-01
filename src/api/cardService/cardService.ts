import { handleApiRequest, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { CreateUserFaceAuthDto, GetCardByUserDto } from '@dtos/card/card.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Create User Card
export const createUserCard = async (): Promise<IResponse<any>> => {
	const token = await AsyncStorage.getItem('token')
	return handleApiRequest<any>(listUrl.cards.createCards.path, listUrl.cards.createCards.type, undefined, token)
}

// Get User Card
export const getUserCard = async (): Promise<IResponse<GetCardByUserDto>> => {
	const token = await AsyncStorage.getItem('token')
	return handleApiRequest<GetCardByUserDto>(listUrl.cards.getCards.path, listUrl.cards.getCards.type, undefined, token)
}

export const uploadUserFaceAuth = async (createUserFaceAuthDto: CreateUserFaceAuthDto): Promise<IResponse<any>> => {
	const token = await AsyncStorage.getItem('token')
	return handleApiRequest<any>(
		listUrl.cards.createFaceAuth.path,
		listUrl.cards.createFaceAuth.type,
		createUserFaceAuthDto,
		token,
	)
}
