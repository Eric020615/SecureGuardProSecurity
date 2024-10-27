import { Gender, RoleEnum } from '@config/constant/user'
import { GeneralFile } from '@dtos/application/application.dto'

export interface UserInformationFormDto {
	firstName: string
	lastName: string
	userName: string
	contactNumber: string
	gender: string
	dateOfBirth: string
	staffId: string
	supportedFiles: GeneralFile[]
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
	roleInformation?: ResidentInformationDto
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

export interface ResidentInformationDto {
	floor: string
	unit: string
	supportedFiles: string[]
}
