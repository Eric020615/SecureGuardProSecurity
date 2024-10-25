import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const ScreenLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen
					name="camera/index"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="parcel/create"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>

			<StatusBar backgroundColor="#10312B" style="light" />
		</>
	)
}

export default ScreenLayout
