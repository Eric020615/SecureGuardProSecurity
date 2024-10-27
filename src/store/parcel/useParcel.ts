import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import { CameraCapturedPicture, CameraView } from 'expo-camera'
import { MutableRefObject } from 'react'
import { CreateParcelDto } from '@dtos/parcel/parcel.dto'
import { createParcel } from '@api/parcelService/parcelService'
import { convertImageToBase64 } from '@helpers/file'

interface State {
	image: CameraCapturedPicture | null
}

interface Actions {
	resetPictureAction: () => void
	takePictureAction: (cameraRef: MutableRefObject<CameraView | null>) => Promise<void>
	createParcelAction: (createParcelDto: CreateParcelDto) => Promise<any>
}

export const useParcel = create<State & Actions>((set, get) => ({
	image: null,
	resetPictureAction: () => {
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
