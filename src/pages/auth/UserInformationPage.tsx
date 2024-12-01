import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomFormField from '@components/form/CustomFormField'
import CustomButton from '@components/buttons/CustomButton'
import { ICountry } from 'react-native-international-phone-number'
import { GenderList } from '@config/listOption/user'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import * as DocumentPicker from 'react-native-document-picker'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { router } from 'expo-router'
import { getFile } from '@helpers/file'
import { ITimeFormat } from '@config/constant'
import { useApplication } from '@store/application/useApplication'
import { useModal } from '@store/modal/useModal'
import { useAuth } from '@store/auth/useAuth'
import { useUser } from '@store/user/useUser'
import { convertDateToDateString, getCurrentDate, initializeDate } from '@helpers/time'
import { userInforformDataJson } from '@config/constant/auth'

interface UserInformationForm {
	firstName: string
	lastName: string
	userName: string
	countryCode: ICountry
	phoneNumber: string
	gender: string
	staffId: string
	dateOfBirth: Date
}

const UserInformationPage = () => {
	const [selectedFiles, setSelectedFiles] = useState<DocumentPicker.DocumentPickerResponse[]>([])
	const [showCalendar, setShowCalendar] = useState(false)
	const setActionConfirmModal = useModal((state) => state.setActionConfirmModalAction)
	const createUserAction = useUser((state) => state.createUserAction)
	const tempToken = useAuth((state) => state.tempToken)
	const isLoading = useApplication((state) => state.isLoading)

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		phoneNumber: Yup.string()
			.required('Phone Number is required')
			.test('is-valid-phone', 'Phone number is not valid', (value) => {
				if (!value) return false
				const phone = parsePhoneNumberFromString(
					value,
					formik.values.countryCode.cca2 as CountryCode,
				)
				return phone ? phone.isValid() : false
			}),
		dateOfBirth: Yup.date().required('Date of Birth is required'),
		staffId: Yup.string().required('Staff id is required'),
		gender: Yup.string().required('Gender is required'),
	})
	const onDatePickerChange = (selectedDate?: Date) => {
		formik.setFieldValue(
			'dateOfBirth',
			initializeDate(selectedDate ? selectedDate : getCurrentDate()),
		)
		setShowCalendar(false)
	}
	const onFileChanged: () => Promise<void> = async () => {
		try {
			const pickerFile = await DocumentPicker.pick({
				type: [DocumentPicker.types.allFiles],
				allowMultiSelection: true,
				copyTo: 'cachesDirectory',
			})
			setSelectedFiles(pickerFile)
		} catch (error) {
			if (DocumentPicker.isCancel(error)) {
				console.log(error)
			} else {
				setActionConfirmModal({
					title: 'File Selection Failed',
					subtitle: 'Please try again or contact support if the issue persists.',
				})
			}
		}
	}
	const formik = useFormik<UserInformationForm>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: userInforformDataJson,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await createUserAction(
				{
					firstName: values.firstName,
					lastName: values.lastName,
					userName: values.userName,
					contactNumber: values.countryCode.callingCode + values.phoneNumber,
					gender: values.gender,
					dateOfBirth: convertDateToDateString(values.dateOfBirth, ITimeFormat.isoDateTime),
					staffId: values.staffId,
					supportedDocuments:
						selectedFiles.length > 0
							? await Promise.all(
									selectedFiles.map(async (selectedFile) => {
										const file = await getFile(selectedFile)
										return file
									}),
							  )
							: [],
				},
				tempToken,
			)
		},
	})
	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal
				onSuccessConfirm={() => {
					formik.resetForm()
					router.push('/')
				}}
			/>
			<ScrollView>
				<View className="w-full justify-center min-h-[85vh] px-4 my-8">
					<View className="items-center mb-7">
						<Text className="text-5xl font-bold text-primary">Welcome</Text>
						<Text className="text-xl font-pregular text-primary">We need something more</Text>
					</View>
					<CustomFormField
						title="Username"
						containerStyle="mb-3"
						type="Text"
						textValue={formik.values.userName}
						onChangeText={(e) => {
							formik.setFieldValue('userName', e)
						}}
						onBlur={formik.handleBlur('userName')}
						errorMessage={
							formik.touched.userName &&
							formik.errors.userName &&
							(formik.errors.userName as string)
						}
						placeholder={'Enter your username'}
					/>
					<CustomFormField
						title="First Name"
						containerStyle="mb-3"
						type="Text"
						textValue={formik.values.firstName}
						onChangeText={(e) => {
							formik.setFieldValue('firstName', e)
						}}
						onBlur={formik.handleBlur('firstName')}
						errorMessage={
							formik.touched.firstName &&
							formik.errors.firstName &&
							(formik.errors.firstName as string)
						}
						placeholder={'Enter your first name'}
					/>
					<CustomFormField
						title="Last Name"
						containerStyle="mb-3"
						type="Text"
						textValue={formik.values.lastName}
						onChangeText={(e) => {
							formik.setFieldValue('lastName', e)
						}}
						onBlur={formik.handleBlur('lastName')}
						errorMessage={
							formik.touched.lastName &&
							formik.errors.lastName &&
							(formik.errors.lastName as string)
						}
						placeholder={'Enter your last name'}
					/>
					<CustomFormField
						title="Phone Number"
						containerStyle="mb-3"
						type="Phone"
						phoneNumber={formik.values.phoneNumber}
						setPhoneNumber={(e) => {
							formik.setFieldValue('phoneNumber', e)
						}}
						selectedCountryCode={formik.values.countryCode}
						setSelectedCountryCode={(e) => {
							formik.setFieldValue('countryCode', e)
						}}
						onBlur={formik.handleBlur('phoneNumber')}
						errorMessage={
							formik.touched.phoneNumber &&
							formik.errors.phoneNumber &&
							(formik.errors.phoneNumber as string)
						}
						placeholder={'Enter phone number'}
					/>
					<View className="flex flex-row mb-3">
						<View className="flex-1 mr-2">
							<CustomFormField
								title="Date of Birth"
								textStyle="text-base"
								type="DateTime"
								selectedDate={
									formik.values.dateOfBirth ? formik.values.dateOfBirth : getCurrentDate()
								}
								onChange={onDatePickerChange}
								buttonTitle={convertDateToDateString(formik.values.dateOfBirth, ITimeFormat.date)}
								mode="date"
								errorMessage={
									formik.touched.dateOfBirth &&
									formik.errors.dateOfBirth &&
									(formik.errors.dateOfBirth as string)
								}
								setShowDateTime={setShowCalendar}
								showDateTime={showCalendar}
								placeholder={'DOB'}
							/>
						</View>
						<CustomFormField
							title="Gender"
							containerStyle="flex-1"
							type="Picker"
							selectedValue={formik.values.gender}
							onValueChange={(e) => {
								formik.setFieldValue('gender', e)
							}}
							items={GenderList}
							onBlur={formik.handleBlur('gender')}
							errorMessage={
								formik.touched.gender && formik.errors.gender && (formik.errors.gender as string)
							}
							placeholder={'Gender'}
						/>
					</View>
					<CustomFormField
						title="Staff Id"
						containerStyle="flex-1 mr-2"
						type="Text"
						textValue={formik.values.staffId}
						onChangeText={(e) => {
							formik.setFieldValue('staffId', e)
						}}
						onBlur={formik.handleBlur('staffId')}
						errorMessage={
							formik.touched.staffId && formik.errors.staffId && (formik.errors.staffId as string)
						}
						placeholder={'Enter your staff id'}
					/>
					<CustomFormField
						containerStyle="my-3"
						title="Supported Document"
						textStyle="text-base"
						type="FilePicker"
						selectedFiles={selectedFiles}
						onFileChanged={onFileChanged}
						clearFile={() => {
							setSelectedFiles([])
						}}
					/>
					<CustomButton
						title="Submit"
						handlePress={formik.handleSubmit}
						containerStyles="bg-primary p-3 w-full mt-7"
						isLoading={isLoading}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default UserInformationPage
