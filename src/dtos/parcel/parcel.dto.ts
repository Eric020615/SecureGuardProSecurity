import { DocumentStatusDescriptionEnum } from '@config/constant'
import { ParcelStatusDescriptionEnum } from '@config/constant/parcel'
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

export interface GetParcelDetailsDto {
	parcelId: number
	parcelGuid: string
	parcelImage: GeneralFileResponseDto
	floor: string
	unit: string
	parcelStatus: keyof typeof ParcelStatusDescriptionEnum
	status: keyof typeof DocumentStatusDescriptionEnum
	createdBy: string 
	createdDateTime: string
	updatedBy: string
	updatedDateTime: string
}
