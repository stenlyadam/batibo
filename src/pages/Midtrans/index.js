import React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const Midtrans = ({navigation, route}) => {

    const paymentLink = route.params;
    console.log('link : ', paymentLink);

    const onNavChange = (state) => {
        if(state.title == 'Example Domain'){
            navigation.navigate('OrderSummary');
        }
        if(state.title == 'Laravel'){
            navigation.navigate('OrderSummary');
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
