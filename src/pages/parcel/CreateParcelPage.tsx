import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useApplication } from '@store/application/useApplication'
import { useModal } from '@store/modal/useModal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import CustomButton from '@components/buttons/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomFormField from '@components/form/CustomFormField'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import { useParcel } from '@store/parcel/useParcel'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface CreateParcel {
	floor: string
	unitNumber: string
}

const CreateParcelPage = () => {
	const { isLoading } = useApplication()
	const { resetModalAction } = useModal()
	const { image } = useParcel()

	useEffect(() => {
		resetModalAction()
	}, [])

	const validationSchema = Yup.object().shape({
		floor: Yup.string().min(1).required('Floor is required'),
		unitNumber: Yup.string().min(1).required('Unit number is required'),
	})

	const formik = useFormik<CreateParcel>({
		enableReinitialize: true,
		validateOnBlur: false,
		initialValues: {
			floor: '',
			unitNumber: '',
		} as CreateParcel,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			console.log(values)
		},
	})

	return (
		<SafeAreaView className="bg-slate-100 h-full">
			<ActionConfirmationModal
				onSuccessConfirm={() => {
					formik.resetForm()
					router.push('/home')
				}}
			/>
			<ScrollView>
				{/* <ActionConfirmationModal title="Hi" isVisible={isModalVisible} onCloseModal={toggleModal} /> */}
				<View className="w-full min-h-[85vh] px-4 my-6">
					<View className="flex flex-row items-center">
						<CustomButton
							containerStyles="items-center h-fit"
							handlePress={() => {
								router.push('/home')
							}}
							rightReactNativeIcons={<Ionicons name="arrow-back" color={'#000000'} size={24} />}
						/>
					</View>
					<Text className="text-3xl text-black font-bold mt-6">Record Parcel</Text>
					<View className='mt-8'>
						<View className="items-center">
							{image ? (
								<Image source={{ uri: image.uri }} className="w-full aspect-[16/9] rounded-lg" />
							) : (
								<View className="w-24 h-24 bg-slate-300 rounded-full flex items-center justify-center">
									<MaterialCommunityIcons name="package-variant-closed" color="#10312b" size={24} />
								</View>
							)}
							<CustomButton
								title={image ? 'Retake' : 'Take Photo'}
								handlePress={() => router.push('/camera')}
								textStyles="text-primary text-lg font-bold"
								containerStyles="bg-transparent self-center mt-3"
							/>
						</View>
						<CustomFormField
							title="Floor"
							textStyle="text-base font-bold"
							type="Text"
							textValue={formik.values.floor}
							onChangeText={(e) => {
								formik.setFieldValue('floor', e)
							}}
							placeholder={'Enter floor'}
							errorMessage={
								formik.touched.floor && formik.errors.floor && (formik.errors.floor as string)
							}
						/>
						<CustomFormField
							containerStyle="mt-4"
							title="Unit number"
							textStyle="text-base font-bold"
							type="Text"
							textValue={formik.values.unitNumber}
							onChangeText={(e) => {
								formik.setFieldValue('unitNumber', e)
							}}
							placeholder={'Enter unit number'}
							errorMessage={
								formik.touched.unitNumber &&
								formik.errors.unitNumber &&
								(formik.errors.unitNumber as string)
							}
						/>
						<CustomButton
							title="Submit"
							handlePress={formik.handleSubmit}
							containerStyles="bg-primary p-4 w-full mt-8 self-center"
							isLoading={isLoading}
							textStyles="text-sm text-white"
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default CreateParcelPage
