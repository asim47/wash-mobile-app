import React, { useState } from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../common/StylesForLoginAndRegister';
import { useDispatch, useSelector } from 'react-redux';
import { validate } from 'email-validator';
import * as Actions from "../../store/actions"
import Loader from '../../common/Loader';


const LoginScreen = ({ navigation }) => {

    const dispatch = useDispatch()



    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [IsLoading, setIsLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")

    const onFooterLinkPress = () => {
        navigation.navigate('Register')
    }



    const onLoginPress = async () => {
        try {

            setErrorMsg("")
            setIsLoading(true)

            if (!validate(Email)) throw "Please enter a valid email address!"
            if (!Password) throw "Password enter your password!"


            const res = await dispatch(Actions.LoginFunction(Email, Password))

            if (res) throw res

            setIsLoading(false)
        } catch (error) {
            setErrorMsg(error)
            setIsLoading(false)
        }
    }


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    resizeMode="contain"
                    source={require('../../assests/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={Email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={Password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={{ textAlign: "center", color: "red" }}>{ErrorMsg}</Text>
                {
                    IsLoading ? <Loader/> : (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onLoginPress()}>
                            <Text style={styles.buttonTitle}>Log in</Text>
                        </TouchableOpacity>
                    )
                }

                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}


export default LoginScreen