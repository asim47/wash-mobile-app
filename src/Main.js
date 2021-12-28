import React from 'react'
import { View, Text } from 'react-native'
import { store } from './store/store'
import { Provider } from 'react-redux'
import Router from './Router'
const Main = () => {
    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    )
}

export default Main
