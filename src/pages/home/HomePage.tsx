import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@assets/index'
import { useUser } from '@store/user/useUser'
import ActionConfirmationModal from '@components/modals/ActionConfirmationModal'
import UserAvatar from '@bhavberi/react-native-user-avatar/src'

const HomePage = () => {
	const { userProfile, getUserProfileByIdAction } = useUser()
	useEffect(() => {
		fetchUserProfileByUserId()
	}, [])
	const fetchUserProfileByUserId = async () => {
		await getUserProfileByIdAction()
	}
	return (
		<SafeAreaView className="bg-slate-100 h-full w-full">
			<ActionConfirmationModal />
			<ScrollView>
				<View className="min-w-full">
					<Image source={images.homeBackground} />
					<View className="absolute flex flex-row justify-between w-full top-10 px-6">
						<Text className="text-white font-bold text-2xl">Welcome {userProfile.userName}</Text>
						<UserAvatar name={userProfile?.userName || 'User'} size={40} bgColor="#10312b" />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomePage
