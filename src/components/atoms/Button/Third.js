import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {colors} from '../../../utils';

const Third = ({title, onSelected, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container(onSelected)}>
                <Text style={styles.text(onSelected)}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Third

const styles = StyleSheet.create({
    container : (onSelected) =>  ({ 
        backgroundColor : onSelected ? colors.primary : colors.white ,
        width: 102,
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 4,
        borderColor: colors.primary,
        borderWidth: 1.5,
    }),
    text: (onSelected) => ({
        color: onSelected ? colors.white : colors.primary ,
        textAlign: 'center',
        // fontSize: size,
        fontWeight: '400',
    }),
})
