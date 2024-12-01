import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface TabIconProps {
	icon: React.ReactNode
	color: string
	name: string
	focused: boolean
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
	return (
		<View className="items-center justify-center gap-2">
			{icon}
			<Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs text-[${color}]`}>
				{name}
			</Text>
		</View>
	)
}

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#418371',
					tabBarInactiveTintColor: '#7D7F88',
					tabBarStyle: {
						height: 60,
						paddingBottom: 10,
						padding: 10,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: 'Home',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={<Entypo name="home" color={color} size={24} />}
								color={color}
								name="Home"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="parcel"
					options={{
						title: 'Parcel',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={
									<MaterialCommunityIcons name="package-variant-closed" color={color} size={24} />
								}
								color={color}
								name="package"
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile/[pageMode]"
					options={{
						title: 'Profile',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={<Ionicons name="person" color={color} size={24} />}
								color={color}
								name="Profile"
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	)
}

export default TabsLayout
