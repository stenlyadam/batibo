import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator  } from 'react-native'
import {Button, TextInput, Gap} from '../../components';
import {colors, fonts, getData, storeData, showMessage} from '../../utils';
import { API_HOST, firebase } from '../../config';
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';
import {IMGMapPin} from '../../assets';
import axios from 'axios';

const Map = ({navigation, route}) => {

    const initialState = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    }
    
    const sellerCoords = {
        latitude: 1.4171754552237659, 
        longitude: 124.98753217980266, 
    }

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.loginReducer);
    const [currentPosition, setCurrentPosition] = useState(initialState);
    
    const onChangeRegion = (location) => {
        setCurrentPosition({
            latitude: location.latitude, 
            longitude: location.longitude, 
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        })
        console.log("location: ", location)
    }

    const onButtonPress = () => {
        const distance = getDistance(
            { latitude: currentPosition.latitude, longitude: currentPosition.longitude},
            { latitude: sellerCoords.latitude, longitude: sellerCoords.longitude }
        )  
        console.log('distance: ', distance)
        if(distance >= 80000){
            showMessage('Lokasi Anda terlalu jauh dari penjual');
        }
        else{
            dispatch({type: 'SET_COORDINATES', value: {latitude: currentPosition.latitude, longitude: currentPosition.longitude, distance: getDistance(
                { latitude: currentPosition.latitude, longitude: currentPosition.longitude},
                { latitude: sellerCoords.latitude, longitude: sellerCoords.longitude }
            )}});
            showMessage('Berhasil menyimpan lokasi', 'success');
            navigation.goBack();
        }
    }

        useEffect(() => {
        Geolocation.getCurrentPosition((position) => {
            console.log("Position: ", position)
            const { longitude, latitude } = position.coords;
            setCurrentPosition({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
        }, [])

    return currentPosition.latitude ? (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={currentPosition}
                onRegionChangeComplete = {onChangeRegion}
            />
            <Marker
            coordinate={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }}
            title={'Lat: ' + currentPosition.latitude + ', Long: ' + currentPosition.longitude}
          />
            <View style={styles.pinContainer}>
                <Image style={styles.pinImage} source={IMGMapPin} />
            </View>
            <Button
            title={"Set Location"}
            onPress={() => onButtonPress()}
            />
        </View>
    ) 
    : <ActivityIndicator style={{ flex: 1 }} animating size="large" />
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    pinContainer: {
        top: '50%',
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
    },
    pinImage: {
        height: 48,
        width: 48,
    },
    contentWrapper: {
        marginVertical: 38,
        marginHorizontal: 24,
    },
    titleTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
    },
    titleText: {
        fontFamily: fonts.nunito.semibold,
        fontSize: 22,
        opacity: 0.7,
    }
})

