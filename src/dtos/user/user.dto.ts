import { Gender, RoleEnum } from '@config/constant/user'
import { GeneralFileDto } from '@dtos/application/application.dto'

export interface UserInformationFormDto {
	firstName: string
	lastName: string
	userName: string
	contactNumber: string
	gender: string
	dateOfBirth: string
	staffId: string
	supportedDocuments: GeneralFileDto[]
}

export interface GetUserProfileByIdDto {
	userId: string
	firstName: string
	lastName: string
	userName: string
	email: string
	contactNumber: string
	gender: Gender
	role: RoleEnum
	roleInformation?: StaffInformationFormDto
	dateOfBirth: string
	isActive?: boolean
	createdBy: string
	createdDateTime: string
	updatedBy: string
	updatedDateTime: string
}

export interface EditUserDetailsByIdDto {
	firstName: string
	lastName: string
	userName: string
	email: string
	contactNumber: string
	gender: string
	dateOfBirth: string
}

export interface StaffInformationFormDto {
	staffId: string
}
