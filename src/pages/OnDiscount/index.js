import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { Gap, PageTitle, Product } from '../../components';
import { firebase } from '../../config';
import { colors, storeData } from '../../utils';
import {useDispatch , useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import { addCartAction, getProductData } from '../../redux/action';

const OnDiscount = ({navigation}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.loginReducer);
    const {token} = useSelector(state => state.loginReducer);
    const {cart} = useSelector(state => state.loginReducer);
    const {onDiscount} = useSelector(state => state.homeReducer);
    const [disableButton, setdisableButton] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout)); 
    }

    const pushCart = (toCart) => {
        setdisableButton(true);
        dispatch(addCartAction(user, token, cart, toCart));
        wait(1000).then(() => setdisableButton(false));
    }

    return (
        <SafeAreaView style={styles.page}>
            <Gap height={10} />
            <View>
                <PageTitle title={"Sedang Discount"} />
            </View>
            <Gap height={14} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.productContainer}>
                    {onDiscount.map(item => {
                    return (
                    <Product
                        key={item.id}
                        name={item.name}
                        image={{ uri: item.picturePath }}
                        category={item.category}
                        Price={item.price}
                        PriceAfterDiscount={item.price_after_discount}
                        productUnit={item.product_unit}
                        discount={item.discount}
                        disabledButton={disableButton}
                        onBuy={() => pushCart(item)}
                        onDetail={() => navigation.navigate('Detail', item)}
                    /> 
                    )
                })}
                </View>
                <Gap height={12} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default OnDiscount

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
    },
    productContainer: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
