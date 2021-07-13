import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {Button, TextInput, Gap} from '../../components';
import {colors, fonts, getData, storeData} from '../../utils';
import {showMessage} from 'react-native-flash-message';
import { firebase } from '../../config';

const AddAddress = ({navigation}) => {

    const [form, setForm] = useState({
        uid: '',
        address: [],
    }, [])

    useEffect(() => {
        getData('user').then(response => {
            const data = response;
            setForm(data);
            console.log(data);
        });
            }, []);

    // useEffect(() => {
    //     console.log(form);
    //     }, [form]);
    
    const changeText = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const addAddress = () => {

        // if (form.address.length == undefined) {
        //     form.address.length = 1;
        // }

        console.log('form length yg telah di cek: ', form.address.length);
        const data = {
            alamat: form.alamat,
            kategori: form.kategori,
            kecamatan: form.kecamatan,
            kelurahan: form.kelurahan,
            kota_kabupaten: form.kota_kabupaten,
            provinsi: form.provinsi,
            id: form.address.length,
        }
    
        firebase.database()
        .ref(`users/${form.uid}/address/`)
        .child(form.address.length)
        .set(data)
        .then(() => {
            firebase
            .database()
            .ref('users/' + form.uid)
            .once('value')
            .then(snapshot => {
                storeData('user', snapshot.val());
                setForm('reset');
                navigation.replace('HomeScreen');
                showMessage({
                    message: "Data Alamat Anda berhasil ditambahkan",
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
                        label="Alamat"
                        placeholder="Masukkan Alamat"
                        value={form.alamat}
                        onChangeText={value => changeText('alamat', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kategori"
                        placeholder="Masukkan Kategori Alamat"
                        value={form.kategori}
                        onChangeText={value => changeText('kategori', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kecamatan"
                        placeholder="Masukkan Kecamatan"
                        value={form.kecamatan}
                        onChangeText={value => changeText('kecamatan', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kelurahan"
                        placeholder="Masukkan Kelurahan"
                        value={form.kelurahan}
                        onChangeText={value => changeText('kelurahan', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Kota/Kabupaten"
                        placeholder="Masukkan Kota/Kabupaten"
                        value={form.kota_kabupaten}
                        onChangeText={value => changeText('kota_kabupaten', value)}
                    />
                    <Gap height={14} />
                    <TextInput
                        label="Provinsi"
                        placeholder="Masukkan Provinsi"
                        value={form.provinsi}
                        onChangeText={value => changeText('provinsi', value)}
                    />
                    <Gap height={22} />
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

