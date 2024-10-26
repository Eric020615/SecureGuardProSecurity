import GlobalHandler, { IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { CreateParcelDto } from '@dtos/parcel/parcel.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const createParcel = async (createParcelDto: CreateParcelDto): Promise<any> => {
	try {
		const token = await AsyncStorage.getItem('token')
		const [success, response] = await GlobalHandler({
			path: listUrl.parcelManagement.createParcel.path,
			type: listUrl.parcelManagement.createParcel.type,
			data: createParcelDto,
			_token: token,
		})
		const result: IResponse<any> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}
