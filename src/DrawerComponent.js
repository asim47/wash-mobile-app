import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import { Logout } from './store/reducers'
const DrawerComponent = (props) => {


    const dispatch = useDispatch()



    const IsAuth = useSelector((state) => state.User.IsAuth)

    return (
        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 100 }}>
            <Image
                style={{ width: "90%" }}
                resizeMode="contain"
                source={require('./assests/logo.png')}
            />

            {
                IsAuth ? (
                    <>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>{
                                dispatch(Logout())
                                props.navigation.closeDrawer()
                            }}>
                            <Text style={styles.buttonTitle}>Logout</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => props.navigation.navigate("Login")}>
                            <Text style={styles.buttonTitle}>Go to Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => props.navigation.navigate("Register")}>
                            <Text style={styles.buttonTitle}>Go to Register</Text>
                        </TouchableOpacity>
                    </>
                )
            }


        </View>
    )
}

export default DrawerComponent

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        width: "90%",
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})
