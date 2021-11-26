import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Loading = () => {
    return (
    <View style={styles.wrapper}>
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.text}>Loading.....</Text>
        </View>
    </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.loading.backgroundColor,
        width: '100%',
        height: '100%',
    },
    container: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 2,
        paddingHorizontal: 24,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        width: 256,
        position: 'relative',
        backgroundColor: colors.loading.containerColor
    },
    text: {
        letterSpacing:0.4,
        marginLeft: 24,
        fontSize: 15,
        color: colors.text.secondary,
        fontFamily: fonts.nunito.normal,
        
    },
});
