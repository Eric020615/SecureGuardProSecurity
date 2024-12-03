import { GenderDescriptionEnum } from "../user"

export const signUpConst = {
    email: "",
    password: "",
    confirmPassword: ""
}

export const userInforConst = {
    firstName: '',
    lastName: '',
    userName: '',
    countryCode: null,
    phoneNumber: '',
    gender: 'M' as keyof typeof GenderDescriptionEnum,
	staffId: '',
    dateOfBirth: null
}

export const signInConst = {
    email: "",
    password: "",
}