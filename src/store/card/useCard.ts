import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication' // Import the generalAction utility
import { createUserCard, getUserCard } from '@api/cardService/cardService'
import { IResponse } from '@api/globalHandler'
import { GetCardByUserDto } from '@dtos/card/card.dto'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface State {
	card: GetCardByUserDto
}

interface Actions {
	createCardAction: () => Promise<IResponse<any>>
	getCardAction: () => Promise<IResponse<GetCardByUserDto>>
}

export const useCard = create<State & Actions>((set) => ({
	card: {} as GetCardByUserDto,
	createCardAction: async () => {
		return generalAction(
			async () => {
				const response = await createUserCard()
				if (!response?.success) {
					throw new Error(response.msg)
				}
				return response
			},
			'Card created successfully.', // Custom success message
			'Card creation failed. Please try again.', // Custom error message
		)
	},
	getCardAction: async () => {
		return generalAction(
			async () => {
				const response = await getUserCard()
				if (!response?.success) {
					set({ card: {} as GetCardByUserDto })
					await AsyncStorage.removeItem('card')
					throw new Error(response.msg)
				}
				await AsyncStorage.setItem('card', response.data.badgeNumber)
				set({ card: response.data })
				return response
			},
			'', // Custom success message
			'Card fetch failed. Please try again.', // Custom error message
		)
	},
}))
