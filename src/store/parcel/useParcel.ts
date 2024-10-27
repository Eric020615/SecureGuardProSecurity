import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import { CameraCapturedPicture, CameraView } from 'expo-camera'
import { MutableRefObject } from 'react'
import { CreateParcelDto, GetParcelDto } from '@dtos/parcel/parcel.dto'
import { createParcel, getParcels } from '@api/parcelService/parcelService'
import { convertImageToBase64 } from '@helpers/file'

interface State {
	image: CameraCapturedPicture | null
	parcels: GetParcelDto[]
	id: number
	totalParcels: number
}

interface Actions {
	resetPictureAction: () => void
	takePictureAction: (cameraRef: MutableRefObject<CameraView | null>) => Promise<void>
	createParcelAction: (createParcelDto: CreateParcelDto) => Promise<any>
	getParcelsAction: (limit: number) => Promise<any>
	resetParcelAction: () => void
}

export const useParcel = create<State & Actions>((set, get) => ({
	image: null,
	parcels: [],
	id: 0,
	totalParcels: 0,
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
	getParcelsAction: async (limit: number) => {
		return generalAction(
			async () => {
				const { id } = get()
				const response = await getParcels(id, limit)
				if (!response?.success) {
					throw new Error(response.msg)
				}
				set((state) => ({
					parcels: [...state.parcels, ...response.data.list],
					id: response.data.list.length > 0
							? response.data.list[response.data.list.length - 1]?.parcelId
							: 0,
					totalParcels: response.data.count,
				}))
				return response
			},
			'',
			'Failed to retrieve Parcels. Please try again.',
		)
	},
	resetParcelAction() {
		set({ parcels: [], id: 0, totalParcels: 0 })
	},
}))
