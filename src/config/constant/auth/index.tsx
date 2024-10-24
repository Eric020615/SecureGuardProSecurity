import { ICountry } from 'react-native-international-phone-number'
import { RoleEnum } from '../user'
import { getCurrentDate } from '@helpers/time'

export const signUpformDataJson = {
	email: '',
	password: '',
	confirmPassword: '',
}

export const userInforformDataJson = {
	firstName: '',
	lastName: '',
	userName: '',
	countryCode: {} as ICountry,
	phoneNumber: '',
	gender: '',
	dateOfBirth: getCurrentDate(),
	staffId: '',
}

export const signInformDataJson = {
	email: '',
	password: '',
	role: [RoleEnum.RESIDENT, RoleEnum.RESIDENT_SUBUSER], // Default value
}
