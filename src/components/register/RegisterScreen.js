import { CircularProgress } from 'native-base';
import React, { useState } from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../common/StylesForLoginAndRegister';
import { useDispatch, useSelector } from 'react-redux';
import { validate } from 'email-validator';
import * as Actions from "../../store/actions"
import Loader from '../../common/Loader';

const RegisterScreen = ({ navigation }) => {


    const dispatch = useDispatch()

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Address, setAddress] = useState('')
    const [IsLoading, setIsLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = async () => {
        try {

            setErrorMsg("")
            setIsLoading(true)

            if (!Name) throw "Please enter your name!"
            if (!validate(Email)) throw "Please enter a valid email address!"
            if (Password.length < 8) throw "Password should be atleast 8 characters long!"
            if (!Address) throw "Please enter your address!"


            const res = await dispatch(Actions.RegisterFunction(Name, Email, Password, Address))

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
                    placeholder='Name*'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={Name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail*'
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
                    placeholder='Password*'
                    onChangeText={(text) => setPassword(text)}
                    value={Password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    multiline
                    style={styles.input}
                    placeholder='Address*'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setAddress(text)}
                    value={Address}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={{ textAlign: "center", color: "red" }}>{ErrorMsg}</Text>
                {
                    IsLoading ? <Loader /> : (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onRegisterPress()}>
                            <Text style={styles.buttonTitle}>Register</Text>
                        </TouchableOpacity>
                    )
                }
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Login</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}


export default RegisterScreen