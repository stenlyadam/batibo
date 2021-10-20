import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview';

const Midtrans = ({navigation, route}) => {

    const paymentLink = route.params;
    console.log('link : ', paymentLink);

    const onNavChange = (state) => {
        console.log('state: ', state);
        const titleWeb = 'Example Domain';

        if(state.title == titleWeb){
            navigation.goBack();
        }
    }

    return (
        <WebView
        source={{ uri: paymentLink }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={onNavChange}
        />
    )
}

export default Midtrans

const styles = StyleSheet.create({})
