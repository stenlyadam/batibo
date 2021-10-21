import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {Button, TextInput, Gap} from '../../components';
import {colors, fonts, getData, storeData, showMessage} from '../../utils';
import { API_HOST, firebase } from '../../config';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const EditAddress = ({navigation, route}) => {

    const item = route.params; 
    console.log('item : ', item);
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.loginReducer);

    const [form, setForm] = useState({
        detail_alamat: item.detail_alamat,
        kategori : item.kategori,
        kecamatan : item.kecamatan,
        kelurahan : item.kelurahan,
        kota_kabupaten : item.kota_kabupaten,
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
                    <TextInput
                        label="Alamat"
                        value={form.detail_alamat}
                        onChangeText={value => changeText('detail_alamat', value)}
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

