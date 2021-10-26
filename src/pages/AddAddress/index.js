import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {Button, TextInput, Gap} from '../../components';
import {colors, fonts, getData, storeData, useForm, showMessage} from '../../utils';
import { API_HOST, firebase } from '../../config';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setLoading } from '../../redux/action';

const AddAddress = ({navigation}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.loginReducer);
    const {token} = useSelector(state => state.loginReducer);
    console.log('user : ', user.id);
    const [form, setForm] = useState({
        address: [],
    }, [])
    
    const changeText = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const addAddress = () => {
        const data = {
            user_id: user.id,
            nama_penerima: form.nama_penerima,
            nomor_handphone: form.nomor_handphone,
            email: form.email,
            detail_alamat: form.detail,
            kategori: form.kategori,
            kecamatan: form.kecamatan,
            kelurahan: form.kelurahan,
            kota_kabupaten: form.kota_kabupaten,
            provinsi: 'Sulawesi Utara',
        }

        console.log('data: ',data);
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
            axios.post(`${API_HOST.url}/address/add`, data, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : token
                }
            })
            //add address for user - jika berhasil
            .then(resAddress => {
                //tarik data address terbaru
                axios.get(`${API_HOST.url}/address`, {
                    headers: {
                        'Accept' : 'application/json',
                        'Authorization' : token
                    }
                })
                //tarik data address terbaru - jika berhasil
                .then(resAddressUpdate => {
                    //simpan data address user ke dalam data reducer
                    dispatch({type: 'SET_ADDRESS', value: resAddressUpdate.data.data.data});
                    navigation.goBack();
                    
                })
                //tarik data address terbaru - jika tidak berhasil
                .catch((errAddressUpdate) => {
                    dispatch(setLoading(false));
                    // console.log('tambah alamat berhasil : ', errAddress.response);
                    showMessage('Terjadi kesalahan pada API Address User');
                })
            })
            //add address for user - jika tidak berhasil
            .catch((errAddress) => {
                console.log('tambah alamat berhasil : ', errAddress.response);
                showMessage('error : ', errAddress.response);
            })
        }
    }

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
                <Text style={styles.titleText}>Tambah Alamat</Text>
                </View>
            </View> 

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentWrapper}>
                    <TextInput
                        height={8}
                        label="Alamat"
                        placeholder="Masukkan Detail Alamat"
                        value={form.detail}
                        onChangeText={value => changeText('detail', value)}
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
                    <Gap height={12} />
                    <TextInput
                        height={8}
                        label="Kategori"
                        placeholder="Masukkan Kategori Alamat"
                        value={form.kategori}
                        onChangeText={value => changeText('kategori', value)}
                    />
                    <Gap height={12} />
                    <TextInput
                        height={8}
                        label="Kecamatan"
                        placeholder="Masukkan Kecamatan"
                        value={form.kecamatan}
                        onChangeText={value => changeText('kecamatan', value)}
                    />
                    <Gap height={12} />
                    <TextInput
                        height={8}
                        label="Kelurahan"
                        placeholder="Masukkan Kelurahan"
                        value={form.kelurahan}
                        onChangeText={value => changeText('kelurahan', value)}
                    />
                    <Gap height={12} />
                    <TextInput
                        height={8}
                        label="Kota/Kabupaten"
                        placeholder="Masukkan Kota/Kabupaten"
                        value={form.kota_kabupaten}
                        onChangeText={value => changeText('kota_kabupaten', value)}
                    />
                    <Gap height={20} />
                    <Button title="Simpan Alamat" borderRadius={8}  onPress={addAddress}/>    
                </View>
            </ScrollView>
        </View>
    )
}

export default AddAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingBottom: 18
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
        marginVertical: 14,
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

