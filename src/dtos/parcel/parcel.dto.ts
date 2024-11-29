import { GeneralFileDto, GeneralFileResponseDto } from '@dtos/application/application.dto'

export interface CreateParcelDto {
	parcelImage: GeneralFileDto
	floor: string
	unit: string
}

export interface GetParcelDto {
	parcelId: number
	parcelGuid: string
	parcelImage: GeneralFileResponseDto
	floor: string
	unit: string
	createdDateTime: string
}
