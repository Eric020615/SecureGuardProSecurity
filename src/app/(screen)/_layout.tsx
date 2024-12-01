import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const ScreenLayout = () => {
	return (
		<>
			<Stack>
				{/* parcel */}
				<Stack.Screen
					name="parcel/create"
					options={{
						headerShown: false,
					}}
				/>
				{/* face-auth */}
				<Stack.Screen
					name="face-auth/index"
					options={{
						headerShown: false,
					}}
				/>
				{/* reset password */}
				<Stack.Screen
					name="reset-password/index"
					options={{
						headerShown: false,
					}}
				/>
				{/* card */}
				<Stack.Screen
					name="card/index"
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
