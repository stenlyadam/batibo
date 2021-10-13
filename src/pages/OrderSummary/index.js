import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { PageTitle, Button } from '../../components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors, fonts} from '../../utils';
import OrderDetail from '../Payment/OrderDetail';
import DeliveryDetail from '../Payment/DeliveryDetail';

const Tab = createMaterialTopTabNavigator();

const OrderSummary = ({navigation, route}) => {

    const {transaction, status} = route.params;
    const dispatch = useDispatch();
    const {order} = useSelector(state => state.orderReducer);
    const {checkout} = useSelector(state => state.loginReducer);
    const [listOrder, setListOrder] = useState([]);
    const [statusOrder, setStatusOrder] = useState(transaction.status);
    const [statusText, setStatusText] = useState(colors.text.secondary);

    useEffect(() => {
        if(status == 'PENDING'){
            setStatusText(colors.status.pending);
        }
        else if(status == 'SUCCESS'){
            setStatusText(colors.status.on_delivery);
        }
        else if(status == 'ON_DELIVERY'){
            setStatusText(colors.status.on_delivery);
        }
        else if(status == 'CANCELLED'){
            setStatusText(colors.status.cancelled);
        }
        else if(status == 'DELIVERED'){
            setStatusText(colors.status.delivered);
        }

        order.map(item => {
            if(transaction.id == item.transaction_id){
                const data = item;
                setListOrder(listOrder => [...listOrder, data])
            }
        })      
    }, [order])

    useEffect(() => {
        dispatch({type: 'SET_CHECKOUT', value: listOrder})
    },[checkout])

    return (
        <SafeAreaView style={styles.container}>
        <PageTitle title="Ringkasan Pesanan" onBack={() => navigation.goBack()} />
        <View style={styles.summaryContainer}>
            <View style={styles.amountContainer}>
            <Text style={styles.amountText}>amount</Text>
            <View style={styles.rpTextContainer}>
                <Text style={styles.rpText}>Rp</Text>
            </View>
            <View style={styles.priceTextContainer}>
                <Text style={styles.priceText}>{(transaction.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            </View>
            </View>
            <View style={styles.line} />
            <View style={styles.orderIdContainer}>
            <Text style={styles.idPesananText}>ID Pesanan</Text>
            <View style={styles.idContainer}>
                <Text style={styles.idText}>{transaction.id}</Text>
            </View>
            </View>
            <View style={styles.orderIdContainer}>
            <Text style={styles.idPesananText}>Status Pesanan</Text>
            <View style={styles.idContainer}>
                <Text style={styles.statusText(statusText)}>{statusOrder}</Text>
            </View>
            </View>
        </View>
    
        <View style={styles.contentWrapper}>
            <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                fontFamily: fonts.primary.normal,
                textTransform: 'capitalize',
                fontSize: 14,
                fontWeight: '600',
                },
                indicatorStyle: {
                backgroundColor: colors.button.green,
                },
            }}>
            <Tab.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{tabBarLabel: 'Detail Order'}}
            />
            <Tab.Screen
                name="DeliveryDetail"
                component={DeliveryDetail}
                options={{tabBarLabel: 'Detail Pengiriman'}}
            />
            </Tab.Navigator>
        </View>
        <View style={styles.bottomWrapper}>
            <View style={styles.nextContainer}>
            <View style={styles.next}>
                <Button title="Lakukan Pembayaran" borderRadius={4} onPress={() => console.log('lakukan pembayaran')}/>
            </View>
            </View>
        </View>
        </SafeAreaView>
    );
};

    export default OrderSummary;

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32,
        },
        summaryContainer: {
        height: 144,
        width: 347,
        borderRadius: 8,
        backgroundColor: 'white',
        marginTop: 40,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.grey,
        paddingBottom: 80,
        shadowColor: colors.text.grey,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 15,
        },
        amountContainer: {
        flexDirection: 'row',
        width: 310,
        height: 27,
        marginTop: 16,
        marginHorizontal: 16,
        },
        amountText: {
        color: colors.text.quartenary,
        fontSize: 16,
        fontFamily: fonts.nunito.semibold,
        },
        priceTextContainer: {
        justifyContent: 'center',
        paddingBottom: 8,
        },
        priceText: {
        color: colors.text.quartenary,
        fontSize: 24,
        fontFamily: fonts.nunito.semibold,
        },
        rpTextContainer: {
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 8,
        justifyContent: 'center',
        paddingBottom: 20,
        },
        rpText: {
        color: colors.text.quartenary,
        fontSize: 16,
        fontFamily: fonts.nunito.semibold,
        },
        line: {
        backgroundColor: colors.text.quartenary,
        width: 347,
        height: 1,
        marginTop: 5,
        },
        orderIdContainer: {
        height: 16,
        width: 310,
        flexDirection: 'row',
        marginVertical: 13,
        marginHorizontal: 16,
        },
        idContainer: {
        alignItems: 'flex-end',
        flex: 1,
        },
        idPesananText: {
        fontSize: 12,
        color: colors.text.secondary,
        fontFamily: fonts.nunito.semibold,
        },
        idText: {
        fontSize: 14,
        color: colors.text.secondary,
        fontFamily: fonts.nunito.semibold,
        },
        statusText : (statusText) => ({
            fontSize: 14,
            color: statusText,
            fontFamily: fonts.nunito.semibold,
        }),
        contentWrapper: {
        backgroundColor: colors.white,
        width: 347,
        height: 260,
        alignSelf: 'center',
        marginTop: 17,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.grey,
        paddingHorizontal: 15,
        shadowColor: colors.text.grey,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 15,
        },
        bottomWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        },
        nextContainer: {
        borderColor: colors.grey,
        borderWidth: 1,
        height: 76,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        },
        next: {
        marginHorizontal: 24,
        },
    });
