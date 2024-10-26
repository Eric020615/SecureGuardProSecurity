import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import { CameraCapturedPicture, CameraView } from 'expo-camera'
import { MutableRefObject } from 'react'
import { CreateParcelDto } from '@dtos/parcel/parcel.dto'
import { createParcel } from '@api/parcelManagementService/parcelManagementService'
import { convertImageToBase64 } from '@helpers/file'

interface State {
	image: CameraCapturedPicture | null
	parcelImageData: string | null
}

interface Actions {
	retakePictureAction: () => void
	takePictureAction: (cameraRef: MutableRefObject<CameraView | null>) => Promise<void>
	saveImageAction: (imageData: string) => Promise<void>
	createParcelAction: (createParcelDto: CreateParcelDto) => Promise<any>
}

export const useParcel = create<State & Actions>((set, get) => ({
	image: null,
	parcelImageData: null,
	retakePictureAction: () => {
		set({ image: null })
	},
	takePictureAction: async (cameraRef: MutableRefObject<CameraView | null>) => {
		return generalAction(
			async () => {
				if (!cameraRef) {
					throw new Error('Camera not found. Please try again.')
				}
				const data = await cameraRef.current?.takePictureAsync()
				set({ image: data })
			},
			'', // Custom success message
			'Failed to take picture. Please try again.', // Custom error message
		)
	},
	saveImageAction: async (imageData: string) => {
		set({ parcelImageData: imageData })
	},
	createParcelAction: async (createParcelDto: CreateParcelDto) => {
		return generalAction(
			async () => {
				const { image } = get()
				const base64 = await convertImageToBase64(image)
				createParcelDto.parcelImage = base64
				const response = await createParcel(createParcelDto)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				return response
			},
			'Parcel created successfully!',
			'Failed to create parcel. Please try again.',
		)
	},
}))
