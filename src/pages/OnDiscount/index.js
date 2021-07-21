import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Gap, PageTitle, Product } from '../../components';
import { firebase } from '../../config';
import { colors } from '../../utils';

const OnDiscount = ({navigation}) => {

    const pushCart = (itemId, itemPrice) => {
        let item = {id: `${itemId}`, count: 1, price: itemPrice}
        dispatch({type: 'PUSH_CART', value:item})
    }
    
    const dispatch = useDispatch()

    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
    
        firebase
        .database()
        .ref('products/')
        .once('value')
        .then(response => {
            console.log('data: ', response.val());
            if (response.val()) {
            setListProduct(response.val());
            }
        })
        .catch(error => {
            showError(error.message);
        });
    }, []);

    return (
        <SafeAreaView style={styles.page}>
            <Gap height={10} />
            <View>
                <PageTitle title={"Sedang Discount"} />
            </View>
            <Gap height={14} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.productContainer}>
                    {console.log('listProduct: ', listProduct)}
                    {listProduct.map(item => {
                    return (
                        <Product
                        key={item.id}
                        name={item.name}
                        image={item.image}
                        category={item.category}
                        Price={item.price}
                        productUnit={item.productUnit}
                        discount={item.discount}
                        onBuy={() => pushCart(item.id, (item.price - (item.price * (item.discount/100))))}
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
