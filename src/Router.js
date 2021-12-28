import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import DrawerComponent from './DrawerComponent';

import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Actions from "./store/actions"

const Drawer = createDrawerNavigator();



const MyDrawer = () => {

    const dispatch = useDispatch()

    const [IsLoading, setIsLoading] = useState(true)

    const IsAuth = useSelector((state) => state.User.IsAuth)

    useEffect(() => {
        checkForUser()
    }, [])

    const checkForUser = async () => {
        const Token = await AsyncStorage.getItem("@Token")
        if (Token) {
            await dispatch(Actions.VerifyToken(Token))
            setIsLoading(false)

        } else {
            setIsLoading(false)
        }
    }

    if (IsLoading) return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"white" }}>
            <ActivityIndicator color="blue" size="large" />
        </View>
    )

    return (
        <NavigationContainer >
            <Drawer.Navigator
                drawerContent={(props) => <DrawerComponent {...props} />}
                screenOptions={{ headerShown: true, drawerStyle: { width: "80%" } }}
                initialRouteName="App"
            >
                {
                    IsAuth ? (
                        <Drawer.Screen name="Home" component={Home} />

                    ) : (
                        <>
                            <Drawer.Screen name="Login" component={Login} />
                            <Drawer.Screen name="Register" component={Register} />
                        </>
                    )
                }
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


export default MyDrawer

const styles = StyleSheet.create({})
