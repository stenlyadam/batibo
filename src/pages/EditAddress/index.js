import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {Button, TextInput, Gap} from '../../components';
import {colors, fonts, getData, storeData, showMessage} from '../../utils';
import { API_HOST, firebase } from '../../config';
import { useDispatch, useSelector } from "react-redux";
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import axios from 'axios';

const EditAddress = ({navigation, route}) => {

    const item = route.params; 
    console.log('item : ', item);
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.loginReducer);
    const {coordinates} = useSelector(state => state.orderReducer);

    const [form, setForm] = useState({
        detail_alamat: item.detail_alamat,
        nama_penerima: item.nama_penerima,
        nomor_handphone: item.nomor_handphone,
        email: item.email,
        kategori : item.kategori,
        kecamatan : item.kecamatan,
        kelurahan : item.kelurahan,
        kota_kabupaten : item.kota_kabupaten,
    }, [])

    const [initCoordinates] = useState({
        latitude: item.latitude,
        longitude: item.longitude,
    })

    useEffect(() => {
        dispatch({type: 'SET_COORDINATES', value: initCoordinates});
    }, [])

    const changeText = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const updateAddressData = () => {
        const data = {
            id : item.id,
            detail_alamat: form.detail_alamat,
            nama_penerima: form.nama_penerima,
            nomor_handphone: form.nomor_handphone,
            email: form.email,
            kategori : form.kategori,
            kecamatan : form.kecamatan,
            kelurahan : form.kelurahan,
            kota_kabupaten : form.kota_kabupaten,
            provinsi : item.provinsi,
        };

        
        console.log('to update address: ', data);

        //jika detail alamat belum diisi
        if(data.detail_alamat == null || data.detail_alamat == ''){
            showMessage('Anda belum mengisi detail alamat');
        }
        //jika nama penerima belum diisi
        else if(data.nama_penerima == null || data.nama_penerima == ''){
            showMessage('Anda belum mengisi nama penerima');
        }
            //jika nomor_handphone belum diisi
        else if(data.nomor_handphone == null || data.nomor_handphone == ''){
            showMessage('Anda belum mengisi nomor handphone');
        }
            //jika email belum diisi
        else if(data.email == null || data.email == ''){
            showMessage('Anda belum mengisi email');
        }
        //jika kategori alamat belum diisi
        else if(data.kategori == null || data.kategori == ''){
            showMessage('Anda belum mengisi kategori');
        }
        //jika kecamatan belum diisi
        else if(data.kecamatan == null || data.kecamatan == ''){
            showMessage('Anda belum mengisi kecamatan');
        }
        //jika kelurahan belum diisi
        else if(data.kelurahan == null || data.kelurahan == ''){
            showMessage('Anda belum mengisi kelurahan');
        }
        //jika kota/kabupaten belum diisi
        else if(data.kota_kabupaten == null || data.kota_kabupaten == ''){
            showMessage('Anda belum mengisi kota/kabupaten');
        }
        //jika semua data telah diisi
        else{
        
        //update address dalam database (addresses)
        axios.post(`${API_HOST.url}/address/${data.id}`, data, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : token,
            }
        })
        //update data address dalam database (addresses) - jika berhasil
        .then(resAddress => {
        //ambil data address terbaru dari database
        axios.get(`${API_HOST.url}/address`, {
            headers: {
            'Accept' : 'application/json',
            'Authorization' : token,
            }
        })
        //ambil data address terbaru dari database - jika berhasil
        .then(resUpdateAddress => {
            //simpan data ADDRESS user ke dalam data reducer
            dispatch({type: 'SET_ADDRESS', value: resUpdateAddress.data.data.data});
            navigation.goBack();
            showMessage('Alamat Berhasil Di Update', 'success');
        })
        //ambil data address terbaru dari database - jika tidak berhasil
        .catch(errUpdateAddress => {
            showMessage('Terjadi kesalahan pada penambahan data');
        })
        })
        //update data address ke database (addresses) - jika tidak berhasil
        .catch((errAddress) => {
            showMessage('Terjadi kesalahan pada penghapusan data product pada API Address User');
        })
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.backButtonContainer}>
                <Button
                    type="icon-only"
                    icon="icon-arrow-back"
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    borderRadius={4}
                />
                </View>
                <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>Ubah Alamat</Text>
                </View>
            </View> 

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentWrapper}>
                <Text style={styles.textInputTitle}>Lokasi Pickup</Text>
                    <View style={styles.mapContainer}>
                        <View style={styles.mapWrapper}>
                            <Button
                                buttonColor={colors.white}
                                borderWidth={2}
                                borderColor={colors.grey}
                                textColor={colors.button.primary.backgroundColor}
                                borderRadius={4} 
                                title={"Pilih Lokasi"}  
                                onPress={() => navigation.navigate('Map', initCoordinates)}
                            />
                            <Gap height={8} />
                            <Text>Latitude: {coordinates.latitude}</Text>
                            <Text>Longitude: {coordinates.longitude}</Text>
                        </View>
                    </View>
                    <Gap height={12} />
                    <TextInput
                        label="Alamat"
                        value={form.detail_alamat}
                        onChangeText={value => changeText('detail_alamat', value)}
                    />
                    <Gap height={12} />
                    <TextInput
                        height={8}
                        label="Nama Penerima"
                        placeholder="Masukkan Nama Penerima"
                        value={form.nama_penerima}
                        onChangeText={value => changeText('nama_penerima', value)}
                    />
                    <Gap height={12} />
                    <TextInput
                        height={8}
                        keyboardType="numeric"
                        label="Nomor Handphone"
                        placeholder="Masukkan Nomor Handphone Penerima"
                        value={form.nomor_handphone}
                        onChangeText={value => changeText('nomor_handphone', value)}
                    />
                    <Gap height={12} />
                    <TextInput
                        height={8}
                        label="Email"
                        placeholder="Masukkan Email"
                        value={form.email}
                        onChangeText={value => changeText('email', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kategori"
                        value={form.kategori}
                        onChangeText={value => changeText('kategori', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kecamatan"
                        value={form.kecamatan}
                        onChangeText={value => changeText('kecamatan', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kelurahan"
                        value={form.kelurahan}
                        onChangeText={value => changeText('kelurahan', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kota/Kabupaten"
                        value={form.kota_kabupaten}
                        onChangeText={value => changeText('kota_kabupaten', value)}
                    />
                    <Gap height={22} />
                    <Button title="Simpan Alamat" borderRadius={8}  onPress={updateAddressData}/>    
                </View>
            </ScrollView>
        </View>
    )
}

export default EditAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingBottom: 32,
    },
    backButtonContainer: {
        backgroundColor: colors.button.primary.backgroundColor,
        opacity: 0.5,
        height: 38,
        width: 38,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 32,
        marginLeft: 24,
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    contentWrapper: {
        marginBottom: 32,
        marginHorizontal: 24,
    },
    textInputTitle: {
        // marginTop:-8,
        fontFamily: fonts.nunito.bold,
        fontSize: 16,
        paddingBottom: 8,
    },
    mapContainer: {
        borderWidth: 1,
        borderRadius:10,
        borderColor:colors.grey,
    },
    mapWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius:10,
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
    },
    textWarning: {
        fontFamily: fonts.nunito.bold,
        color: colors.status.cancelled
    },
})

