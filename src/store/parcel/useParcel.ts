import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import { CameraCapturedPicture, CameraView } from 'expo-camera'
import { MutableRefObject } from 'react'

interface State {
	image: CameraCapturedPicture | null
	parcelImageData: string | null
}

interface Actions {
	retakePictureAction: () => void
	takePictureAction: (cameraRef: MutableRefObject<CameraView | null>) => Promise<void>
	saveImageAction: (imageData: string) => Promise<void>
}

export const useParcel = create<State & Actions>((set) => ({
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
	}
}))
