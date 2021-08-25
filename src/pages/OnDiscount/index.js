import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { Gap, PageTitle, Product } from '../../components';
import { firebase } from '../../config';
import { colors, storeData } from '../../utils';
import {useDispatch , useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

const OnDiscount = ({navigation}) => {
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [listProduct, setListProduct] = useState([]);
    const [listCartCheck, setListCartCheck] = useState([]);

    useEffect(() => {
        firebase
        .database()
        .ref('products/')
        .once('value')
        .then(response => {
            // console.log('data: ', response.val());
            if (response.val()) {
            const data = response.val();
            const filterData = data.filter(element => element !== null);
            // console.log('data hasil filter : ', filterData);
            setListProduct(filterData);
            }
        })
        .catch(error => {
            showMessage({
                message: error.message,
                type: 'default',
                backgroundColor: colors.error,
                color: colors.white,
            });
        });
        dispatch({type: 'SET_LOADING', value: false});
        setListCartCheck(user.cart)
    }, [user.cart]);

    const pushCart = (toCart) => {

        const data = {
            category: toCart.category,
            detail: toCart.detail,
            discount: toCart.discount,
            id: user.cart.length,
            image: toCart.image,
            name: toCart.name,
            price: toCart.price,
            priceAfterDiscount: toCart.priceAfterDiscount,
            productUnit: toCart.productUnit,
            count: user.cart.length
        } 
        console.log('data id sebelum : ', data.id );
    
        let checkCart = false;
    
        console.log('----------------------------');
        // console.log('cart length : ', form.cart.length)
        {listCartCheck.map(item => {
            if(item.name == toCart.name){
            checkCart = true;
            data.count = item.count
            data.count++
            data.id = item.id
            // console.log('data id sesudah dicek : ', data.count );
            }
            else{
            // console.log('kok tidak ada siii');
            }
            // console.log(' hallloooo jugaa ifff sudah di cek ? ', checkCart)
        })}    
    
        if (checkCart == false) {
            console.log('tidak ada data');
            data.count = 1;
        }
    
        console.log('data count untuk database: ', data.count);
    
        firebase.database()
            .ref(`users/${user.uid}/cart/`)
            .child(data.id)
            .set(data)
            .then(() => {
                dispatch({type: 'SET_LOADING', value: true});
                  //tambah data ke redux - code marshal
                const toCartPrice = toCart.price - (toCart.price * (toCart.discount/100));
                let item = {id: `${toCart.id}`, count: data.count, price: toCartPrice}
                dispatch({type: 'PUSH_CART', value:item})
                
                firebase
                .database()
                .ref(`users/${user.uid}/`)
                .once('value')
                .then(snapshot => {
                    storeData('user', snapshot.val());
                    dispatch({type: 'SAVE_USER', value:snapshot.val()})
                    navigation.replace('OnDiscount');
                    showMessage({
                        message: "Data Cart Anda berhasil ditambahkan",
                        type: 'default',
                        backgroundColor: colors.primary,
                        color: colors.white,
                    })
                })
            })
            .catch(error => {
                showMessage({
                    message: error.message,
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                });
            });
        
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
                    {console.log('listProduct: ', listProduct)}
                    {listProduct.map(item => {
                    return (
                        <Product
                        key={item.id}
                        name={item.name}
                        image={item.image}
                        category={item.category}
                        Price={item.price}
                        PriceAfterDiscount={item.priceAfterDiscount}
                        productUnit={item.productUnit}
                        discount={item.discount}
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
