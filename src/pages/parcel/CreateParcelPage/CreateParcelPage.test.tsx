import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react-native'
import CreateParcelPage from './CreateParcelPage'
import { createParcel } from '@api/parcelService/parcelService'
import { router } from 'expo-router'

jest.mock('expo-router', () => ({
	...jest.requireActual('expo-router'),
	router: {
		...jest.requireActual('expo-router').router,
		push: jest.fn(),
	},
}))

jest.mock('@store/parcel/useParcel', () => {
	const originalModule = jest.requireActual('@store/parcel/useParcel') // Retain the original module
	return {
		...originalModule,
		useParcel: jest.fn().mockReturnValue({
			...originalModule.useParcel.getState(),
			image: {
				uri: 'file:///mocked-path-to-image.png', // Mock a valid local file path
				width: 300, // Example dimensions
				height: 300,
				base64: 'mockBase64String', // Optional
				exif: {}, // Optional
			},
		}),
	}
})

jest.mock('@helpers/file', () => ({
	convertImageToGeneralFile: jest.fn().mockReturnValue({
		fileName: 'captured-image.jpg',
		fileData: 'mockBase64String',
		contentType: 'image/jpeg', // Assuming JPEG for captured images
		size: '', // Approximation: base64 size (in bytes)
	}),
}))

const mockPropertyList = [
	{ floorId: '1', units: [{ unitId: '101', isAssigned: false, assignedTo: null }] },
	{ floorId: '2', units: [{ unitId: '201', isAssigned: false, assignedTo: null }] },
]

jest.mock('@store/refData/useRefData', () => ({
	useRefData: () => {
		return {
			propertyList: mockPropertyList,
			getPropertyListAction: jest.fn().mockResolvedValue({
				success: true,
				data: mockPropertyList,
				msg: '',
			}),
		}
	},
}))

jest.mock('@api/parcelService/parcelService', () => ({
	...jest.requireActual('@api/parcelService/parcelService'),
	createParcel: jest.fn().mockReturnValue({
		success: true,
		msg: 'Parcel created successfully!',
		data: null,
	}),
}))

describe('CreateParcelPage', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	const setup = async () => {
		const utils = render(<CreateParcelPage />)

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 0)) // Ensure all async effects run
		})

		return {
			...utils,
			fillFloor: async (floor: string) => {
				await act(async () => {
					fireEvent(utils.getByTestId('floor-form-field'), 'onValueChange', floor)
				})
			},
			fillUnit: async (unit: string) => {
				await act(async () => {
					fireEvent(utils.getByTestId('unit-form-field'), 'onValueChange', unit)
				})
			},
			triggerSubmit: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('submit-button'))
				})
			},
			triggerTakePhoto: async () => {
				await act(async () => {
					fireEvent.press(utils.getByTestId('take-photo-button'))
				})
			},
		}
	}

	it('verifies the Circular button', async () => {
		const { triggerTakePhoto } = await setup()
		await triggerTakePhoto()
		await waitFor(() => {
			expect(router.push).toHaveBeenCalledTimes(1)
			expect(router.push).toHaveBeenCalledWith('/(screen)/parcel/camera')
		})
	})

	it('verify floor field', async () => {
		const { fillFloor, queryByText, triggerSubmit } = await setup()
		await fillFloor('1')
		await triggerSubmit()
		expect(queryByText('Floor number is required')).toBeNull()
		await fillFloor('')
		await triggerSubmit()
		expect(queryByText('Floor number is required')).toBeTruthy()
	})

	it('verify unit field', async () => {
		const { fillFloor, fillUnit, queryByText, triggerSubmit } = await setup()
		await fillFloor('1')
		await fillUnit('101')
		await triggerSubmit()
		expect(queryByText('Unit number is required')).toBeNull()
		await fillUnit('')
		await triggerSubmit()
		expect(queryByText('Unit number is required')).toBeTruthy()
	})

	it('verify the submit button', async () => {
		const { fillFloor, fillUnit, triggerSubmit, queryByText } = await setup()
		await fillFloor('1')
		await fillUnit('101')
		// Submit the form
		await triggerSubmit()
		await waitFor(() => {
			expect(createParcel).toHaveBeenCalledTimes(1)
			expect(createParcel).toHaveBeenCalledWith({
				floor: '1',
				parcelImage: {
					contentType: 'image/jpeg',
					fileData: 'mockBase64String',
					fileName: 'captured-image.jpg',
					size: '',
				},
				unit: '101',
			})
			expect(queryByText('Parcel created successfully!')).toBeTruthy()
		})
	})
})
