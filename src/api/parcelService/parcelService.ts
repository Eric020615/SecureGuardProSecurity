import GlobalHandler, {
	handleApiPaginationRequest,
	handleApiRequest,
	IPaginatedResponse,
	IResponse,
} from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { CreateParcelDto, GetParcelDto } from '@dtos/parcel/parcel.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const createParcel = async (createParcelDto: CreateParcelDto): Promise<IResponse<any>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiRequest<any>(
		listUrl.parcels.create.path,
		listUrl.parcels.create.type,
		createParcelDto,
		token,
	)
	return response
}

export const getParcels = async (
	id: number,
	limit: number,
): Promise<IPaginatedResponse<GetParcelDto>> => {
	const token = await AsyncStorage.getItem('token')
	const response = await handleApiPaginationRequest<GetParcelDto>(
		listUrl.parcels.getAll.path,
		listUrl.parcels.getAll.type,
		{},
		token,
		{ limit, id },
	)
	return response
}
