import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, {useState} from 'react'
import LoginSreen from '../screens/authScreens/LoginSreen'
import RegisterScreen from '../screens/authScreens/RegisterScreen'
import ForgotPassword from '../screens/authScreens/ForgotPassword'

const Stack = createNativeStackNavigator()

const AuthStack = () => {

    const navigationOptions = {
        headerShown: false,
        gestureEnabled: false
    }

    return (
        <Stack.Navigator screenOptions={navigationOptions}>
            <Stack.Screen component={LoginSreen} name="Login" />
            <Stack.Screen component={RegisterScreen} name="Register" />
            <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
        </Stack.Navigator>
    )
}

export default AuthStack