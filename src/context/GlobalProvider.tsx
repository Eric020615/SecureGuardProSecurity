import { RoleEnum } from '@config/constant/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '@store/auth/useAuth'
import { router, useGlobalSearchParams, usePathname } from 'expo-router'
import React, { useContext, useEffect } from 'react'

export const GlobalContext = React.createContext<any>(null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { checkJwtAuthAction } = useAuth()
	const pathname = usePathname()
	const params = useGlobalSearchParams()

	const checkToken = async (redirectToHome = false) => {
		try {
			if (
				pathname == '/sign-up' ||
				pathname == '/sign-in' ||
				pathname == '/user-information' ||
				pathname == '/forgot-password'
			) {
				return
			}
			const value = await AsyncStorage.getItem('token')
			if (!value) {
				throw new Error('Unauthorized')
			}
			const response = await checkJwtAuthAction(value)
			if (!response.success) {
				throw new Error('Unauthorized')
			}
			if (response.data.role !== RoleEnum.STAFF && response.data.role !== RoleEnum.SYSTEM_ADMIN) {
				throw new Error('Invalid Role')
			}
			if (redirectToHome) {
				router.push('/home')
			}
		} catch (error) {
			router.push('/sign-in')
		}
	}

	// Track the location in your analytics provider here.
	useEffect(() => {
		checkToken(true)
	}, [])

	// Track the location in your analytics provider here.
	useEffect(() => {
		checkToken()
	}, [pathname, params])

	return <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>
}

export default GlobalProvider
