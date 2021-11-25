import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Loading = () => {
    return (
    <View style={styles.wrapper}>
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.text}>Loading....</Text>
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
        paddingHorizontal: 22,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: 222,
        position: 'relative',
        backgroundColor: colors.loading.containerColor
    },
    text: {
        letterSpacing:0.4,
        marginLeft: 18,
        fontSize: 16,
        color: colors.text.secondary,
        fontFamily: fonts.nunito.normal,
        
    },
});
