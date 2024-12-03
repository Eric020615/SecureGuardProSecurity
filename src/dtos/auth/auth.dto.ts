export interface UserSignUpFormDto {
	email: string
	password: string
	confirmPassword: string
}

export interface SignInFormDto {
	email: string
	password: string
}

export interface ForgotPasswordDto {
	email: string
}

export interface ResetPasswordDto {
	currentPassword: string
	newPassword: string
}